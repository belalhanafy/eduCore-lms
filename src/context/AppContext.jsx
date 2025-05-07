import { createContext, useEffect, useState } from "react";
import { dummyCourses, dummyEducatorData, dummyStudentEnrolled } from "../data";
import humanizeDuration from "humanize-duration";
export const AppContext = createContext();
import { Bounce, toast } from 'react-toastify';
import { useNavigate } from "react-router";
import Swal from 'sweetalert2'

export const AppProvider = ({ children }) => {

    const [courses, setCourses] = useState({});
    const navigate = useNavigate();
    const [isEducator, setIsEducator] = useState(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('isEducator')) {
            const stored = localStorage.getItem('isEducator');
            return stored === 'true' ? true : false;
        }
    });
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [cart, setCart] = useState([]);
    const [wishList, setWishList] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [educatorId, setEducatorId] = useState(
        typeof window !== 'undefined' && localStorage.getItem('educatorId')
            ? localStorage.getItem('educatorId')
            : ''
    );
    const [studentId, setStudentId] = useState("");
    const [isStudent, setIsStudent] = useState(false);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [allEducators, setAllEducators] = useState([]);
    const [allStudents, setAllStudents] = useState([]);
    const [courseEnroll, setCourseEnroll] = useState(false);

    const toggleCart = () => setIsCartOpen(!isCartOpen);
    const closeCart = () => setIsCartOpen(false);

    // Fetch All Courses
    const getCourses = () => {
        try {
            setCourses(dummyCourses);
        }
        catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const getAllStudents = () => {
        try {
            setAllStudents(dummyStudentEnrolled);
        }
        catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const getAllEducator = () => {
        try {
            setAllEducators(dummyEducatorData);
        }
        catch (error) {
            console.error('Error fetching educators:', error);
        }
    };
    // fetch single course by id
    const getSingleCourse = (id) => {
        try {
            const course = courses.find((course) => course._id === id);
            return course;
        }
        catch (error) {
            console.error('Error fetching course:', error);
        }
    };
    // func to calc average rating of obj
    const getAverageRating = (obj) => {
        if (!obj) return 0;

        // If it's an array of ratings (like courseRatings)
        const ratingsArray = obj.courseRatings || obj.rating;

        if (Array.isArray(ratingsArray)) {
            if (ratingsArray.length === 0) return 0;
            const total = ratingsArray.reduce((acc, rating) => acc + rating.rating, 0);
            return total / ratingsArray.length;
        }

        // If it's a single rating value
        if (typeof ratingsArray === 'number') {
            return ratingsArray;
        }

    };

    // func to calc course chapter time
    const getChapterTime = (chapter) => {
        if (!chapter || chapter.length === 0) return 0;

        const totalDuration = chapter.chapterContent.reduce((acc, lecture) => {
            return acc + lecture.lectureDuration;
        }, 0);

        return humanizeDuration(totalDuration * 60 * 1000, {
            units: ['h', 'm'],
            round: true,
        });
    };

    // func to calc course time
    const getCourseTime = (course) => {
        if (!course || course.length === 0) return 0;

        const totalDuration = course.courseContent.reduce((acc, chapter) => {
            return acc + chapter.chapterContent.reduce((acc, lecture) => {
                return acc + lecture.lectureDuration;
            }, 0);
        }, 0);

        return humanizeDuration(totalDuration * 60 * 1000, {
            units: ['h', 'm'],
            round: true,
        });
    };

    // func to calc total number of lectures in a course
    const getTotalLectures = (course) => {
        if (!course || course.length === 0) return 0;

        const totalLectures = course.courseContent.reduce((acc, chapter) => {
            return acc + chapter.chapterContent.length;
        }, 0);

        return totalLectures;
    };

    // fetch user enrolled courses
    const getUserEnrolledCourses = () => {
        console.log("entered");
        
        try {
            const student = allStudents.find((student) => student._id === studentId);
            if (!student) return;

            const fullCourses = student.enrolledCourses
                .map(course => {
                    const matchedCourse = courses.find(c => c._id === course.courseId);
                    return {
                        ...course,
                        courseTitle: matchedCourse ? matchedCourse.courseTitle : "Unknown Course",
                        courseThumbnail: matchedCourse ? matchedCourse.courseThumbnail : "https://via.placeholder.com/150",
                        courseDuration: matchedCourse ? getCourseTime(matchedCourse) : "N/A",
                        _id: matchedCourse ? matchedCourse._id : "N/A",
                        courseContent: matchedCourse ? matchedCourse.courseContent : [],
                    };
                });

            setEnrolledCourses(fullCourses);
        }
        catch (error) {
            console.error('Error fetching courses:', error);
        }
    };
    const addToCart = (course) => {
        setCart([...cart, course])
        toast.success("course Add Successfully", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    };

    const removeFromCart = (course) => {
        setCart(cart.filter((item) => item._id !== course._id));
        toast.success("course Remove Successfully", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    };

    const addToWishList = (course) => {
        setWishList([...wishList, course])
        toast.success("course Add Successfully", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    };

    const removeFromWishList = (course) => {
        setWishList(wishList.filter((item) => item._id !== course._id));
        toast.success("course Remove Successfully", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    };


    const getEnrolledStudents = () => {
        try {
            // 1. Find all courses owned by this educator
            const educatorCourses = courses.filter(course => course.educatorId === educatorId);
            const educatorCourseIds = educatorCourses.map(course => course._id);

            const studentsEnrolledInEducatorCourses = allStudents
                .map(student => {
                    // Filter and map student's enrolledCourses
                    const filteredCourses = student.enrolledCourses
                        .filter(course => educatorCourseIds.includes(course.courseId))
                        .map(course => {
                            // Find full course data by ID to get title
                            const matchedCourse = courses.find(c => c._id === course.courseId);
                            return {
                                ...course,
                                courseTitle: matchedCourse ? matchedCourse.courseTitle : "Unknown Course"
                            };
                        });

                    if (filteredCourses.length > 0) {
                        return {
                            ...student,
                            enrolledCourses: filteredCourses, // Only this educator's courses with titles
                        };
                    }

                    return null; // Skip students not enrolled in this educator's courses
                })
                .filter(student => student !== null); // Remove irrelevant students

            setFilteredStudents(studentsEnrolledInEducatorCourses);
        } catch (error) {
            console.error('Error fetching enrolled students:', error);
        }
    };

    const handleGoToPayment = (courses, totalAmount) => {
        setCourseEnroll(true);
        navigate("/checkOut", {
            state: {
                courses,
                totalAmount,
                onPaymentSuccess: `/my-enrollments`,
            },
        });
        cart.length = 0
    };


    const handleEnroll = (enrolledCoursesInput) => {

        try {
            const coursesArray = Array.isArray(enrolledCoursesInput)
                ? enrolledCoursesInput
                : [enrolledCoursesInput];

            const courseIds = coursesArray.map(course => course._id);

            // Update student enrolled courses
            setAllStudents(prevStudents =>
                prevStudents.map(student => {
                    if (student._id === studentId) {
                        return {
                            ...student,
                            enrolledCourses: [
                                ...(student.enrolledCourses || []),
                                ...courseIds.map(courseId => ({
                                    courseId,
                                    purchaseDate: new Date().toISOString(),
                                })),
                            ],
                        };
                    }
                    return student;
                })
            );

            // Update each course's enrolled students
            setCourses(prevCourses =>
                prevCourses.map(course => {
                    if (courseIds.includes(course._id)) {
                        return {
                            ...course,
                            enrolledStudentIds: [
                                ...(course.enrolledStudentIds || []),
                                studentId,
                            ],
                        };
                    }
                    return course;
                })
            );

            // Optionally update UI
            getUserEnrolledCourses();

            toast.success("Enrolled Successfully!", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

        } catch (error) {
            console.error("Error enrolling student:", error);
        }
    };

    const clearCart = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to clear the cart?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, clear it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setCart([]);
                Swal.fire('Cleared!', 'Your cart has been cleared.', 'success');
            }
        });
    };

    const clearWishList = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to clear the wishlist?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, clear it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setWishList([]);
                Swal.fire('Cleared!', 'Your wishlist has been cleared.', 'success');
            }
        });
    };




    const data = {
        courses, setCourses, getAverageRating, isEducator, getSingleCourse, getChapterTime, getCourseTime, getTotalLectures,
        enrolledCourses, setEnrolledCourses, addToCart, cart, setCart, isCartOpen, toggleCart, closeCart, removeFromCart,
        addToWishList, wishList, setWishList, removeFromWishList, educatorId, setEducatorId,
        filteredStudents, setFilteredStudents, studentId, getUserEnrolledCourses,
        allEducators, setAllEducators, allStudents, setAllStudents, studentId, setStudentId, isStudent, setIsStudent,
        handleEnroll, setIsEducator, handleGoToPayment, courseEnroll, getEnrolledStudents, clearCart, clearWishList
    };

    useEffect(() => {
        setIsEducator(localStorage.getItem("isEducator") === "true" ? true : false);
        setIsStudent(localStorage.getItem("isStudent") === "true" ? true : false);

        setStudentId(localStorage.getItem("studentId") || "");
        setEducatorId(localStorage.getItem("educatorId") || "");
        
        getCourses();
        getAllEducator();
        getAllStudents();
    }
        , []);
    
    return (
        <AppContext.Provider value={data}>
            {children}
        </AppContext.Provider>
    );
};
export default AppProvider;