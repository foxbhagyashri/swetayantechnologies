import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SwetayanTechnologiesWebsite from "./components/Home";
import AboutPage from "./components/About_us";
import SiteHeader from "./components/Header";
import Footer from "./components/Footer";
import DataRecoveryPage from "./components/services/hard-disk-data-recovery";
import LaptopDataRecoveryPage from "./components/services/laptop-data-recovery";
import MacBookDataRecoveryPage from "./components/services/macbook-data-recovery";
import SSDDataRecoveryPage from "./components/services/ssd-data-recovery";
import RemovableMediaRecoveryPage from "./components/services/removable-media-recovery";
import CCTVFootageRecoveryPage from "./components/services/cctv-footage-recovery";
import NASDataRecoveryPage from "./components/services/nas-data-recovery";
import RAIDServerRecoveryPage from "./components/services/raid-server-recovery";
import LaptopRepairServicePage from "./components/services/laptop-repair";
import ContactPage from "./components/Contact_us";
import BlogPage from "./components/Blog";
import "./App.css";

function App() {
  return (
    <Router>
      <SiteHeader dark={true} />

      <Routes>
        <Route
          path="/"
          element={<SwetayanTechnologiesWebsite />}
        />

        <Route path="/About_us" element={<AboutPage />} />
        <Route path="/services/hard-disk-data-recovery" element={<DataRecoveryPage />} />
        <Route path="/services/laptop-data-recovery" element={<LaptopDataRecoveryPage />} />
        <Route path="/services/macbook-data-recovery" element={<MacBookDataRecoveryPage />} />
        <Route path="/services/ssd-data-recovery" element={<SSDDataRecoveryPage />} />
        <Route path="/services/removable-media-recovery" element={<RemovableMediaRecoveryPage />} />
        <Route path="/services/cctv-footage-recovery" element={<CCTVFootageRecoveryPage />} />
        <Route path="/services/nas-data-recovery" element={<NASDataRecoveryPage />} />
        <Route path="/services/raid-server-recovery" element={<RAIDServerRecoveryPage />} />
        <Route path="/services/laptop-repair" element={<LaptopRepairServicePage />} />
        <Route path="/Contact_us" element={<ContactPage />} />
        <Route path="/Blog" element={<BlogPage />} />

      </Routes>
      <Footer />

    </Router>
  );
}

export default App;