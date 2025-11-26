import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video.play().catch(() => {});
      document.removeEventListener("touchstart", playVideo);
      document.removeEventListener("scroll", playVideo);
    };

    video.play().catch(() => {
      document.addEventListener("touchstart", playVideo, { once: true });
      document.addEventListener("scroll", playVideo, { once: true });
    });
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover"
      src="/demo-2.mp4"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      webkit-playsinline="true"
      x5-playsinline="true"
    />
  );
}
