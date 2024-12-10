import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import NoPage from "./pages/NoPage";
import { Toaster } from 'react-hot-toast';
import ShareLinks from "./pages/ShareLinks";
import SupportTickets from "./pages/SupportTickets";
import Login from "./pages/auth/Login";
import VendorDetails from "./pages/VendorDetails";
import Test from "./Test";
import FollowUps from "./pages/FollowUps";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          {/* ShareLinks  */}
          <Route index element={<ShareLinks />} />

          {/* Home Page  */}
          <Route path="/support-list-tickets" element={<SupportTickets />} />
          <Route path="/support-list-share-links" element={<ShareLinks />} />
          <Route path="/support-get-vendor-show-details" element={<VendorDetails />} />
          <Route path="/support-list-followups" element={<FollowUps />} />
          <Route path="/test" element={<Test />} />

          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;