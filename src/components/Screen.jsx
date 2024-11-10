import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLike } from '../redux/likeSlice';
import { useNavigate } from 'react-router-dom';

const Screen = ({ videos }) => {
    const [activeVideo, setActiveVideo] = useState(0);
    const [muted, setMuted] = useState(true);
    const [isReady, setIsReady] = useState(false);
    const playerRefs = useRef([]);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const liked = useSelector((state) => state.like.liked);
    const likes = useSelector((state) => state.like.likes);

    // Initialize player refs
    useEffect(() => {
        playerRefs.current = playerRefs.current.slice(0, videos.length);
    }, [videos]);

    const handleIntersection = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const videoIndex = Number(entry.target.dataset.index);
                setActiveVideo(videoIndex);
                // Pause all other videos
                playerRefs.current.forEach((player, idx) => {
                    if (idx !== videoIndex && player) {
                        player.seekTo(0);
                    }
                });
            }
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.6
        });

        const videoElements = document.querySelectorAll('.video-container');
        videoElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="flex flex-col gap-6 justify-center items-center h-screen bg-neutral-900 fixed">
            <div className="w-[350px] h-[600px] overflow-y-scroll snap-y snap-mandatory scrollbar-hidden">
                {videos.map((videoUrl, index) => (
                    <div
                        key={index}
                        data-index={index}
                        className="video-container h-full snap-start relative border-b-4 border-neutral-700"
                    >
                        <ReactPlayer
                            ref={el => playerRefs.current[index] = el}
                            url={videoUrl}
                            playing={activeVideo === index}
                            muted={muted}
                            loop={true}
                            width="100%"
                            height="100%"
                            className="absolute top-0 left-0"
                            onReady={() => setIsReady(true)}
                            config={{
                                youtube: {
                                    playerVars: {
                                        showinfo: 0,
                                        controls: 0,
                                        modestbranding: 1
                                    }
                                }
                            }}
                        />

                        {/* Controls Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40">
                            <div className="absolute bottom-6 right-6 flex flex-col items-center space-y-4">
                                <button
                                    onClick={() => dispatch(toggleLike())}
                                    className={`p-5 w-4 h-4 flex items-center justify-center rounded-full transition-all ${liked ? 'bg-red-500' : 'bg-white/50 hover:bg-white/70'
                                        }`}
                                >
                                    ♥️
                                    <span className="ml-1 text-sm">{likes}</span>
                                </button>
                                <button
                                    onClick={() => setMuted(!muted)}
                                    className="p-5 w-4 h-4 flex items-center justify-center rounded-full bg-white/50 hover:bg-white/70 transition-colors"
                                >
                                    {muted ? '🔇' : '🔊'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => navigate('/')} className='bg-red-600 text-white font-medium py-2 px-6 rounded-md  '>Logout</button>
        </div>
    );
};

export default Screen;