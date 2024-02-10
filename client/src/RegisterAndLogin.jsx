import React, { useState } from 'react'

const RegisterAndLogin = () => {
    const [loginOrRegister, setloginOrRegister] = useState('login');

    return (
        <div className=' flex justify-center items-center flex-col h-dvh bg-gray-100'>
            {loginOrRegister === 'login' &&
                <div>
                    <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
            }

            {loginOrRegister === 'register' &&
                <div>
                    <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                        Register your account
                    </h2>
                </div>
            }

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
                <div className='sm:p-10 sm:bg-white sm:rounded-lg sm:border sm:mx-auto sm:w-full sm:max-w-lg shadow-md'>
                    <form className="space-y-6" action="#" method="POST">
                        {loginOrRegister === 'register' &&
                            <div>
                                <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="username"
                                        placeholder='enter username'
                                        autoComplete="username"
                                        required
                                        className="p-2 pl-3 block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        }

                        <div>
                            <label htmlFor="email" className="block text-lg font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder='enter email address'
                                    autoComplete="email"
                                    required
                                    className="p-2 pl-3 block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="text-lg block font-medium leading-6 text-gray-900">
                                Password
                            </label>

                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="mb-9 block w-full rounded-md border-0 p-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {loginOrRegister === 'login' &&
                            <div>
                                <div className="flex items-center justify-between">
                                    <div className='flex gap-2'>
                                        <input type="checkbox" />
                                        <label htmlFor="password" className=" text-lg block leading-6 text-gray-600 ">
                                            Remember me
                                        </label>
                                    </div>
                                    <div className="text-sm">
                                        <a href="#" className="text-lg font-semibold text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="mt-5 text-md font-medium flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        }

                        {loginOrRegister === 'register' &&
                            <button
                                type="submit"
                                className="text-md font-medium flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Register
                            </button>
                        }

                    </form>

                    <div className='flex mt-10 relative justify-center items-center'>
                        <div className=' border w-full'></div>
                        <div className=' absolute pl-7 pr-7 bg-white font-medium text-lg'>Or continue with</div>
                    </div>

                    <div className='mt-10 flex justify-between'>
                        <button className=' hover:bg-gray-100 flex justify-center items-center gap-3 font-medium p-2 pl-14 pr-14 rounded-md border-2 border-gray-300'>
                            <svg height="28" viewBox="0 0 48 48" width="28" xmlns="http://www.w3.org/2000/svg"><path d="m43.611 20.083h-1.611v-.083h-18v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657c-3.572-3.329-8.35-5.382-13.618-5.382-11.045 0-20 8.955-20 20s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#ffc107" /><path d="m6.306 14.691 6.571 4.819c1.778-4.402 6.084-7.51 11.123-7.51 3.059 0 5.842 1.154 7.961 3.039l5.657-5.657c-3.572-3.329-8.35-5.382-13.618-5.382-7.682 0-14.344 4.337-17.694 10.691z" fill="#ff3d00" /><path d="m24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238c-2.008 1.521-4.504 2.43-7.219 2.43-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025c3.31 6.477 10.032 10.921 17.805 10.921z" fill="#4caf50" /><path d="m43.611 20.083h-1.611v-.083h-18v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238c-.438.398 6.591-4.807 6.591-14.807 0-1.341-.138-2.65-.389-3.917z" fill="#1976d2" /></svg>
                            Google
                        </button>
                        <button className=' hover:bg-gray-100 flex justify-center items-center gap-3 font-medium p-2 pl-14 pr-14 rounded-md border-2 border-gray-300'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 98 96"><path d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f" /></svg>
                            Github
                        </button>
                    </div>
                </div>

                {loginOrRegister === 'login' &&
                    <div className="mt-5 text-center text-base text-gray-500">
                        Not a member?{' '}
                        <button className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 " onClick={() => setloginOrRegister('register')}>
                            Register
                        </button>
                    </div>
                }

                {loginOrRegister === 'register' &&
                    <div className="mb-4 mt-5 text-center text-base text-gray-500">
                        Already a member?{' '}
                        <button className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={() => setloginOrRegister('login')}>
                            Sign in
                        </button>
                    </div>
                }

            </div>
        </div>
    )
}

export default RegisterAndLogin