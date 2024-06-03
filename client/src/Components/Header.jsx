import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className=" bg-slate-200 shadow-md">
            <div className=" flex items-center justify-between max-w-6xl mx-auto p-3">
                <Link to={'/'}>
                    <h1 className=" flex font-bold text-sm sm:text-xl flex-wrap cursor-pointer">
                        <span className=" text-slate-500">Anand</span>
                        <span className=" text-slate-700">Estate</span>
                    </h1>
                </Link>
                
                <form className=" flex items-center bg-slate-100 p-3 rounded-lg">
                    <input 
                        type="text" 
                        placeholder="Search.." 
                        className=" bg-transparent focus:outline-none w-32 sm:w-64"
                    />
                    <FaSearch className=" text-slate-500" />
                </form>
                <ul className=" flex gap-4 sm:gap-10">
                    <Link to={'/signin'}><li className=" sm:inline hover:underline cursor-pointer">Sign-in</li></Link>
                    <Link to={'/about'}><li className=" hidden sm:inline hover:underline cursor-pointer">About</li></Link>
                    <Link to={'/'}><li className=" hidden sm:inline hover:underline cursor-pointer">Home</li></Link>
                </ul>
            </div>
        </header>
    );
};

export default Header;
