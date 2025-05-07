import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/images/assets";
import { Link, useNavigate } from "react-router";
import { RiMenuUnfold3Line } from "react-icons/ri";
import Loading from "../student/Loading";
import { AppContext } from "../../context/AppContext";
import { CiLogout } from "react-icons/ci";
import { GoUpload } from "react-icons/go";

const Navbar = ({ toggleSidebar }) => {
  const { isEducator, allEducators, setIsEducator } = useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const nav = useNavigate();
  const [educatorImage, setEducatorImage] = useState('')
  const [educator, setEducator] = useState('')

  
  useEffect(() => {
    if (isEducator) {
      const educator = allEducators.find((educator) => educator._id === localStorage.getItem("educatorId"));
      if (educator) {
        setEducatorImage(educator.imageUrl);
        setEducator(educator)
      }
    }
  }, [isEducator, allEducators]);



  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    localStorage.setItem('isEducator', 'false');
    setIsEducator(false);
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
      }
    };
    reader.readAsDataURL(uploadedImage);

  };

  return (
    <div className="bg-white border-b border-gray-500">
      <div className="container mx-auto px-4 max-w-8xl">
        <div className="flex justify-between items-center py-4">
          {/* Left Side - Logo and Sidebar Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-800 border hover:text-white transition-all duration-300 hover:border-gray-800 border-gray-400 mb-1 text-black rounded-full md:hidden"
            >
              <RiMenuUnfold3Line size={15} />
            </button>
            <Link to="/educatorHome" className="flex items-center gap-2">
              <img
                loading="lazy"
                className="w-40 lg:w-56 cursor-pointer"
                src={assets.logo}
                alt="educoreLogo"
              />
            </Link>
          </div>

          {/* Right Side - Greeting and User Icon */}
          <div className="flex items-center gap-3">
            <>
              <div className="flex items-center gap-4">
                <p>
                  Hi! <span className="text-gray-500">
                    {
                      educator ? educator.name : "Educator"
                    }</span>
                </p>

                <div className="relative">
                  {educatorImage ? (
                    <img
                      className="w-8 h-8 cursor-pointer rounded-full object-cover"
                      src={educatorImage}
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
              </div>
            </>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
