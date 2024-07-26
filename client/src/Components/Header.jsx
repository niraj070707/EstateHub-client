import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const { currentUser } = useSelector((state)=>state.user);
    // console.log(currentUser?.avatar);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);

    return (
        <header className=" bg-slate-200 shadow-md">
            <div className=" flex items-center justify-between max-w-6xl mx-auto p-3">
                <Link to={'/'}>
                    <h1 className=" flex font-bold text-sm sm:text-xl flex-wrap cursor-pointer">
                        <span className=" text-slate-500">Estate</span>
                        <span className=" text-slate-700">Hub</span>
                    </h1>
                </Link>
                
                <form onSubmit={handleSubmit} className=" flex items-center bg-slate-100 p-3 rounded-lg">
                    <input 
                        type="text" 
                        placeholder="Search.." 
                        className=" bg-transparent focus:outline-none w-32 sm:w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button><FaSearch className='text-slate-600' /> </button>
                </form>
                <ul className=" flex gap-4 sm:gap-10">
                    <Link to={'/'}><li className=" hidden sm:inline hover:underline cursor-pointer">Home</li></Link>
                    <Link to={'/about'}><li className=" hidden sm:inline hover:underline cursor-pointer">About</li></Link>
                    {/* <Link to={'/signin'}><li className=" sm:inline hover:underline cursor-pointer">Sign-in</li></Link> */}
                    <Link to={'/profile'}>
                        {currentUser ? 
                            <img className=" object-cover h-7 w-7 rounded-full" src={currentUser.avatar} alt="Profile" /> : 
                            <li className=" sm:inline hover:underline cursor-pointer">Sign-in</li>
                        }
                    </Link>
                </ul>
            </div>
        </header>
    );
};

export default Header;
