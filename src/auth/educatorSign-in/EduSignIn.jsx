import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/images/assets";
const { eduSignIn1 } = assets;

const EduSignIn = () => {
    const { allEducators, setIsEducator, setEducatorId, setStudentId, setIsStudent } = useContext(AppContext);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    });

    const handleLogin = (values, { setSubmitting }) => {
        setError("");

        const educator = allEducators.find(
            (educator) => educator.email === values.email && educator.password === values.password
        );

        if (educator) {
            localStorage.setItem("isEducator", "true");
            localStorage.setItem("educatorId", educator._id);
            setIsEducator(true);
            setEducatorId(educator._id);

            localStorage.setItem('isStudent', 'false');
            setIsStudent(false);
            localStorage.removeItem('studentId');
            setStudentId('');
            navigate("/educatorHome");
        } else {
            setError("Invalid email or password");
        }

        setSubmitting(false);
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row relative">
            {/* Left Side - Image with Overlay */}
            <div className="hidden md:block w-1/2 relative">
                <img
                    src={eduSignIn1}
                    alt="Educator in a classroom"
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-black opacity-40"></div> {/* Overlay */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
                    <h1 className="text-5xl font-bold mb-4">
                        <span className="text-blue-300">Teach. </span>
                        <span className="text-blue-400">Inspire. </span>
                        <span className="text-blue-500">Grow. </span>
                    </h1>
                    <h2 className="text-2xl mb-4 font-bold">Welcome Back to EduCore</h2>
                    <p className="text-lg max-w-lg text-center">Sign in to access your educator dashboard and start teaching. Design and publish courses that inspire students to learn. Share your expertise with a global audience.</p>

                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-1/2 p-8 bg-gray-50 flex items-center justify-center">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
                    <h2 className="text-2xl font-bold text-center mb-6">Educator Sign In</h2>
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={validationSchema}
                        onSubmit={handleLogin}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                {error && !isSubmitting && (
                                    <div className="p-2 my-4 text-lg rounded-lg bg-red-50 text-red-600" role="alert">
                                        {error}
                                    </div>
                                )}

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
                                            onClick={() => navigate("/auth/forgot-password")}
                                            className="text-sm text-blue-600 hover:underline"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                </div>


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
                                <div className="my-4 text-center text-sm text-gray-600">
                                    <p>
                                        New to EduCore?{" "}
                                        <span
                                            onClick={() => navigate("/auth/eduSign-up")}
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

export default EduSignIn;
