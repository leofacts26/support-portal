import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard";
import NoPage from "./pages/NoPage";
import ExploreIndia from "./pages/homepage/ExploreIndia";
import NewsLetter from "./pages/homepage/NewsLetter";
import Footer from "./pages/homepage/Footer";
import Users from "./pages/users";
import VendorList from "./pages/caterings/VendorList";
import Cuisines from "./pages/caterings/Cuisines";
import Occasions from "./pages/caterings/Occasions";
import BudjetFilter from "./pages/caterings/BudjetFilter";
import Faq from "./pages/caterings/Faq";
import FoodTypes from "./pages/caterings/FoodTypes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />

          {/* Home Page  */}
          <Route path="/explore-india" element={<ExploreIndia />} />
          <Route path="/news-letter" element={<NewsLetter />} />
          <Route path="/footer" element={<Footer />} />

          {/* Caterings */}
          <Route path="/vendor-list" element={<VendorList />} />
          <Route path="/cuisines" element={<Cuisines />} />
          <Route path="/occasions" element={<Occasions />} />
          <Route path="/budjet-filter" element={<BudjetFilter />} />
          <Route path="/food-types" element={<FoodTypes />} />
          <Route path="/faq" element={<Faq />} />


          {/* users  */}
          <Route path="/users" element={<Users />} />


          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;