import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router';

const WishList = () => {
    const { wishList, removeFromWishList, addToCart, cart, clearWishList, allEducators } = useContext(AppContext);
    const navigate = useNavigate();

    const handleAddToCart = (course) => {
        addToCart(course);
    };

    const isInCart = (courseId) => {
        return cart.some(item => item._id === courseId);
    };

    return (
        <div className="mt-32 mb-20 mx-4 xl:mx-0">
            <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-8 max-w-7xl">
                <h1 className="text-3xl font-bold mb-4">My WishList</h1>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-300">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-blue-50">
                            <tr>
                                <th className="px-6 py-4 border-b">#</th>
                                <th className="px-6 py-4 border-b">Course</th>
                                <th className="px-6 py-4 border-b">Educator</th>
                                <th className="px-6 py-4 border-b">Price</th>
                                <th className="px-6 py-4 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white text-gray-900 font-semibold">
                            {wishList.length === 0 ? (
                                <tr className="bg-white border-b">
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">Your WishList is empty.</td>
                                </tr>
                            ) : (
                                wishList.map((course, index) => (
                                    <tr key={course._id} className="hover:bg-gray-50 border-b">
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="flex items-center px-6 py-4">
                                            <img src={course.courseThumbnail} alt="course" className="w-20 h-16 object-cover rounded mr-4" />
                                            <span>{course.courseTitle}</span>
                                        </td>
                                        <td className="px-6 py-4">{allEducators.find((educator) => educator.courses.includes(course._id)).name || 'N/A'}</td>
                                        <td className="px-6 py-4 text-green-600 font-bold">
                                            ${((course.coursePrice - (course.coursePrice * course.discount) / 100).toFixed(2))}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => removeFromWishList(course)}
                                                className="bg-red-500 text-white py-1 mr-3 px-3 rounded hover:bg-red-600 text-sm"
                                            >
                                                Remove
                                            </button>

                                            {isInCart(course._id) ? (
                                                <button
                                                    onClick={() => navigate('/cart')}
                                                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 text-sm"
                                                >
                                                    Go to Cart
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleAddToCart(course)}
                                                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 text-sm"
                                                >
                                                    Add to Cart
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {wishList.length > 0 && (
                    <div className='mt-4 flex justify-end items-center'>
                        <button
                            onClick={clearWishList}
                            className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg"
                        >
                            Clear wishlist
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishList;
