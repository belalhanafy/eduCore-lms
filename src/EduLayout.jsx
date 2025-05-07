import React, { Suspense, useState } from 'react'
import { Outlet } from 'react-router'
import Footer from './components/educator/Footer'
import Navbar from './components/educator/Navbar'
import Sidebar from './components/educator/Sidebar'
import Loading from './components/student/Loading'

const EduLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} toggleSidebar={toggleSidebar} />
            <div className='flex'>
                <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} toggleSidebar={toggleSidebar} />
                <div className={`flex-1 transition-all duration-300 overflow-y-auto h-screen ${isOpen ? 'ml-64 md:ml-0' : 'ml-0'}`}>
                    <div className='p-4'>
                        {/* This is where the child components will be rendered */}
                        <Suspense fallback={<div className="flex justify-center items-center h-screen">
                            <Loading />
                        </div>}>
                            <Outlet />
                        </Suspense>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default EduLayout