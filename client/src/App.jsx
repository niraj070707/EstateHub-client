import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import About from "./Pages/About";
import Header from "./Components/Header";

function App() {
    return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element = { <Home />} />
            <Route path="/signin" element = { <Signin />} />
            <Route path="/signup" element = { <Signup />} />
            <Route path="/profile" element = { <Profile />} />
            <Route path="/about" element = { <About />} /> 
        </Routes>
    </BrowserRouter>)
}

export default App;
