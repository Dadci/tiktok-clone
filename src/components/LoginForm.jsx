import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/loginSlice'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';


const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.login.user)

    const handleSubmit = async (e) => {
        e.preventDefault()

        dispatch(login({ username, password }))
        if (user && username === user.username && password === user.password) {
            toast.success('Logged in successfully');
            navigate('/feed')
        }
        else {
            toast.error('Invalid credentials, please try again');
        }
        setPassword('')
        setUsername('')
    }

    return (
        <div className='w-[350px] h-[600px] rounded-lg flex flex-col items-center justify-between p-5 bg-neutral-900 border'>
            <Toaster position='top-right' />

            <img src='https://cdnlogo.com/logos/t/61/tiktok.svg' alt='tiktokLogo' className='w-32 mt-10 hover:animate-pulse ' />

            <div className='w-full flex flex-col '>

                <div className='flex flex-col items-start mb-10  '>

                    <h1 className='text-3xl font-semibold text-white mb-3'>Welcome back 👋🏼</h1>
                    <p className='text-md text-white '>Please login to watch videos.</p>

                </div>
                <form className='w-full flex flex-col items-center justify-center' onSubmit={handleSubmit}>
                    <input type='text' placeholder='Username' className='w-full p-2 mb-4 rounded-md bg-gray-850 text-neutral-900' minLength={8} value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type='password' placeholder='Password' className='w-full p-2 mb-4 rounded-md bg-gray-850 text-neutral-900' minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type='submit' className='w-full p-2 rounded-md font-medium border border-red-300 bg-[#FE2858] text-white'>Login</button>
                </form>
            </div>

        </div>
    )
}

export default LoginForm