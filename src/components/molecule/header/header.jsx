import React, { useState } from "react";
import { logout } from "../../../../firebase";
import { useCookies } from "react-cookie";
import Logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { BiSearchAlt, BiCategoryAlt, BiMenu } from "react-icons/bi";
import { MdLogout, MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  setSelectedCategory,
} from "../../../app/features/booksSlice/booksSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [wide, setWide] = useState(false);
  const [cookies, setCookies, removeCookies] = useCookies(["uid", "token"]);

  const search = useSelector((state) => state.books.searchQuery);
  const categories = useSelector((state) => state.books.categories);
  const selectedCategory = useSelector((state) => state.books.selectedCategory);

  const handleLogout = async () => {
    const user = await logout();
    removeCookies(["uid", "token"]);
    navigate("/login");
  };
  return (
    <header className="flex justify-start gap-10 px-4 py-8 flex-col h-screen bg-gradient-to-b from-purple-900 to-pink-900 text-white border-r-2 border-r-slate-500">
      <div className="logo">
        {wide && (
          <div className="flex justify-between items-center">
            <img
              src={Logo}
              alt="logo"
              className="rounded-full border-2 border-pink-900 w-16"
            />
            <MdOutlineClose
              className="cursor-pointer text-2xl"
              onClick={() => setWide(false)}
            />
          </div>
        )}
        {!wide && (
          <BiMenu
            className="cursor-pointer text-2xl"
            onClick={() => setWide(true)}
          />
        )}
      </div>
      <div
        className={`search flex gap-2 items-start flex-col ${
          !wide && "items-center"
        }`}
      >
        <label htmlFor="search" className="flex gap-2 items-center">
          <span className="text-xl cursor-pointer">
            <BiSearchAlt onClick={() => setWide(true)} />
          </span>
          {wide && <span>Search</span>}
        </label>
        {wide && (
          <input
            type="text"
            name="search"
            id="search"
            className="p-2 rounded focus:outline-none bg-slate-200 text-black font-poppins max-w-[240px] focus:border-sky-500 transition-all duration-300 focus:border-2"
            value={search}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        )}
      </div>
      <div
        className={`category flex flex-col gap-2 ${!wide && "items-center"}`}
      >
        <label htmlFor="cateory" className="flex gap-2 items-center">
          <span className="text-xl cursor-pointer">
            <BiCategoryAlt onClick={() => setWide(true)} />
          </span>
          {wide && <span>Select Category</span>}
        </label>
        {wide && (
          <select
            name="category"
            id="category"
            className="p-2 rounded bg-pink-800 hover:bg-purple-800 transition-all duration-300 cursor-pointer"
            value={selectedCategory}
            onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
          >
            <option value=""></option>
            {categories.map((category, index) => {
              return (
                <option key={index} value={category}>
                  {category}
                </option>
              );
            })}
          </select>
        )}
      </div>
      <div
        className={`logout flex gap-2 items-center ${
          !wide && "justify-center"
        }`}
      >
        <span className="text-xl cursor-pointer">
          <MdLogout onClick={handleLogout} />
        </span>
        {wide && (
          <button
            className="font-poppins font-semibold"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
