import React, { useRef, useEffect, useState } from 'react';
import { LuX, LuGift } from 'react-icons/lu';

const ScratchCardModal = ({ isOpen, onClose, rewardAmount = "1000" }) => {
    const canvasRef = useRef(null);
    const [isScratched, setIsScratched] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isAutoScratching, setIsAutoScratching] = useState(false);

    // Prevent background scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setIsScratched(false);
            setIsAutoScratching(false);
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && canvasRef.current) {
            initCanvas();
        }
    }, [isOpen]);

    const initCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Premium Metallic Purple Gradient Cover
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#8b5cf6');
        gradient.addColorStop(0.3, '#a855f7');
        gradient.addColorStop(0.5, '#d946ef');
        gradient.addColorStop(0.7, '#a855f7');
        gradient.addColorStop(1, '#8b5cf6');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add some noise/texture for a metallic feel
        for (let i = 0; i < 2000; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const opacity = Math.random() * 0.1;
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.fillRect(x, y, 1, 1);
        }

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 28px Satoshi, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('SCRATCH CARD', canvas.width / 2, canvas.height / 2);
    };

    const getMousePos = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    };

    const scratch = (x, y) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fill();

        checkScratchPercentage();
    };

    const autoScratch = () => {
        if (isAutoScratching || isScratched) return;
        setIsAutoScratching(true);
        const canvas = canvasRef.current;
        if (!canvas) return;

        let frame = 0;
        const maxFrames = 30;
        const animate = () => {
            if (frame > maxFrames) {
                setIsScratched(true);
                setIsAutoScratching(false);
                return;
            }

            for (let i = 0; i < 8; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                scratch(x, y);
            }

            frame++;
            requestAnimationFrame(animate);
        };
        animate();
    };

    const checkScratchPercentage = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let transparentPixels = 0;

        for (let i = 0; i < pixels.length; i += 4) {
            if (pixels[i + 3] === 0) {
                transparentPixels++;
            }
        }

        const percentage = (transparentPixels / (pixels.length / 4)) * 100;
        if (percentage > 45 && !isScratched) {
            setIsScratched(true);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-brand-dark-purple/80 backdrop-blur-xl transition-opacity duration-700"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-[95%] max-w-[480px] bg-[#1a0b2e] rounded-[20px] overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.3)] border border-white/10 animate-in zoom-in-95 fade-in duration-500 mx-auto">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all z-20 cursor-pointer"
                >
                    <LuX size={18} />
                </button>

                {/* Header Section */}
                <div className="pt-10 sm:pt-12 pb-6 sm:pb-8 px-6 sm:px-8 text-center space-y-3 sm:space-y-4">
                    <p className="text-brand-purple font-black text-[10px] sm:text-xs uppercase tracking-[0.2em]">Congratulations!</p>
                    <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight drop-shadow-lg">
                        You've Won a<br />Reward!
                    </h2>
                </div>

                {/* Card Container */}
                <div className="px-5 sm:px-8 pb-10 sm:pb-12 flex flex-col items-center space-y-6 sm:space-y-8">
                    <div className="relative w-full aspect-[1.58/1] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/10 group">

                        {/* Prize Layer (Bottom) */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#fdf2ff] to-[#f3e8ff] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
                            {/* Animated Background Glow */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.1)_0%,_transparent_70%)] animate-pulse" />

                            <div className="relative flex flex-col items-center space-y-1 sm:space-y-2">
                                <span className="text-brand-purple/60 font-black text-[9px] sm:text-[10px] uppercase tracking-widest">Reward Amount</span>
                                <div className="flex items-center space-x-2 sm:space-x-3">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 flex items-center justify-center shadow-lg border border-amber-200/50">
                                        <span className="text-amber-900 font-black text-xl sm:text-2xl">₹</span>
                                    </div>
                                    <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1a0b2e] tracking-tighter">{rewardAmount}</span>
                                </div>
                                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-brand-purple/10 rounded-full text-brand-purple font-black text-[9px] sm:text-[10px] uppercase tracking-wider">Cash Credited</span>
                            </div>
                        </div>

                        {/* Scratch Layer (Top) */}
                        <canvas
                            ref={canvasRef}
                            width={500}
                            height={316}
                            onMouseDown={(e) => {
                                setIsDrawing(true);
                                const pos = getMousePos(e);
                                scratch(pos.x, pos.y);
                            }}
                            onMouseUp={() => setIsDrawing(false)}
                            onMouseMove={(e) => {
                                if (isDrawing) {
                                    const pos = getMousePos(e);
                                    scratch(pos.x, pos.y);
                                }
                            }}
                            onMouseLeave={() => setIsDrawing(false)}
                            onTouchStart={(e) => {
                                setIsDrawing(true);
                                const pos = getMousePos(e.originalEvent || e);
                                scratch(pos.x, pos.y);
                            }}
                            onTouchEnd={() => setIsDrawing(false)}
                            onTouchMove={(e) => {
                                if (isDrawing) {
                                    const pos = getMousePos(e.originalEvent || e);
                                    scratch(pos.x, pos.y);
                                }
                            }}
                            className={`absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-1000 ${isScratched ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                        />
                    </div>

                    {/* Action Button */}
                    <div className="w-full">
                        <button
                            onClick={isScratched ? onClose : autoScratch}
                            className="w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-black bg-white text-brand-dark-purple transition-all duration-300 hover:bg-gray-50 cursor-pointer shadow-none outline-none"
                        >
                            {isScratched ? `Claim ₹${rewardAmount} Cash` : 'Scratch Now'}
                        </button>
                    </div>
                </div>

                {/* Subtle Decorative Elements */}
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-purple/20 rounded-full blur-[60px]" />
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-pink/20 rounded-full blur-[60px]" />
            </div>
        </div>
    );
};

export default ScratchCardModal;
