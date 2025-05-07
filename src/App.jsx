import React, { lazy } from 'react';
import { Route, Routes } from 'react-router';
import StdLayout from './StdLayout';
import Loading from './components/student/Loading';
import SignInPage from './auth/sign-in/SignInPage';
import EduLayout from './EduLayout';
import "quill/dist/quill.snow.css";
import Cart from './pages/Cart';
import WishList from './pages/WishList';
import Payment from './Payment';
import EduSignIn from './auth/educatorSign-in/EduSignIn';
import EduSignUp from './auth/educatorSign-in/EduSignUp';
import SignUpPage from './auth/sign-in/SignUpPage';
import Notfound from './pages/Notfound';


// Lazy-loaded components
const Home = lazy(() => import('./pages/student/Home'));
const EduHome = lazy(() => import('./pages/educator/EduHome'));
const CoursesList = lazy(() => import('./pages/student/CoursesList'));
const MyEnrollments = lazy(() => import('./pages/student/MyEnrollments'));
const CourseDetails = lazy(() => import('./pages/student/CourseDetails'));
const Player = lazy(() => import('./pages/student/Player'));
const Dashboard = lazy(() => import('./pages/educator/Dashboard'));
const AddCourse = lazy(() => import('./pages/educator/AddCourse'));
const MyCourses = lazy(() => import('./pages/educator/MyCourses'));
const StudentsEnrolled = lazy(() => import('./pages/educator/StudentsEnrolled'));




function App() {
  return (
    <Routes>
      {/* Routes with StdLayout */}
      <Route path="/" element={<StdLayout />}>
        <Route index element={<Home />} />
        <Route path="educatorHome" element={<EduHome />} />
        <Route path="course-list/:input?" element={<CoursesList />} />
        <Route path="course/:courseId" element={<CourseDetails />} />
        <Route path="my-enrollments" element={<MyEnrollments />} />
        <Route path="player/:courseId" element={<Player />} />
        <Route path="loading/:path" element={<Loading />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishList" element={<WishList />} />
      </Route>

      {/* Routes with EducatorLayout */}
      <Route path="/educator/:educatorId?" element={<EduLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="add-course/:courseId?" element={<AddCourse />} />
        <Route path="my-courses" element={<MyCourses />} />
        <Route path="student-enrolled" element={<StudentsEnrolled />} />
      </Route>


      <Route path="auth/sign-in" element={<SignInPage />} />
      <Route path="auth/sign-up" element={<SignUpPage />} />

      <Route path="auth/eduSign-in" element={<EduSignIn />} />
      <Route path="auth/eduSign-up" element={<EduSignUp />} />


      <Route path="checkOut" element={<Payment />} />

      <Route path="*" element={<Notfound/>} />


    </Routes>
  );
}


export default App;