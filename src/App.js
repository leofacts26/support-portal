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
import TiffinVendorList from "./pages/tiffins/TiffinVendorList";
import TiffinCuisines from "./pages/tiffins/TiffinCuisines";
import MealTime from "./pages/tiffins/MealTime";
import KitchenType from "./pages/tiffins/KitchenType";
import TiffinBudget from "./pages/tiffins/TiffinBudget";
import TiffinFoodTypes from "./pages/tiffins/TiffinFoodTypes";
import TiffinFaq from "./pages/tiffins/TiffinFaq";
import Subscriptions from "./pages/subscriptions";
import Discounts from "./pages/discounts";
import Notifications from "./pages/notifications";
import RolesAccess from "./pages/customer-care/RolesAccess";
import EmployeeMaster from "./pages/customer-care/EmployeeMaster";
import UserMaster from "./pages/customer-care/UserMaster";
import AddNewVendor from "./pages/customer-care/AddNewVendor";
import ShareLinks from "./pages/customer-care/ShareLinks";
import FollowUps from "./pages/customer-care/FollowUps";
import SupportTickets from "./pages/customer-care/SupportTickets";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          {/* Dashboard  */}
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

          {/* Tiffins */}
          <Route path="/tiffin-vendor-list" element={<TiffinVendorList />} />
          <Route path="/tiffin-cuisines" element={<TiffinCuisines />} />
          <Route path="/meal-time" element={<MealTime />} />
          <Route path="/kitchen-type" element={<KitchenType />} />
          <Route path="/tiffin-budjet" element={<TiffinBudget />} />
          <Route path="/tiffin-food-types" element={<TiffinFoodTypes />} />
          <Route path="/tiffin-faq" element={<TiffinFaq />} />

          {/* users  */}
          <Route path="/users" element={<Users />} />

          {/* Subscriptions  */}
          <Route path="/subscriptions" element={<Subscriptions />} />

          {/* discounts  */}
          <Route path="/discounts" element={<Discounts />} />

          {/* notifications  */}
          <Route path="/notifications" element={<Notifications />} />

          {/* customer care */}
          <Route path="/roles-access" element={<RolesAccess />} />
          <Route path="/employee-master" element={<EmployeeMaster />} />
          <Route path="/user-master" element={<UserMaster />} />
          <Route path="/add-new" element={<AddNewVendor />} />
          <Route path="/share-links" element={<ShareLinks />} />
          <Route path="/follow-ups" element={<FollowUps />} />
          <Route path="/support-tickets" element={<SupportTickets />} />


          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
          <Toaster />
    </BrowserRouter>
  );
}

export default App;