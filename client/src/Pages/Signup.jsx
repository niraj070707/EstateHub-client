import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInBegin, signInComplete, signInError } from "../redux/user/userSlice";
import OAuth from "../Components/OAuth";

const Signup = () => {
    const [formdata, setFormData] = useState({});
    const {loading, error} = useSelector((state)=>state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (ev)=>{
        setFormData({
            ...formdata,
            [ev.target.id] : ev.target.value,
        })
    }

    const handleSubmit = async (ev)=>{
        ev.preventDefault();
        try{
            dispatch(signInBegin());
            const result = await fetch('https://estatehub-server.onrender.com/api/auth/signup', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                }, 
                body : JSON.stringify(formdata),
            });
    
            const data = await result.json();
            if(data.success === false){
                dispatch(signInError(data.message));
                return;
            }
            dispatch(signInComplete());
            navigate('/signin');
        }catch(err){
            dispatch(signInError(err.message));
        } 
    }

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="username"
                    className="border p-3 rounded-lg"
                    id="username"
                    onChange={handleChange}
                />
                <input
                    type="email"
                    placeholder="email"
                    className="border p-3 rounded-lg"
                    id="email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="password"
                    className="border p-3 rounded-lg"
                    id="password"
                    onChange={handleChange}
                />

                <button disabled={loading}  className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                    {loading ? "Loading..." : "Sign Up"}
                </button>
                <OAuth />
            </form>

            <div className="flex gap-2 mt-5">
                <p>Have an account?</p>
                <Link to={"/signin"}>
                    <span className="text-blue-700">Sign in</span>
                </Link>
            </div>

            {error && <p className="text-red-500 mt-5">{error}</p>}

        </div>
    );
};

export default Signup; 


