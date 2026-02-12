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
import VerifyEmailPage from "./feature/auth/pages/VerifyEmailPage";
import ResetPasswordPage from "./feature/auth/pages/ResetPasswordPage";
import GoogleCallbackPage from "./feature/auth/pages/GoogleCallbackPage";

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
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/password/reset" element={<ResetPasswordPage />} />
        <Route path="/auth/google/redirect" element={<GoogleCallbackPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;