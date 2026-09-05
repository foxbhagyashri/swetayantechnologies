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
import LaptopVirusRemovalServiceInstallationPage from "./components/services/laptop-virus-removal-service-installation";
import LaptopKeyboardRepairReplacementPage from "./components/services/laptop-keyboard-repair-replacement";
import LaptopCPUFanRepairReplacementPage from "./components/services/laptop-cpu-fan-repair-replacement";
import LaptopNotTurningOnRepairServicePage from "./components/services/laptop-not-turning-on-repair"
import LaptopOverheatingRepairServicePage from "./components/services/laptop-overheating-issue-repair"
import LaptopBatteryRepairReplacementServicePage from "./components/services/laptop-battery-repair-replacement"
import LaptopTouchpadRepairReplacementServicePage from "./components/services/laptop-touchpad-track-pad-repair-and-replacement"
import LaptopBackPanelBodyReplacementServicePage from "./components/services/laptop-back-panel-body-replacement"
import LaptopScreenRepairServicePage from "./components/services/laptop-screen-repair-and-replacement"
import LaptopFanNoiseRepairServicePage from "./components/services/laptop-processor-fan-noise-repaire-and-replacement"
import LaptopNotChargingRepairServicePage from "./components/services/laptop-not-charging-repair"
import LaptopHingeRepairServicePage from "./components/services/laptop-hinges-repair-and-replacement"
import LaptopSSDInstallationServicePage from "./components/services/laptop-SSD-Installation-Setup"
import LaptopBootingIssueRepairServicePage from "./components/services/laptop-Booting-Issue-Repair"
import LaptopChargingPointRepairServicePage from "./components/services/laptop-charging-point-repair-replacement"
import LaptopMotherboardRepairServicePage from "./components/services/laptop-motherboard-repair-replacement"
import LaptopRAMReplacementServicePage from "./components/services/laptop-ram-replacement-fix-upgrade"
import LaptopChargerRepairServicePage from "./components/services/laptop-charger-repair-replacement"
import LaptopHardDiskRepairServicePage from "./components/services/laptop-hard-disk-repair-replacement"
import LaptopBiosSetupInstallationServicePage from "./components/services/laptop-BIOS-setup-and-Installation"

import ContactPage from "./components/Contact_us";
import EnquiryPage from "./components/EnquiryForm"
import BlogPage from "./components/Blog";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";

function App() {
  return (
    <Router>

      <ScrollToTop />
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
        <Route path="/services/laptop-virus-removal-service-installation" element={<LaptopVirusRemovalServiceInstallationPage />} />
        <Route path="/services/laptop-keyboard-repair-replacement" element={<LaptopKeyboardRepairReplacementPage />} />
        <Route path="/services/laptop-cpu-fan-repair-replacement" element={<LaptopCPUFanRepairReplacementPage />} />
        <Route path="/services/laptop-not-turning-on-repair" element={<LaptopNotTurningOnRepairServicePage />} />
        <Route path="/services/laptop-overheating-issue-repair" element={<LaptopOverheatingRepairServicePage />} />
        <Route path="/services/laptop-battery-repair-replacement" element={<LaptopBatteryRepairReplacementServicePage />} />

        <Route path="/services/laptop-touchpad-track-pad-repair-and-replacement" element={<LaptopTouchpadRepairReplacementServicePage />} />
        <Route path="/services/laptop-back-panel-body-replacement" element={<LaptopBackPanelBodyReplacementServicePage />} />
        <Route path="/services/laptop-screen-repair-and-replacement" element={<LaptopScreenRepairServicePage />} />
        <Route path="/services/laptop-processor-fan-noise-repaire-and-replacement" element={<LaptopFanNoiseRepairServicePage />} />
        <Route path="/services/laptop-not-charging-repair" element={<LaptopNotChargingRepairServicePage />} />
        <Route path="/services/laptop-hinges-repair-and-replacement" element={<LaptopHingeRepairServicePage />} />
        <Route path="/services/laptop-SSD-Installation-Setup" element={<LaptopSSDInstallationServicePage />} />
        <Route path="/services/laptop-Booting-Issue-Repair" element={<LaptopBootingIssueRepairServicePage />} />
        <Route path="/services/laptop-charging-point-repair-replacement" element={<LaptopChargingPointRepairServicePage />} />
        <Route path="/services/laptop-motherboard-repair-replacement" element={<LaptopMotherboardRepairServicePage />} />
        <Route path="/services/laptop-ram-replacement-fix-upgrade" element={<LaptopRAMReplacementServicePage />} />
        <Route path="/services/laptop-charger-repair-replacement" element={<LaptopChargerRepairServicePage />} />
        <Route path="/services/laptop-hard-disk-repair-replacement" element={<LaptopHardDiskRepairServicePage />} />

        <Route path="/services/laptop-BIOS-setup-and-Installation" element={<LaptopBiosSetupInstallationServicePage />} />



        <Route path="/EnquiryForm" element={<EnquiryPage />} />
        <Route path="/Contact_us" element={<ContactPage />} />
        <Route path="/Blog" element={<BlogPage />} />

      </Routes>
      <Footer />

    </Router>
  );
}

export default App;