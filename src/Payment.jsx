import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { AppContext } from "./context/AppContext";
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

export default function Payment() {

    const { handleEnroll, allStudents, studentId, isStudent } = useContext(AppContext);

    const location = useLocation();
    const navigate = useNavigate();
    const student = isStudent && allStudents.length > 0
        ? allStudents.find(s => s._id === studentId)
        : null;

    const studentName = student?.name || "";

    const { totalAmount, courses, onPaymentSuccess } = location.state || {};

    const [email, setEmail] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");


    const handlePayment = () => {
        if (!email || !cardNumber || !expiry || !cvc) {
            setError("Please fill all fields.");
            return;
        }

        setError("");
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);

            // Send email via EmailJS
            emailjs.send(
                "service_71w2vuk",
                "template_091pf8d",
                {
                    student_name: studentName,// {{student_name}}
                    student_email: email,// {{student_email}}
                    course_names: [courses].flat().map((c) => c.courseTitle).join(", "), // {{course_names}}
                    total_amount: totalAmount,// {{total_amount}}
                    name: "ahmed hanafy", // {{name}} or handled by name
                    time: new Date().toLocaleString(), // {{time}}
                    message: "Thank you for your payment. We hope you enjoy your courses!", // {{message}}
                    email: "ahmedHanafy123@gmail.com"
                },
                "hxxXnuicf3hq4hoN5"
            )
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful!',
                        text: 'Email sent.'
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Payment Successful!',
                        text: 'But failed to send email.'
                    });
                });

            // Call handleEnroll
            if (handleEnroll) handleEnroll(courses);

            if (typeof onPaymentSuccess === "string") {
                navigate(onPaymentSuccess);
            } else if (typeof onPaymentSuccess === "function") {
                onPaymentSuccess();
            }
        }, 2000);
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-20">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>

            <div className="mb-4">
                <h3 className="font-semibold text-lg mb-2">Courses:</h3>
                <ul className="space-y-1">
                    {[courses].flat().map((course) => (
                        <li key={course.id || course._id} className="flex justify-between">
                            <span>{course.courseTitle}</span>
                            <span>{(course.coursePrice - (course.coursePrice * course.discount) / 100).toFixed(2)} EGP</span>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between mt-2 pt-2 border-t font-semibold">
                    <span>Total</span>
                    <span>{totalAmount} EGP</span>
                </div>
            </div>

            <div className="mb-4">
                <label className="block mb-1 font-medium">Email</label>
                <input
                    name="email"
                    type="email"
                    className="w-full border p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    disabled={isLoading}

                />
            </div>

            <div className="mb-4">
                <label className="block mb-1 font-medium">Card Number</label>
                <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 4242 4242 4242"
                />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block mb-1 font-medium">Expiry</label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="MM/YY"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">CVC</label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        placeholder="123"
                    />
                </div>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button
                onClick={handlePayment}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
                {isLoading ? "Processing..." : `Pay ${totalAmount} EGP`}
            </button>
        </div>
    );
}
