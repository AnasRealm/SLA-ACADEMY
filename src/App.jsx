import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './feature/home/pages/Home'
import ProfilePage from './feature/profile/Profile'
import Contact from './feature/contact/Contact'
import CourseDetails from './feature/course/pages/CourseDetails'
import ScrollToTop from './sheard/components/ScrollToTop'
import Specializations from './feature/Specializations/pages/specializations'

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
      </Routes>
    </Router>
  )
}

export default App
