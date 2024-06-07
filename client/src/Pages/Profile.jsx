import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'

const Profile = () => {
    const { currentUser } = useSelector((state)=>state.user);
    const fileref = useRef(null);
    const [image, setImage] = useState(undefined);
    const [imagePerc, setImagePerc] = useState(0);
    const [uploadImageError, setUploadImageError] = useState(false);
    const [formData, setFormData] = useState({});
    console.log(imagePerc);
    console.log(formData);

    useEffect(()=>{
        if(image){
            handleImageUpload(image);
        }
    },[image]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleImageUpload = ( image )=>{
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImagePerc(Math.round(progress));
            },
            (error) => {
                setUploadImageError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
                    setFormData({ ...formData, avatar: downloadURL })
                );
            }
        );
    };

    return (
        <div className=' p-3 max-w-lg mx-auto'>
            <h1 className=' text-3xl font-semibold text-center my-7'>Profile</h1>
            <form className=' flex flex-col gap-4'>
                <input type="file" ref={fileref} hidden accept='image/*' onChange={(ev)=>setImage(ev.target.files[0])}/>
                <img onClick={()=>fileref.current.click()} className=' w-24 h-24 rounded-full self-center ' src={formData.avatar || currentUser.avatar} alt="img" />
                <div className=' text-sm self-center'>
                    { uploadImageError ? (<span className=' text-red-700'>Error Image Upload</span>) : 
                        ((imagePerc > 0 &&  imagePerc < 100 ) ? (<span className=' text-slate-700'> { `Uploading ${imagePerc}%`} </span>) : 
                            (imagePerc===100 ? <span className=' text-green-600'>Image Uploaded Successfully</span> : '')
                        )
                    }
                </div>
                <input onChange={ handleChange } type="text" placeholder='username' id='username' className=' border p-3 rounded-lg'/>
                <input onChange={ handleChange } type="text" placeholder='email' id='email' className=' border p-3 rounded-lg'/>
                <input onChange={ handleChange }  type="text" placeholder='password' id='password' className=' border p-3 rounded-lg'/>
                <button className=' uppercase p-3 hover:opacity-95 rounded-lg bg-slate-700 text-white'>update</button>
            </form>
            <div className=' flex justify-between mt-5'>
                <span className='text-red-700 cursor-pointer'>Delete Account</span>
                <span className='text-red-700 cursor-pointer'>Sign Out</span>
            </div>
        </div>
    )
}

export default Profile