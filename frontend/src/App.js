import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import MapPage from "./pages/MapPage";
import ValidationPage from "./pages/ValidationPage";
import DocsPage from "./pages/DocsPage";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import ResearchTeamPage from "./pages/ResearchTeamPage";
import PublicationsPage from "./pages/PublicationsPage";
import PartnershipsPage from "./pages/PartnershipsPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import APIDocsPage from "./pages/APIDocsPage";
import ContactPage from "./pages/ContactPage";
import StatusPage from "./pages/StatusPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/validation" element={<ValidationPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/team" element={<ResearchTeamPage />} />
          <Route path="/publications" element={<PublicationsPage />} />
          <Route path="/partnerships" element={<PartnershipsPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/api-docs" element={<APIDocsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/status" element={<StatusPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;