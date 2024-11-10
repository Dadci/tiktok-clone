import React from 'react'
import Screen from '../components/Screen'
import { useSelector } from 'react-redux'
import { redirect, useNavigate } from 'react-router-dom'

const Feed = () => {

    const user = useSelector((state) => state.login.user)
    const navigate = useNavigate()

    const videos = [
        "https://www.youtube.com/watch?v=y6oMutwJQCw",
        "https://www.youtube.com/watch?v=5723ieP5VAQ",
        "https://www.youtube.com/watch?v=Q3oItpVa9fs",

    ]


    return (
        <>
            {!user ? navigate('/login')
                :
                <div className='w-screen h-screen bg-neutral-900 flex flex-col items-center justify-center fixed p-8  '>
                    <Screen videos={videos} />
                   
                </div>}
        </>


    )
}

export default Feed