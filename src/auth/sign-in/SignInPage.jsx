import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/images/assets";
const { stdSignIn } = assets;

const SignInPage = () => {
  const { allStudents, setStudentId, setIsStudent, setIsEducator, setEducatorId } = useContext(AppContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setError("");

    const student = allStudents.find(
      (s) => s.email === values.email && s.password === values.password
    );

    if (student) {
      localStorage.setItem("studentId", student._id);
      localStorage.setItem("isStudent", "true");
      setStudentId(student._id);
      setIsStudent(true);

      localStorage.setItem("isEducator", "false");
      localStorage.removeItem("educatorId");
      setIsEducator(false);
      setEducatorId("");
      navigate("/");
    } else {
      setError("Invalid email or password");
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Image + Overlay */}
      <div className="hidden md:block w-1/2 relative">
        <img
          src={stdSignIn}
          alt="Student in a classroom"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center px-6 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-blue-300">Learn. </span>
            <span className="text-blue-400">Achieve. </span>
            <span className="text-blue-500">Grow. </span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Welcome Back to Your Learning Journey</h2>
          <p className="text-lg max-w-lg mb-2">
            Join thousands of learners building skills for the future, Every lesson completed is a step closer to your goals .
          </p>
          <p className="text-lg text-[#B5FCCD]">— your future begins here —</p>
        </div>
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/2 p-8 bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Student Sign In</h2>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                {error && !isSubmitting && (
                  <div className="p-2 my-4 text-lg rounded-lg bg-red-50 text-red-600" role="alert">
                    {error}
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">Email</label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="email" component="div" className="text-sm text-red-500" />
                </div>

                {/* Password Field + Forgot Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium">Password</label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="password" component="div" className="text-sm text-red-500" />
                  <div className="text-right mt-1">
                    <button
                      type="button"
                      onClick={() => alert("Forgot password flow coming soon.")}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-gray-300" />
                  <span className="text-sm text-gray-500">OR</span>
                  <div className="flex-1 h-px bg-gray-300" />
                </div>

                {/* Sign Up Prompt */}
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    New to EduCore?{" "}
                    <span
                      onClick={() => navigate("/auth/sign-up")}
                      className="text-blue-600 cursor-pointer hover:underline"
                    >
                      Create an account
                    </span>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
