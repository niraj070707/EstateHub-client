import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice'
import { Link } from 'react-router-dom'
const Profile = () => {
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const fileref = useRef(null);
    const [image, setImage] = useState(undefined);
    const [imagePerc, setImagePerc] = useState(0);
    const [uploadImageError, setUploadImageError] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [showListingsError, setShowListingsError] = useState(false);
    const [userListings, setUserListings] = useState([]);
    console.log(formData);

    useEffect(() => {
        if (image) {
            handleImageUpload(image);
        }
    }, [image]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleImageUpload = (image) => {
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

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        try {
            dispatch(updateUserStart());
            const result = await fetch(`https://estatehub-server.onrender.com/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await result.json();
            console.log(data);
            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }
            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
        } catch (err) {
            dispatch(updateUserFailure(err.message));
        }
    }

    const handleSignOut = async (ev) => {
        try {
            dispatch(signOutUserStart());
            const res = await fetch('https://estatehub-server.onrender.com/api/auth/signout');
            const data = await res.json();
            if (data.success === false) {
                dispatch(signOutUserFailure(data.message));
                return;
            }
            dispatch(signOutUserSuccess());
        } catch (err) {
            dispatch(signOutUserFailure(err.message));
        }
    }

    const handleDeleteUser = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`https://estatehub-server.onrender.com/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));
        } catch (err) {
            dispatch(deleteUserFailure(err.message));
        }
    };

    const handleShowListings = async () => {
        try {
            setShowListingsError(false);
            const res = await fetch(`https://estatehub-server.onrender.com/api/user/listings/${currentUser._id}`);
            const data = await res.json();
            if (data.success === false) {
                setShowListingsError(true);
                return;
            }
            setUserListings(data);
        } catch (error) {
            setShowListingsError(true);
        }
    };

    const handleListingDelete = async (listingId) => {
        try {
            const res = await fetch(`https://estatehub-server.onrender.com/api/listing/delete/${listingId}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }

            setUserListings((prev) =>
                prev.filter((listing) => listing._id !== listingId)
            );
        } catch (error) {
            console.log(error.message);
        }
    };
    console.log(userListings);

    return (
        <div className=' p-3 max-w-lg mx-auto'>
            <h1 className=' text-3xl font-semibold text-center my-7'>Profile</h1>

            <form className=' flex flex-col gap-4' onSubmit={handleSubmit}>
                <input type="file" ref={fileref} hidden accept='image/*' onChange={(ev) => setImage(ev.target.files[0])} />
                <img onClick={() => fileref.current.click()} className=' hover:opacity-95 cursor-pointer w-24 h-24 rounded-full self-center ' src={formData.avatar || currentUser.avatar} alt="img" />
                <div className=' text-sm self-center'>
                    {uploadImageError ? (<span className=' text-red-700'>Error Image Upload</span>) :
                        ((imagePerc > 0 && imagePerc < 100) ? (<span className=' text-slate-700'> {`Uploading ${imagePerc}%`} </span>) :
                            (imagePerc === 100 ? <span className=' text-green-600'>Image Uploaded Successfully</span> : '')
                        )
                    }
                </div>
                <input onChange={handleChange} defaultValue={currentUser.username} type="text" placeholder='username' id='username' className=' border p-3 rounded-lg' />
                <input onChange={handleChange} defaultValue={currentUser.email} type="text" placeholder='email' id='email' className=' border p-3 rounded-lg' />
                <input onChange={handleChange} type="text" placeholder='password' id='password' className=' border p-3 rounded-lg' />
                <button disabled={loading} className=' uppercase p-3 hover:opacity-95 rounded-lg bg-slate-700 text-white'>
                    {loading ? 'Loding..' : 'Update'}
                </button>
                <Link className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to={'/createListing'}>
                    Create Listing
                </Link>
            </form>

            <div className=' flex justify-between mt-5'>
                <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
                <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign Out</span>
            </div>

            <p className='text-red-700 mt-5'>{error ? error : ''}</p>
            <p className='text-green-700 mt-5'>
                {updateSuccess ? 'User is updated successfully!' : ''}
            </p>
            <button onClick={handleShowListings} className='text-green-700 w-full'>
                Show Listings
            </button>
            <p className='text-red-700 mt-5'>
                {showListingsError ? 'Error showing listings' : ''}
            </p>

            {userListings && userListings.length > 0 && (
                <div className='flex flex-col gap-4'>
                    <h1 className='text-center mt-7 text-2xl font-semibold'>
                        Your Listings
                    </h1>
                    {userListings.map((listing) => (
                        <div
                            key={listing._id}
                            className='border rounded-lg p-3 flex justify-between items-center gap-4'
                        >
                            <Link to={`/listing/${listing._id}`}>
                                <img
                                    src={listing.imageUrls[0]}
                                    alt='listing cover'
                                    className='h-16 w-16 object-contain'
                                />
                            </Link>
                            <Link
                                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                                to={`/listing/${listing._id}`}
                            >
                                <p>{listing.name}</p>
                            </Link>

                            <div className='flex flex-col item-center'>
                                <button
                                    onClick={() => handleListingDelete(listing._id)}
                                    className='text-red-700 uppercase'
                                >
                                    Delete
                                </button>
                                <Link to={`/update-listing/${listing._id}`}>
                                    <button className='text-green-700 uppercase'>Edit</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Profile