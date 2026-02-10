import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./feature/home/pages/Home";
import ProfilePage from "./feature/profile/Profile";
import Contact from "./feature/contact/Contact";
import CourseDetails from "./feature/course/pages/CourseDetails";
import ScrollToTop from "./sheard/components/ScrollToTop";
import Specializations from "./feature/Specializations/pages/specializations";
import LoginPage from "./feature/auth/pages/LoginPage";
import SignupPage from "./feature/auth/pages/SignupPage";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/specializations" element={<Specializations />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
