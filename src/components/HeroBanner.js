import React from "react";

const HeroBanner = ({ logo, slogan }) => {
  console.log("HeroBanner Logo Path:", logo); // Debugging output
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section
        className="hero-banner text-center text-white p-5"
        style={{ backgroundColor: "#8a194f" }}
      >
        <img src={logo} width="100px" alt="Hopehands Logo" className="mb-3" />
        <p className="lead">{slogan}</p> {/* Display slogan */}
      </section>

      {/* Footer (sticky to bottom) */}
      <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
        <p>© 2025 HopeHands. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HeroBanner;
