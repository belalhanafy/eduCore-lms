import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router';
import { assets } from "../../assets/images/assets";
const { stdSignUp } = assets;

const StudentSignUp = () => {
    const { setAllStudents, allStudents } = useContext(AppContext);
    const navigate = useNavigate();
    const [preview, setPreview] = useState('');

    const initialValues = {
        name: '',
        email: '',
        password: '',
        imageFile: null,
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
        imageFile: Yup.mixed().nullable(),
    });

    const handleSubmit = (values, { resetForm }) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const imageUrl = reader.result || 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

            const newStudent = {
                _id: `student_${Date.now()}`,
                name: values.name,
                email: values.email,
                password: values.password,
                imageUrl,
                enrolledCourses: [],
            };

            setAllStudents([...allStudents, newStudent]);
            resetForm();
            setPreview('');
            navigate('/auth/sign-in');
        };

        if (values.imageFile) {
            reader.readAsDataURL(values.imageFile);
        } else {
            reader.onloadend();
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Image Section */}
            <div className="hidden md:block w-1/2 relative">
                <img
                    src={stdSignUp}
                    alt="Student inspiration"
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center px-6 text-center text-white">
                    <h1 className="text-5xl font-bold mb-4">
                        <span className="text-blue-300">Learn. </span>
                        <span className="text-blue-400">Achieve. </span>
                        <span className="text-blue-500">Grow. </span>
                    </h1>
                    <h2 className="text-3xl font-semibold mb-2">Join EduCore as a Student</h2>
                    <p className="text-lg max-w-md">
                        Start your learning journey with us. Access top-quality courses from experienced educators.
                    </p>
                    <p className="text-lg text-[#B5FCCD]">— your future begins here —</p>

                </div>
            </div>

            {/* Right Form Section */}
            <div className="w-full md:w-1/2 p-8 bg-gray-50 flex items-center justify-center">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
                    <h2 className="text-2xl font-bold text-center mb-6">Student Sign Up</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ setFieldValue }) => (
                            <Form className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-sm font-medium">Name</label>
                                    <Field type="text" name="name" className="w-full border px-3 py-2 rounded" />
                                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium">Email</label>
                                    <Field type="email" name="email" className="w-full border px-3 py-2 rounded" />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium">Password</label>
                                    <Field type="password" name="password" className="w-full border px-3 py-2 rounded" />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium">Profile Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => {
                                            const file = event.currentTarget.files[0];
                                            setFieldValue('imageFile', file);
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onload = () => setPreview(reader.result);
                                                reader.readAsDataURL(file);
                                            } else {
                                                setPreview('');
                                            }
                                        }}
                                        className="w-full border px-3 py-2 rounded"
                                    />
                                    {preview && (
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-24 h-24 object-cover mt-2 rounded-full"
                                        />
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                                >
                                    Sign Up
                                </button>

                                {/* Divider */}
                                <div className="flex items-center gap-4 my-2">
                                    <div className="flex-1 h-px bg-gray-300" />
                                    <span className="text-sm text-gray-500">OR</span>
                                    <div className="flex-1 h-px bg-gray-300" />
                                </div>

                                <div className="text-center text-sm text-gray-600">
                                    Already have an account?{" "}
                                    <span
                                        onClick={() => navigate('/auth/sign-in')}
                                        className="text-blue-600 cursor-pointer hover:underline"
                                    >
                                        Sign In
                                    </span>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default StudentSignUp;
