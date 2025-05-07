import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router';
import { IoCloseCircle } from "react-icons/io5";

const CartDrawer = () => {
    const { isCartOpen, closeCart, cart,removeFromCart } = useContext(AppContext);

    const total = cart.reduce((acc, course) => {
        const discounted = course.coursePrice - (course.coursePrice * course.discount) / 100;
        return acc + discounted;
    }, 0).toFixed(2);

    return (
        <>
            {/* Overlay */}
            {isCartOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={closeCart}
                ></div>
            )}

            {/* Cart Drawer */}
            <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center p-4 border-b">
                    <div className='flex gap-3'>
                        <h2 className="text-xl font-semibold">Your Cart</h2>
                        <p className='text-gray-500'>{cart.length} items</p>
                    </div>
                    <button onClick={closeCart} className="text-2xl font-bold hover:text-red-500">&times;</button>
                </div>

                <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100%-160px)]">
                    {cart.length === 0 ? (
                        <p className="text-gray-500">Your cart is empty.</p>
                    ) : (
                        cart.map((course) => (
                            <div key={course._id} className="flex gap-4 items-start border-b pb-2">
                                <div className='relative'>
                                    <img src={course.courseThumbnail} alt="courseImag" className='w-16 h-16 block' />
                                    <IoCloseCircle onClick={() => removeFromCart(course)} className='absolute -top-3 -left-3 text-red-500 text-2xl cursor-pointer hover:text-red-600' />
                    
                                </div>
                                <div className='flex flex-col'>
                                    <p className="font-semibold">{course.courseTitle}</p>
                                    <p className="text-sm text-gray-500">
                                        ${((course.coursePrice - (course.coursePrice * course.discount) / 100).toFixed(2))}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-4 border-t">
                        <p className="font-semibold text-lg mb-2">Total: ${total}</p>
                        <Link to="/cart" className="block bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-md font-bold" onClick={closeCart}>
                            View Cart
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
