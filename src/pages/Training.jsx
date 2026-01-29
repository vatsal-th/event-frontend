import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuPlay, LuUsers, LuWallet, LuSettings, LuUserPlus, LuGamepad2, LuSearch } from 'react-icons/lu';
import { Select } from '../components/common/Forms';
import { getTrainingApps, getTrainingVideos } from '../api/trainingApi';

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

const Training = () => {
    const navigate = useNavigate();
    const [selectedApp, setSelectedApp] = useState('');
    const [apps, setApps] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [videosLoading, setVideosLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);

    // Fetch training apps on component mount
    useEffect(() => {
        fetchTrainingApps();
    }, []);

    // Fetch videos when app is selected
    useEffect(() => {
        if (selectedApp) {
            fetchTrainingVideos(selectedApp);
        } else {
            setVideos([]);
            setSelectedVideo(null);
        }
    }, [selectedApp]);

    const fetchTrainingApps = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getTrainingApps();

            // Transform API data to dropdown format
            const appOptions = data.map(app => ({
                label: app.title,
                value: app._id,
                description: app.description
            }));

            setApps(appOptions);

            // Auto-select first app if available
            if (appOptions.length > 0) {
                setSelectedApp(appOptions[0].value);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchTrainingVideos = async (appId) => {
        try {
            setVideosLoading(true);
            const data = await getTrainingVideos(appId);
            setVideos(data);

            // Auto-select first video if available
            if (data.length > 0) {
                setSelectedVideo(data[0]);
            } else {
                setSelectedVideo(null);
            }
        } catch (err) {
            console.error('Failed to fetch videos:', err);
            setVideos([]);
            setSelectedVideo(null);
        } finally {
            setVideosLoading(false);
        }
    };

    const handleVideoClick = (video) => {
        navigate(`/training/${selectedApp}/video/${video._id}`);
    };

    // Helper function to extract video ID from YouTube/Vimeo URLs
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

        // Default thumbnail
        return 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800';
    };

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-r from-violet-100 via-purple-50 to-pink-100 min-h-[420px] flex items-center border-b border-purple-50/50">
                {/* Soft Background Sparkles/Glows */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-ping"></div>
                    <div className="absolute bottom-20 right-40 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    <div className="absolute top-40 right-10 w-2 h-2 bg-white rounded-full animate-ping delay-700"></div>
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200/30 blur-[100px] rounded-full" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-200/30 blur-[100px] rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto w-full relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">
                        <div className="space-y-8 text-center lg:text-left">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-white text-[10px] font-black uppercase tracking-widest text-brand-dark-purple">
                                    Training Center
                                </div>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight">
                                    Training & <br className="hidden lg:block" /> Tutorials
                                </h1>
                                <p className="text-gray-600 text-sm sm:text-base md:text-lg font-medium">
                                    Learn the platform, boost performance, and master your workflow.
                                </p>
                            </div>

                            <div className="max-w-[360px] space-y-3 mx-auto lg:mx-0">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                                    Select App for Training
                                </label>
                                {loading ? (
                                    <div className="bg-white rounded-2xl p-4 text-center">
                                        <Loader className="text-purple-500 mx-auto" size={24} />
                                    </div>
                                ) : (
                                    <Select
                                        value={selectedApp}
                                        onChange={setSelectedApp}
                                        options={apps}
                                        placeholder="Select Training App"
                                        className="!bg-white !border-gray-100 !rounded-2xl shadow-sm hover:shadow-md transition-all !py-3"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="hidden lg:flex justify-center items-center relative">
                            <div className="w-[320px] h-[320px] rounded-[32px] bg-white/60 backdrop-blur-xl border border-white shadow-lg flex items-center justify-center">
                                <div className="w-40 h-40 bg-violet-200/30 blur-[60px] rounded-full animate-pulse" />
                                <div className="absolute bottom-6 right-6 bg-white/80 border border-white rounded-2xl px-4 py-3 shadow-md">
                                    <p className="text-[10px] uppercase tracking-widest font-black text-gray-500">Total Videos</p>
                                    <p className="text-2xl font-black text-gray-900">{videos.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Player & Videos Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 relative z-10">
                {/* Error State */}
                {error && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                            <span className="text-2xl">⚠️</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Failed to Load Training Apps</h3>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <button
                            onClick={fetchTrainingApps}
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Loading State */}
                {videosLoading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader className="text-purple-500 mb-4" size={48} />
                        <p className="text-gray-500 font-medium">Loading videos...</p>
                    </div>
                )}


                {/* Videos Grid */}
                {!loading && !error && !videosLoading && (
                    <>
                        <div className="flex items-end justify-between gap-6 mb-8">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Video Library</h2>
                                <p className="text-gray-500 text-sm sm:text-base">
                                    {videos.length > 0 ? `${videos.length} ${videos.length === 1 ? 'video' : 'videos'} available` : 'No videos available'}
                                </p>
                            </div>
                        </div>

                        {videos.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                    <LuPlay className="text-gray-400" size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No Videos Found</h3>
                                <p className="text-gray-600">This training app doesn't have any videos yet</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                {videos.map((video, idx) => (
                                    <div
                                        key={video._id}
                                        onClick={() => handleVideoClick(video)}
                                        className={`group bg-white rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(139,92,246,0.15)] transition-all duration-500 hover:-translate-y-1 cursor-pointer border-2 ${selectedVideo?._id === video._id ? 'border-purple-500' : 'border-gray-100'
                                            }`}
                                    >
                                        <div className="relative aspect-video">
                                            <img
                                                src={getVideoThumbnail(video.videoUrl)}
                                                alt={video.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/20 transition-colors">
                                                <div className="w-14 h-14 bg-white/30 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/40 shadow-2xl group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-500">
                                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/10">
                                                        <LuPlay size={20} fill="currentColor" className="ml-1" />
                                                    </div>
                                                </div>
                                            </div>
                                            {video.duration && (
                                                <div className="absolute top-3 right-3 bg-white/90 rounded-full px-3 py-1 text-[10px] font-black text-gray-700 shadow-sm">
                                                    {video.duration}
                                                </div>
                                            )}
                                            {selectedVideo?._id === video._id && (
                                                <div className="absolute top-3 left-3 bg-purple-500 rounded-full px-3 py-1 text-[10px] font-black text-white shadow-sm">
                                                    NOW PLAYING
                                                </div>
                                            )}
                                        </div>

                                        <div className="px-5 py-5 bg-white flex flex-col text-left space-y-3">
                                            <div>
                                                <h3 className="text-lg font-black text-gray-900 tracking-tight leading-tight group-hover:text-purple-600 transition-colors line-clamp-2">
                                                    {video.title}
                                                </h3>
                                                {video.description && (
                                                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                                        {video.description}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider pt-2 border-t border-gray-100">
                                                <span>HD Video</span>
                                                <span className="text-purple-600">Watch Now</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Training;
