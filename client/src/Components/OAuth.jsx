import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { signInComplete } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleGoogleLogin = async ()=>{
        try { 
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            console.log(result);
            const res = await fetch('https://estatehub-server.onrender.com/api/auth/google', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({ name : result.user.displayName, email : result.user.email, photoUrl : result.user.photoURL, }),
            });
            const data = await res.json();
            dispatch(signInComplete(data));
            navigate('/');
        }catch(err){
            console.log("Could not sign in with google", err);
        }
    }
    return (
        <button onClick={ handleGoogleLogin } type='button' className=' hover:opacity-95 bg-red-700 text-white p-3 rounded-lg uppercase'>
            Continue With Google
        </button>
    )
}

export default OAuth