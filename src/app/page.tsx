"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Volume2, VolumeX, ChevronRight, ChevronLeft } from "lucide-react";

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // PLACEHOLDER MEDIA:
  // You can change these to local files like '/video.mp4' once you add them to the public folder
  const VIDEO_SRC = "/vid.mp4";
  const AUDIO_SRC = "/bestpart.mp3";
  const IMAGES = [
    "/1.jpg",
    "/2.jpg",
    "/3.jpg",
    "/4.jpg",
    "/5.jpg",
    "/6.jpg",
    "/7.jpg",
    "/8.jpg",
    "/9.jpg",
    "/10.jpg"
  ];

  const handleStart = () => {
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, 3));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 1));

  return (
    <main className="relative h-screen w-full overflow-hidden flex items-center justify-center p-4 sm:p-8">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-light-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-light-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-light-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <audio ref={audioRef} src={AUDIO_SRC} loop />

      {hasStarted && (
        <button
          onClick={toggleAudio}
          className="absolute top-6 right-6 z-50 p-3 bg-white/50 backdrop-blur-md rounded-full shadow-lg hover:bg-white/80 transition-all text-light-blue-900"
        >
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      )}

      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="flex flex-col items-center justify-center glass-panel p-12 rounded-3xl max-w-lg w-full text-center shadow-2xl"
          >
            <Heart className="text-light-blue-500 w-20 h-20 mb-8 animate-pulse drop-shadow-md" fill="currentColor" />
            <h1 className="text-4xl font-serif font-bold text-light-blue-900 mb-4 drop-shadow-sm">A Special Surprise</h1>
            <p className="text-light-blue-800 mb-8 font-sans text-lg">I have something special for you...</p>
            <button
              onClick={handleStart}
              className="px-8 py-4 bg-gradient-to-r from-light-blue-400 to-light-blue-600 text-white rounded-full font-semibold text-lg shadow-xl shadow-light-blue-500/30 hover:scale-105 hover:shadow-light-blue-500/50 transition-all duration-300 flex items-center gap-2"
            >
              Open Card <Heart size={20} fill="currentColor" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={`slide-${currentSlide}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="glass-panel w-full max-w-4xl h-[85vh] sm:h-[80vh] rounded-3xl p-6 sm:p-10 flex flex-col relative shadow-2xl border border-white/40"
          >
            {/* Slide Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col custom-scrollbar">
              {currentSlide === 1 && <Slide1 videoSrc={VIDEO_SRC} />}
              {currentSlide === 2 && <Slide2 images={IMAGES} />}
              {currentSlide === 3 && <Slide3 />}
            </div>

            {/* Navigation */}
            <div className="mt-8 flex justify-between items-center px-4">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 1}
                className={`p-3 rounded-full flex items-center gap-2 font-medium transition-all ${currentSlide === 1 ? 'opacity-0 pointer-events-none' : 'hover:bg-white/60 bg-white/30 text-light-blue-900 shadow-sm'}`}
              >
                <ChevronLeft size={20} /> Back
              </button>

              <div className="flex gap-3">
                {[1, 2, 3].map(dot => (
                  <div key={dot} className={`h-2.5 rounded-full transition-all duration-300 ${currentSlide === dot ? 'bg-light-blue-600 w-8 shadow-md' : 'bg-light-blue-300 w-2.5'}`} />
                ))}
              </div>

              <button
                onClick={nextSlide}
                disabled={currentSlide === 3}
                className={`p-3 rounded-full flex items-center gap-2 font-medium transition-all ${currentSlide === 3 ? 'opacity-0 pointer-events-none' : 'hover:bg-white/60 bg-white/30 text-light-blue-900 shadow-sm'}`}
              >
                Next <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function Slide1({ videoSrc }: { videoSrc: string }) {
  return (
    <div className="flex flex-col items-center min-h-full text-center py-8">
      <div className="m-auto w-full flex flex-col items-center">
        <h2 className="text-4xl sm:text-5xl font-serif font-bold text-light-blue-900 mb-8 drop-shadow-sm">Happy Birthday, My Love</h2>
        <div className="w-full max-w-2xl aspect-video rounded-2xl overflow-hidden shadow-2xl relative bg-black/5 flex-shrink-0 border-4 border-white/50">
          <video
            controls
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="mt-8 text-lg sm:text-xl text-light-blue-800 font-sans max-w-xl mx-auto leading-relaxed">
          I made this special video just for you! ❤️
        </p>
      </div>
    </div>
  );
}

function Slide2({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);

  return (
    <div className="flex flex-col items-center min-h-full py-4">
      <div className="m-auto w-full flex flex-col items-center max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-light-blue-900 mb-6 text-center drop-shadow-sm">Our Beautiful Memories</h2>

        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black/5 group border-4 border-white/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/10 overflow-hidden"
            >
              <img src={images[idx]} className="absolute inset-0 w-full h-full object-cover blur-xl opacity-50 scale-110" alt="" />
              <img src={images[idx]} className="relative w-full h-full object-contain drop-shadow-2xl z-10" alt="Our memory" />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
            <button
              onClick={() => setIdx(prev => (prev === 0 ? images.length - 1 : prev - 1))}
              className="pointer-events-auto p-3 bg-white/40 hover:bg-white/70 backdrop-blur-md rounded-full text-light-blue-900 shadow-lg transition-all transform hover:scale-110"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={() => setIdx(prev => (prev === images.length - 1 ? 0 : prev + 1))}
              className="pointer-events-auto p-3 bg-white/40 hover:bg-white/70 backdrop-blur-md rounded-full text-light-blue-900 shadow-lg transition-all transform hover:scale-110"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>

        <div className="flex gap-4 mt-2 px-4 py-6 overflow-x-auto w-full max-w-full custom-scrollbar items-center">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-4 transition-all duration-300 ${i === idx ? 'border-light-blue-500 scale-125 shadow-xl' : 'border-white/50 opacity-60 hover:opacity-100 hover:scale-110'}`}
            >
              <img src={images[i]} className="w-full h-full object-cover" alt="" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide3() {
  return (
    <div className="flex flex-col items-center min-h-full max-w-2xl mx-auto text-center py-10">
      <div className="m-auto flex flex-col items-center w-full">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Heart className="text-pink-400 w-24 h-24 mb-8 drop-shadow-lg" fill="currentColor" />
        </motion.div>

        <h2 className="text-4xl sm:text-6xl font-serif font-bold text-light-blue-900 mb-10 drop-shadow-sm">To The Love Of My Life and My Future Wife</h2>

        <div className="space-y-6 text-xl sm:text-2xl text-light-blue-900 font-serif leading-relaxed px-6">
          <p>
            Happy 22-nd Birthday Cintakuuuu! You mean the absolute world to me.
          </p>
          <p>
            To my love of my live, every moment spent with you is an absolute blessing. I created this digital card just to remind you of how much I love you and how endlessly grateful I am to share my life with you. My heart swells with pride when I see where you are today. After all the heartache and the burdens you've endured, look at the amazing person you've become! I am so very proud of you sayangkuuuuuu. Never stop chasing your dreams and your beautiful future yaaa cantikkk. Please always remember that I am in your corner, and I will always have your back through whatever life brings. Thank you for coloring my world and choosing to be part of my life. Meeting you has been the greatest gift I could ever ask for.
          </p>
          <div className="pt-8">
            <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-light-blue-500 to-pink-400 text-3xl sm:text-4xl pb-2">
              I love you forever and always! 💖(From your future husband)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
