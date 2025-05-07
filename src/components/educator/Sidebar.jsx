import { NavLink } from 'react-router';
import { X, Home, PlusCircle, BookOpen, Users } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const closeSidebar = () => setIsOpen(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-6 py-3 w-full transition-all ${isActive
      ? 'bg-gradient-to-r from-blue-500 to-blue-700 border-r-black rounded-l-full text-white font-semibold border-r-4 border-blue-700'
      : 'text-gray-700 hover:text-blue-600'
    }`;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 border-r-gray-500 h-screen w-64 bg-white shadow-lg z-50 py-6 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static md:shadow-none flex flex-col border-r border-gray-200`}>

        {/* Top section: Logo + X button */}
        <div className="flex items-center justify-between mb-5 ml-6 mr-2">
          <h2 className="text-2xl font-bold">Educator</h2>
          {isOpen && (
            <button
              onClick={closeSidebar}
              className="text-gray-800 md:hidden hover:text-red-600 transition duration-300"
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-2">
          <NavLink to="/educator" end className={linkClass}>
            <Home size={20} /> Dashboard
          </NavLink>
          <NavLink to="/educator/add-course" className={linkClass}>
            <PlusCircle size={20} /> Add Course
          </NavLink>
          <NavLink to="/educator/my-courses" className={linkClass}>
            <BookOpen size={20} /> My Courses
          </NavLink>
          <NavLink to="/educator/student-enrolled" className={linkClass}>
            <Users size={20} /> Student Enrolled
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
