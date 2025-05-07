import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/images/assets";
import { Link, useLocation, useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { AppContext } from "../../context/AppContext";
import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import Loading from "./Loading";
import { CiLogout } from "react-icons/ci";
import { GoUpload } from "react-icons/go";


const Navbar = () => {
  const { isEducator, cart, toggleCart, wishList, setIsEducator, allEducators, setEducatorId, isStudent, allStudents, setIsStudent, setStudentId } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [EducatorImage, setEducatorImage] = useState('')
  const [studentImage, setStudentImage] = useState('')

  useEffect(() => {
    if (isEducator) {
      const educator = allEducators.find((educator) => educator._id === localStorage.getItem("educatorId"));
      if (educator) {
        setEducatorImage(educator.imageUrl);
      }
    } else if (isStudent) {
      const student = allStudents.find((student) => student._id === localStorage.getItem("studentId"));
      if (student) {
        setStudentImage(student.imageUrl);
      }
    }
  }, [isEducator, allEducators, isStudent, allStudents]);


  const location = useLocation();
  const nav = useNavigate();


  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    if (isEducator) {
      localStorage.setItem('isEducator', 'false');
      setIsEducator(false);
      localStorage.removeItem('educatorId');
      setEducatorId('');
    } else if (isStudent) {
      localStorage.setItem('isStudent', 'false');
      setIsStudent(false);
      localStorage.removeItem('studentId');
      setStudentId('');
    }
    nav("/");
  };

  const handleImageUpload = (event) => {
    setDropdownOpen(false);
    const uploadedImage = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (isEducator) {
        const educator = allEducators.find((educator) => educator._id === localStorage.getItem("educatorId"));
        if (educator) {
          educator.imageUrl = reader.result;
        }
        setEducatorImage(reader.result);
      } else if (isStudent) {
        const student = allStudents.find((student) => student._id === localStorage.getItem("studentId"));
        if (student) {
          student.imageUrl = reader.result;
        }
      }
      setStudentImage(reader.result);
    };
    reader.readAsDataURL(uploadedImage);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowX = "hidden";
    } else {
      document.body.style.overflowX = "";
    }

    return () => {
      document.body.style.overflowX = "";
    };
  }, [isOpen]);


  useEffect(() => {
    if (isEducator) {
      nav('/educatorHome');
    }
  }, [isEducator]);


  const handleCreateAccount = () => {
    if (location.pathname.includes("/educatorHome")) {
      nav('/auth/eduSign-in');
    } else {
      nav('/auth/sign-in');
    }
  }

  return (
    <div
      className={`${location.pathname.includes("/course-list")
        ? "bg-white border-b border-gray-500"
        : "bg-[#c9e7ff]"
        } fixed top-0 left-0 w-full z-50`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center py-4">
          <Link to={`${isEducator ? "/educatorHome" : "/"}`} className="flex items-center gap-2">
            <img
              loading="lazy"
              className="w-40 lg:w-56 cursor-pointer"
              src={assets.logo}
              alt="educoreLogo"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-5">
            {isEducator || isStudent ? (
              <>
                {isEducator ? (
                  <div className="flex items-center gap-4">
                    <Link to="/educator">
                      <button className="hover:text-blue-700">Educator Dashboard</button>
                    </Link>

                    <div className="relative">
                      {EducatorImage ? (
                        <img
                          className="max-w-8 cursor-pointer rounded-full"
                          src={EducatorImage}
                          alt="Profile"
                          onClick={toggleDropdown}
                        />
                      ) : (
                        <img
                          className="max-w-8 cursor-pointer rounded-full"
                          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          alt="Profile"
                          onClick={toggleDropdown}
                        />
                      )}
                      {/* Dropdown menu */}
                      {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
                          <ul className="py-2">
                            <li>
                              <label
                                htmlFor="image-upload"
                                className=" px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                              >
                                <GoUpload />
                                Upload Image
                              </label>
                              <input
                                type="file"
                                id="image-upload"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                              />
                            </li>
                            <li>
                              <button
                                onClick={handleLogout}
                                className=" px-4 py-2 text-gray-700 w-full text-left hover:bg-gray-100 flex items-center gap-2"
                              >
                                <CiLogout />Logout
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <Link to="/educatorHome">
                      <button className="hover:text-blue-700">Become Educator</button>
                    </Link>
                    <span>|</span>
                    <Link to="/my-enrollments" className="hover:text-blue-700">
                      My Enrollments
                    </Link>
                    <button onClick={toggleCart} className="relative">
                      <IoCartOutline className="text-xl hover:text-blue-700" />
                      <span className="absolute -top-2 -right-2 bg-blue-500 text-white w-4 p-2 h-4 rounded-full flex items-center justify-center">
                        {cart.length || 0}
                      </span>
                    </button>
                    <Link to="/wishList" className="relative">
                      <FaRegHeart className="text-xl hover:text-blue-700" />
                      <span className="absolute -top-2 -right-2 bg-blue-500 text-white w-4 p-2 h-4 rounded-full flex items-center justify-center">
                        {wishList.length || 0}
                      </span>
                    </Link>
                    <div className="relative">
                      {studentImage ? (
                        <img
                          className="w-8 h-8 cursor-pointer rounded-full object-cover"
                          src={studentImage}
                          alt="Profile"
                          onClick={toggleDropdown}
                        />
                      ) : (
                        <img
                          className="w-8 h-8 cursor-pointer rounded-full object-cover"
                          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          alt="Profile"
                          onClick={toggleDropdown}
                        />
                      )}
                      {/* Dropdown menu */}
                      {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
                          <ul className="py-2">
                            <li>
                              <label
                                htmlFor="image-upload"
                                className=" px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                              >
                                <GoUpload />
                                Upload Image
                              </label>
                              <input
                                type="file"
                                id="image-upload"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                              />
                            </li>
                            <li>
                              <button
                                onClick={handleLogout}
                                className=" px-4 py-2 text-gray-700 w-full text-left hover:bg-gray-100 flex items-center gap-2"
                              >
                                <CiLogout />Logout
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                {!location.pathname.includes("/educatorHome") && !isEducator &&
                  <Link to="/educatorHome" className="hover:text-blue-700">
                    Become Educator
                  </Link>
                }
                <div className="relative inline-flex items-center justify-center gap-4 group ml-4">
                  <div className="absolute inset-0 duration-1000 opacity-60 transition-all bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-xl blur-lg group-hover:opacity-100" />
                  <button onClick={() => handleCreateAccount()} className="group relative inline-flex items-center justify-center text-xs lg:text-base bg-gray-900 text-white rounded-xl px-4 py-2 font-semibold hover:bg-gray-800 hover:shadow-md hover:-translate-y-0.5">
                    Create Account
                    <svg
                      viewBox="0 0 10 10"
                      height={10}
                      width={10}
                      fill="none"
                      className="ml-2 stroke-white"
                    >
                      <path d="M0 5h7" className="opacity-0 group-hover:opacity-100 transition" />
                      <path d="M1 1l4 4-4 4" className="group-hover:translate-x-[3px] transition" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>



          {/* Mobile Menu Toggle */}
          {isStudent && !isEducator && (
            <div className="lg:hidden flex items-center gap-5 cursor-pointer">
              <label className="flex flex-col gap-2 w-8">
                <input
                  onChange={toggleMenu}
                  checked={isOpen}
                  className="peer hidden"
                  type="checkbox"
                />
                <div
                  className={`rounded-2xl h-[2px] w-1/2 ${isOpen ? "bg-red-700" : "bg-black"
                    } duration-500 peer-checked:rotate-[225deg] origin-right peer-checked:-translate-x-[12px] peer-checked:-translate-y-[1px]`}
                />
                <div
                  className={`rounded-2xl h-[3px] w-full ${isOpen ? "bg-red-700" : "bg-black"
                    } duration-500 peer-checked:-rotate-45`}
                />
                <div
                  className={`rounded-2xl h-[2px] w-1/2 ${isOpen ? "bg-red-700" : "bg-black"
                    } duration-500 place-self-end peer-checked:rotate-[225deg] origin-left peer-checked:translate-x-[12px] peer-checked:translate-y-[1px]`}
                />
              </label>
              <div className="relative">
                {studentImage ? (
                  <img
                    className="max-w-8 cursor-pointer rounded-full"
                    src={studentImage}
                    alt="Profile"
                    onClick={toggleDropdown}
                  />
                ) : (
                  <img
                    className="max-w-8 cursor-pointer rounded-full"
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="Profile"
                    onClick={toggleDropdown}
                  />
                )}
                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
                    <ul className="py-2">
                      <li>
                        <label
                          htmlFor="image-upload"
                          className=" px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                        >
                          <GoUpload />
                          Upload Image
                        </label>
                        <input
                          type="file"
                          id="image-upload"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className=" px-4 py-2 text-gray-700 w-full text-left hover:bg-gray-100 flex items-center gap-2"
                        >
                          <CiLogout />Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
          {!isStudent && isEducator && (
            <div className="lg:hidden flex gap-5 items-center">
              <Link to="/educator">
                <button className="hover:text-blue-700">Educator Dashboard</button>
              </Link>
              <div className="relative">
                {EducatorImage ? (
                  <img
                    className="max-w-8 cursor-pointer rounded-full"
                    src={EducatorImage}
                    alt="Profile"
                    onClick={toggleDropdown}
                  />
                ) : (
                  <img
                    className="max-w-8 cursor-pointer rounded-full"
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="Profile"
                    onClick={toggleDropdown}
                  />
                )}
                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
                    <ul className="py-2">
                      <li>
                        <label
                          htmlFor="image-upload"
                          className=" px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                        >
                          <GoUpload />
                          Upload Image
                        </label>
                        <input
                          type="file"
                          id="image-upload"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className=" px-4 py-2 text-gray-700 w-full text-left hover:bg-gray-100 flex items-center gap-2"
                        >
                          <CiLogout />Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Drawer - Only for non-educators */}
      {isStudent && !isEducator && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0, display: "none" }}
              transition={{
                type: "tween",
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="w-full bg-primaryDeep text-black shadow-lg lg:hidden h-auto py-6 z-50"
            >
              <nav className="container max-w-7xl">
                <ul className="flex flex-col items-center gap-4">
                  <motion.li
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ delay: 0.2 }}
                    className="text-center text-lg"
                  >
                    <Link to="/educatorHome">
                      <button className="hover:text-blue-700">Become Educator</button>
                    </Link>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ delay: 0.4 }}
                    className="text-center text-lg"
                  >
                    <Link className="hover:text-blue-700" to="/my-enrollments">
                      My Enrollments
                    </Link>
                  </motion.li>
                  <div className="flex gap-4">
                    <motion.li
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ delay: 0.6 }}
                      className="text-center text-lg"
                    >
                      <button onClick={toggleCart} className="relative">
                        <IoCartOutline className="text-xl hover:text-blue-700" />
                        <span className="absolute -top-2 -right-2 bg-blue-500 text-white w-4 p-2 h-4 rounded-full flex items-center justify-center">
                          {cart.length || 0}
                        </span>
                      </button>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      transition={{ delay: 0.6 }}
                      className="text-center text-lg"
                    >
                      <Link className="relative" to="/wishList">
                        <FaRegHeart className="text-xl hover:text-blue-700" />
                        <span className="absolute -top-2 -right-5 bg-blue-500 text-white w-4 p-2 h-4 rounded-full flex items-center justify-center">
                          {wishList.length || 0}
                        </span>
                      </Link>
                    </motion.li>
                  </div>
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Navbar;
