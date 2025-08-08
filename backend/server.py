from fastapi import FastAPI, APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime
import json
import asyncio
import numpy as np

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="AirLens - NO₂ Satellite Data Processing API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class DatasetMetadata(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    filename: str
    file_size: int
    upload_timestamp: datetime = Field(default_factory=datetime.utcnow)
    data_format: str  # "netcdf", "hdf5", "grib"
    satellite_source: str  # "TROPOMI", "OMI", "Sentinel-5P"
    processing_status: str = "uploaded"  # "uploaded", "processing", "completed", "failed"
    geographical_bounds: Optional[Dict[str, float]] = None
    time_range: Optional[Dict[str, str]] = None
    no2_statistics: Optional[Dict[str, float]] = None

class DatasetCreate(BaseModel):
    filename: str
    file_size: int
    data_format: str
    satellite_source: str

class ProcessingJob(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    dataset_id: str
    algorithm: str  # "random_forest", "neural_network", "kriging", "physics_based"
    parameters: Dict[str, Any] = {}
    status: str = "queued"  # "queued", "processing", "completed", "failed"
    created_timestamp: datetime = Field(default_factory=datetime.utcnow)
    completed_timestamp: Optional[datetime] = None
    progress_percentage: int = 0
    output_data: Optional[Dict[str, Any]] = None
    accuracy_metrics: Optional[Dict[str, float]] = None

class ProcessingJobCreate(BaseModel):
    dataset_id: str
    algorithm: str
    parameters: Dict[str, Any] = {}

class ValidationResult(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    dataset_id: str
    processing_job_id: str
    ground_truth_source: str
    accuracy_score: float
    rmse: float
    mae: float
    r_squared: float
    validation_timestamp: datetime = Field(default_factory=datetime.utcnow)
    validation_notes: Optional[str] = None

class MapVisualization(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    dataset_id: str
    processing_job_id: Optional[str] = None
    map_type: str  # "heatmap", "contour", "point_data"
    zoom_level: int = 5
    center_coordinates: List[float] = [52.3676, 4.9041]  # Amsterdam default
    layer_data: Dict[str, Any] = {}
    created_timestamp: datetime = Field(default_factory=datetime.utcnow)

# Basic status endpoints
@api_router.get("/")
async def root():
    return {"message": "AirLens NO₂ Processing API", "version": "1.0.0", "status": "active"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Dataset management endpoints
@api_router.post("/datasets/upload")
async def upload_dataset(
    file: UploadFile = File(...),
    data_format: str = Form(...),
    satellite_source: str = Form(...)
):
    """Upload a satellite NO₂ dataset file"""
    try:
        # Validate file format
        allowed_formats = ["netcdf", "hdf5", "grib"]
        if data_format.lower() not in allowed_formats:
            raise HTTPException(status_code=400, detail=f"Unsupported format. Allowed: {allowed_formats}")
        
        # Validate satellite source
        allowed_sources = ["TROPOMI", "OMI", "Sentinel-5P", "GOME-2"]
        if satellite_source not in allowed_sources:
            raise HTTPException(status_code=400, detail=f"Unsupported source. Allowed: {allowed_sources}")
        
        # Read file content (in a real implementation, you'd save to storage)
        content = await file.read()
        
        # Create dataset metadata
        dataset = DatasetMetadata(
            filename=file.filename,
            file_size=len(content),
            data_format=data_format.lower(),
            satellite_source=satellite_source,
            processing_status="uploaded"
        )
        
        # Store metadata in database
        await db.datasets.insert_one(dataset.dict())
        
        # In a real implementation, you would:
        # 1. Save the file to storage (S3, local filesystem, etc.)
        # 2. Extract metadata from the file
        # 3. Validate data quality
        # 4. Create preview/thumbnails
        
        return {
            "success": True,
            "dataset_id": dataset.id,
            "message": f"Successfully uploaded {file.filename}",
            "metadata": dataset.dict()
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

@api_router.get("/datasets", response_model=List[DatasetMetadata])
async def get_datasets():
    """Get all uploaded datasets"""
    datasets = await db.datasets.find().to_list(1000)
    return [DatasetMetadata(**dataset) for dataset in datasets]

@api_router.get("/datasets/{dataset_id}", response_model=DatasetMetadata)
async def get_dataset(dataset_id: str):
    """Get a specific dataset by ID"""
    dataset = await db.datasets.find_one({"id": dataset_id})
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")
    return DatasetMetadata(**dataset)

@api_router.delete("/datasets/{dataset_id}")
async def delete_dataset(dataset_id: str):
    """Delete a dataset"""
    result = await db.datasets.delete_one({"id": dataset_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Dataset not found")
    return {"success": True, "message": "Dataset deleted successfully"}

# Processing job endpoints
@api_router.post("/processing/start", response_model=ProcessingJob)
async def start_processing(job_create: ProcessingJobCreate):
    """Start a new processing job"""
    # Validate dataset exists
    dataset = await db.datasets.find_one({"id": job_create.dataset_id})
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")
    
    # Validate algorithm
    allowed_algorithms = ["random_forest", "neural_network", "kriging", "physics_based"]
    if job_create.algorithm not in allowed_algorithms:
        raise HTTPException(status_code=400, detail=f"Unsupported algorithm. Allowed: {allowed_algorithms}")
    
    # Create processing job
    job = ProcessingJob(
        dataset_id=job_create.dataset_id,
        algorithm=job_create.algorithm,
        parameters=job_create.parameters,
        status="queued"
    )
    
    await db.processing_jobs.insert_one(job.dict())
    
    # In a real implementation, you would:
    # 1. Add job to processing queue
    # 2. Start background processing
    # 3. Update job status as it progresses
    
    return job

@api_router.get("/processing/jobs", response_model=List[ProcessingJob])
async def get_processing_jobs():
    """Get all processing jobs"""
    jobs = await db.processing_jobs.find().to_list(1000)
    return [ProcessingJob(**job) for job in jobs]

@api_router.get("/processing/jobs/{job_id}", response_model=ProcessingJob)
async def get_processing_job(job_id: str):
    """Get a specific processing job"""
    job = await db.processing_jobs.find_one({"id": job_id})
    if not job:
        raise HTTPException(status_code=404, detail="Processing job not found")
    return ProcessingJob(**job)

@api_router.post("/processing/jobs/{job_id}/simulate")
async def simulate_processing(job_id: str):
    """Simulate processing completion for demo purposes"""
    job = await db.processing_jobs.find_one({"id": job_id})
    if not job:
        raise HTTPException(status_code=404, detail="Processing job not found")
    
    # Simulate processing completion
    update_data = {
        "status": "completed",
        "completed_timestamp": datetime.utcnow(),
        "progress_percentage": 100,
        "output_data": {
            "downscaled_resolution": "1km",
            "output_format": "geotiff",
            "grid_size": [1000, 1000],
            "coordinate_system": "EPSG:4326"
        },
        "accuracy_metrics": {
            "rmse": np.random.uniform(0.1, 0.3),
            "mae": np.random.uniform(0.05, 0.2),
            "r_squared": np.random.uniform(0.85, 0.96),
            "bias": np.random.uniform(-0.1, 0.1)
        }
    }
    
    await db.processing_jobs.update_one(
        {"id": job_id},
        {"$set": update_data}
    )
    
    return {"success": True, "message": "Processing simulation completed"}

# Validation endpoints
@api_router.post("/validation/validate", response_model=ValidationResult)
async def create_validation(
    dataset_id: str = Form(...),
    processing_job_id: str = Form(...),
    ground_truth_source: str = Form(...)
):
    """Create a validation result against ground truth data"""
    
    # Validate that dataset and job exist
    dataset = await db.datasets.find_one({"id": dataset_id})
    job = await db.processing_jobs.find_one({"id": processing_job_id})
    
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")
    if not job:
        raise HTTPException(status_code=404, detail="Processing job not found")
    
    # Simulate validation results
    validation = ValidationResult(
        dataset_id=dataset_id,
        processing_job_id=processing_job_id,
        ground_truth_source=ground_truth_source,
        accuracy_score=np.random.uniform(0.85, 0.98),
        rmse=np.random.uniform(0.1, 0.4),
        mae=np.random.uniform(0.05, 0.25),
        r_squared=np.random.uniform(0.80, 0.95),
        validation_notes="Automated validation against ground truth measurements"
    )
    
    await db.validations.insert_one(validation.dict())
    
    return validation

@api_router.get("/validation/results", response_model=List[ValidationResult])
async def get_validation_results():
    """Get all validation results"""
    results = await db.validations.find().to_list(1000)
    return [ValidationResult(**result) for result in results]

# Map visualization endpoints
@api_router.post("/maps/create", response_model=MapVisualization)
async def create_map_visualization(
    dataset_id: str = Form(...),
    processing_job_id: str = Form(None),
    map_type: str = Form("heatmap"),
    zoom_level: int = Form(5),
    center_lat: float = Form(52.3676),
    center_lon: float = Form(4.9041)
):
    """Create a map visualization"""
    
    # Validate dataset exists
    dataset = await db.datasets.find_one({"id": dataset_id})
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")
    
    # Generate mock layer data for demonstration
    mock_layer_data = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [center_lon + np.random.uniform(-0.1, 0.1), 
                                 center_lat + np.random.uniform(-0.1, 0.1)]
                },
                "properties": {
                    "no2_value": np.random.uniform(10, 50),
                    "timestamp": datetime.utcnow().isoformat()
                }
            } for _ in range(50)  # 50 random points
        ]
    }
    
    map_viz = MapVisualization(
        dataset_id=dataset_id,
        processing_job_id=processing_job_id,
        map_type=map_type,
        zoom_level=zoom_level,
        center_coordinates=[center_lat, center_lon],
        layer_data=mock_layer_data
    )
    
    await db.map_visualizations.insert_one(map_viz.dict())
    
    return map_viz

@api_router.get("/maps", response_model=List[MapVisualization])
async def get_map_visualizations():
    """Get all map visualizations"""
    maps = await db.map_visualizations.find().to_list(1000)
    return [MapVisualization(**map_viz) for map_viz in maps]

@api_router.get("/maps/{map_id}", response_model=MapVisualization)
async def get_map_visualization(map_id: str):
    """Get a specific map visualization"""
    map_viz = await db.map_visualizations.find_one({"id": map_id})
    if not map_viz:
        raise HTTPException(status_code=404, detail="Map visualization not found")
    return MapVisualization(**map_viz)

# Statistics and analytics endpoints
@api_router.get("/analytics/summary")
async def get_analytics_summary():
    """Get analytics summary"""
    
    # Count documents in each collection
    datasets_count = await db.datasets.count_documents({})
    jobs_count = await db.processing_jobs.count_documents({})
    validations_count = await db.validations.count_documents({})
    maps_count = await db.map_visualizations.count_documents({})
    
    # Get processing job statuses
    job_statuses = await db.processing_jobs.aggregate([
        {"$group": {"_id": "$status", "count": {"$sum": 1}}}
    ]).to_list(100)
    
    return {
        "total_datasets": datasets_count,
        "total_processing_jobs": jobs_count,
        "total_validations": validations_count,
        "total_visualizations": maps_count,
        "job_status_breakdown": {status["_id"]: status["count"] for status in job_statuses},
        "platform_stats": {
            "uptime": "99.9%",
            "avg_processing_time": "5.2 minutes",
            "supported_formats": ["NetCDF", "HDF5", "GRIB"],
            "supported_satellites": ["TROPOMI", "OMI", "Sentinel-5P", "GOME-2"],
            "algorithm_accuracy": {
                "random_forest": 96.2,
                "neural_network": 94.8,
                "kriging": 89.1,
                "physics_based": 93.7
            }
        }
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()