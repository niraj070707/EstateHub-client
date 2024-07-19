import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import About from "./Pages/About";
import Header from "./Components/Header";
import PrivateRouteForProfile from "./Components/PrivateRouteForProfile";
import CreateListing from "./Pages/CreateListing";
import UpdateListing from "./Pages/UpdateListing";

function App() {
    return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element = { <Home />} />
            <Route path="/signin" element = { <Signin />} />
            <Route path="/signup" element = { <Signup />} />
            <Route path="/about" element = { <About />} /> 
            <Route element={ <PrivateRouteForProfile />}>
                <Route path="/profile" element = { <Profile />} />
                <Route path="/createListing" element = { <CreateListing />} /> 
                <Route path="/update-listing/:listingId" element = { <UpdateListing />} /> 
            </Route>
        </Routes>
    </BrowserRouter>)
}

export default App;
