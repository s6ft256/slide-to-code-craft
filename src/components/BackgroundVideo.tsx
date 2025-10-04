import React from 'react';

const BackgroundVideo: React.FC = () => {
  return (
    <>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
        style={{
          pointerEvents: 'none',
          objectFit: 'cover',
          width: '100vw',
          height: '100vh'
        }}
      >
        <source src="/Trojan.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-black/40 z-[-1]"
        style={{
          pointerEvents: 'none'
        }}
      />
    </>
  );
};

export default BackgroundVideo;