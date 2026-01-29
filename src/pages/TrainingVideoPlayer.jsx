import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LuPlay, LuArrowLeft, LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { getTrainingVideos } from '../api/trainingApi';

// Custom Loader component
const Loader = ({ size = 24, className = '' }) => (
    <svg
        className={`animate-spin ${className}`}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
        />
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
    </svg>
);

const TrainingVideoPlayer = () => {
    const { appId, videoId } = useParams();
    const navigate = useNavigate();
    const [videos, setVideos] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchVideos();
    }, [appId]);

    useEffect(() => {
        if (videos.length > 0 && videoId) {
            const video = videos.find(v => v._id === videoId);
            if (video) {
                setCurrentVideo(video);
            }
        }
    }, [videos, videoId]);

    const fetchVideos = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getTrainingVideos(appId);
            setVideos(data);

            // If no videoId in URL, select first video
            if (!videoId && data.length > 0) {
                setCurrentVideo(data[0]);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getVideoEmbedUrl = (url) => {
        if (!url) return null;

        // YouTube
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const videoId = url.includes('youtu.be')
                ? url.split('youtu.be/')[1]?.split('?')[0]
                : url.split('v=')[1]?.split('&')[0];
            return `https://www.youtube.com/embed/${videoId}`;
        }

        // Vimeo
        if (url.includes('vimeo.com')) {
            const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
            return `https://player.vimeo.com/video/${videoId}`;
        }

        return url;
    };

    const getVideoThumbnail = (url) => {
        if (!url) return 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800';

        // YouTube thumbnail
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const videoId = url.includes('youtu.be')
                ? url.split('youtu.be/')[1]?.split('?')[0]
                : url.split('v=')[1]?.split('&')[0];
            return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        }

        return 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800';
    };

    const handleVideoSelect = (video) => {
        navigate(`/training/${appId}/video/${video._id}`);
    };

    const handlePrevious = () => {
        const currentIndex = videos.findIndex(v => v._id === currentVideo._id);
        if (currentIndex > 0) {
            handleVideoSelect(videos[currentIndex - 1]);
        }
    };

    const handleNext = () => {
        const currentIndex = videos.findIndex(v => v._id === currentVideo._id);
        if (currentIndex < videos.length - 1) {
            handleVideoSelect(videos[currentIndex + 1]);
        }
    };

    const currentIndex = currentVideo ? videos.findIndex(v => v._id === currentVideo._id) : -1;
    const hasPrevious = currentIndex > 0;
    const hasNext = currentIndex < videos.length - 1;

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <Loader className="text-purple-500 mb-4 mx-auto" size={48} />
                    <p className="text-gray-500 font-medium">Loading video...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                        <span className="text-2xl">⚠️</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Failed to Load Video</h3>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => navigate('/training')}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                    >
                        Back to Training
                    </button>
                </div>
            </div>
        );
    }

    if (!currentVideo) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Video Not Found</h3>
                    <button
                        onClick={() => navigate('/training')}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                    >
                        Back to Training
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <button
                        onClick={() => navigate('/training')}
                        className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors font-semibold"
                    >
                        <LuArrowLeft size={20} />
                        <span>Back to Training</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Video Player - Left/Main Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Video Player */}
                        <div className="bg-white rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                            <div className="aspect-video bg-black">
                                <iframe
                                    src={getVideoEmbedUrl(currentVideo.videoUrl)}
                                    title={currentVideo.title}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
                                        {currentVideo.title}
                                    </h1>
                                    <p className="text-gray-600">{currentVideo.description}</p>
                                </div>
                                {currentVideo.duration && (
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <LuPlay size={16} />
                                        <span className="font-semibold">Duration: {currentVideo.duration}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between gap-4">
                            <button
                                onClick={handlePrevious}
                                disabled={!hasPrevious}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${hasPrevious
                                        ? 'bg-white text-purple-600 border-2 border-purple-200 hover:bg-purple-50 hover:border-purple-300'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                <LuChevronLeft size={20} />
                                <span>Previous</span>
                            </button>
                            <div className="text-center">
                                <p className="text-sm text-gray-500 font-semibold">
                                    Video {currentIndex + 1} of {videos.length}
                                </p>
                            </div>
                            <button
                                onClick={handleNext}
                                disabled={!hasNext}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${hasNext
                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                <span>Next</span>
                                <LuChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Playlist - Right Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 sticky top-24">
                            <h2 className="text-xl font-black text-gray-900 mb-4">Playlist</h2>
                            <div className="space-y-3 max-h-[600px] overflow-y-auto">
                                {videos.map((video, index) => (
                                    <div
                                        key={video._id}
                                        onClick={() => handleVideoSelect(video)}
                                        className={`group cursor-pointer rounded-xl overflow-hidden transition-all ${currentVideo._id === video._id
                                                ? 'bg-purple-50 border-2 border-purple-500'
                                                : 'bg-gray-50 border-2 border-transparent hover:border-purple-200'
                                            }`}
                                    >
                                        <div className="flex gap-3 p-3">
                                            <div className="relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden">
                                                <img
                                                    src={getVideoThumbnail(video.videoUrl)}
                                                    alt={video.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                    <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                                                        <LuPlay size={14} fill="currentColor" className="ml-0.5 text-purple-600" />
                                                    </div>
                                                </div>
                                                {currentVideo._id === video._id && (
                                                    <div className="absolute top-1 left-1 bg-purple-500 rounded px-1.5 py-0.5 text-[8px] font-black text-white">
                                                        PLAYING
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-black text-gray-400 mb-1">
                                                    {index + 1}. VIDEO
                                                </p>
                                                <h3 className={`text-sm font-bold line-clamp-2 ${currentVideo._id === video._id ? 'text-purple-600' : 'text-gray-900'
                                                    }`}>
                                                    {video.title}
                                                </h3>
                                                {video.duration && (
                                                    <p className="text-xs text-gray-500 mt-1">{video.duration}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainingVideoPlayer;
