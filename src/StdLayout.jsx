import React, { Suspense } from 'react'
import Navbar from './components/student/Navbar'
import { Outlet, useMatch } from 'react-router'
import Footer from './components/student/Footer'
import Loading from './components/student/Loading'
import CartDrawer from './components/CartDrawer'

const StdLayout = () => {
    // const isEducatorRoute = useMatch('/educator/*')
    return (
        <div>
            <Navbar />
            <div>
                {/* This is where the child components will be rendered */}
                <Suspense fallback={<div className="flex justify-center items-center h-screen">
                    <Loading />
                </div>}>
                    <Outlet />
                </Suspense>
            </div>
            <CartDrawer />

            <Footer />
        </div>
    )
}

export default StdLayout