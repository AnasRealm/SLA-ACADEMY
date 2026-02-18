import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// الصفحات الأساسية
import Home from "./feature/home/pages/Home";
import ProfilePage from "./feature/profile/Profile";
import Contact from "./feature/contact/Contact";
// import CourseDetails from "./feature/course/components/CourseDetails";
import CourseDetails from "./feature/Courses/components/CourseDetails";
import ScrollToTop from "./shared/components/ScrollToTop";
import TrainingCourses from "./feature/TrainingCourses/pages/TrainingCourses";
import LoginPage from "./feature/auth/pages/LoginPage";
import SignupPage from "./feature/auth/pages/SignupPage";

// الاستيرادات الجديدة
import VerifyEmailPage from "./feature/auth/pages/VerifyEmailPage";
import ResetPasswordPage from "./feature/auth/pages/ResetPasswordPage";
import GoogleCallbackPage from "./feature/auth/pages/GoogleCallbackPage";
import CategoryCoursesPage from "./feature/Courses/pages/CategoryCoursesPage";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/category/:id" element={<CategoryCoursesPage />} />
        <Route path="/TrainingCourses" element={<TrainingCourses />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/password/reset" element={<ResetPasswordPage />} />
        <Route path="/auth/callback" element={<GoogleCallbackPage />} />
      </Routes>
    </Router>
  );
}

export default App;
