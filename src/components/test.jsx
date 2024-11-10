import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { useSelector, useDispatch } from 'react-redux'
import { toggleLike } from '../redux/likeSlice'




const Screen = ({ videos }) => {
    const [currentVideo, setCurrentVideo] = useState(0)
    const [muted, setMuted] = useState(true)


    const dispatch = useDispatch()
    const liked = useSelector((state) => state.like.liked)
    const likes = useSelector((state) => state.like.likes)



    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.target
        if (scrollTop + clientHeight >= scrollHeight - 1) {
            setCurrentVideo((prevIndex) => (prevIndex + 1) % videos.length)
        }
        dispatch(toggleLike(false))

    }

    const handleMute = () => {
        setMuted(!muted)

    }



    const handleLike = () => {
        dispatch(toggleLike())
    }


    return (
        <>
            <div className='aspect-w-16 aspect-h-9 w-[350px] h-[600px] rounded-lg flex flex-col items-center justify-center p-0 bg-neutral-800 border-2 relative overflow-y-scroll overflow-x-hidden scroll-smooth transition-all scrollbar-hidden snap-y snap-mandatory z-0 ' onScroll={handleScroll} onClick={handleMute}  >

                <ReactPlayer url={videos[currentVideo]} playing={true} config={{
                    youtube: {
                        playerVars: {
                            orientation: 'portrait',
                            showinfo: 0,
                        }
                    }
                }} width={350} height={600} muted={muted} className='absolute rounded-lg self-center' />
                <div className='flex flex-col items-end justify-center p-4 w-full z-20' >
                    <div className=' flex flex-col items-center'>
                        <span className={`text-2xl  cursor-pointer transition-all  ${!liked ? 'text-white active:animate-ping ' : 'text-red-600 transform duration-300 ease-in-out scale-110'}`} onClick={() => handleLike()}>♥️</span>
                        <p className='text-base text-white'>{likes}</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Screen 