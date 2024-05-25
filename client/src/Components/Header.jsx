import React from "react";

const Header = () => {
    return (
        <header>
            <div>
                <h1 className=" bg-black w-80">
                    Anand
                </h1>
                <h1>
                    Estate
                </h1>
                <form className=" bg-slate-200">
                    <input 
                        type="text" 
                        placeholder="Search.." 
                        className=" bg-transparent focus:outline-none w-80"
                    />
                </form>
            </div>
        </header>
    );
};

export default Header;
