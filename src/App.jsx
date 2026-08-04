import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SwetayanTechnologiesWebsite from "./components/Home";
import AboutPage from "./components/About_us";
import SiteHeader from "./components/Header";
import Footer from "./components/Footer";
import DataRecoveryPage from "./components/Service";
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

        <Route path="/about" element={<AboutPage />} />
        <Route path="/Service" element={<DataRecoveryPage />} />
        <Route path="/Contact_us" element={<ContactPage />} />
        <Route path="/Blog" element={<BlogPage />} />

      </Routes>
      <Footer />

    </Router>
  );
}

export default App;