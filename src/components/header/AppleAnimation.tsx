import React, { useState, useEffect } from 'react';
import './apple-animation.css';

const AppleAnimation: React.FC = () => {
  const [animationActive, setAnimationActive] = useState(false);

  // Trigger the eating animation every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationActive(true);

      // Reset animation after it completes
      setTimeout(() => {
        setAnimationActive(false);
      }, 6000); // Animation duration is 6 seconds
    }, 15000); // Trigger every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="apple-animation-container d-flex align-items-center" style={{ marginLeft: "30px", position: "relative", overflow: "visible", width: "350px" }}>
      {/* Apple logo that will eat the text */}
      <div className={`apple-eater ${animationActive ? 'active' : ''}`}>
        <svg width="40" height="40" viewBox="0 0 170 195" className="apple-logo">
          {/* Apple body */}
          <path
            className="apple-body"
            d="M127.805 83.478c-.21-21.95 17.92-32.47 18.725-32.999-10.18-14.9-26.043-16.937-31.682-17.176-13.488-1.365-26.338 7.944-33.173 7.944-6.835 0-17.398-7.727-28.587-7.525-14.697.214-28.252 8.55-35.8 21.715-15.27 26.445-3.905 65.65 10.984 87.156 7.275 10.513 15.962 22.333 27.372 21.9 10.975-.427 15.122-7.09 28.386-7.09 13.264 0 16.988 7.09 28.586 6.878 11.835-.214 19.343-10.727 26.618-21.24 8.387-12.254 11.835-24.15 12.054-24.745-.262-.12-23.166-8.908-23.403-35.32"
          />
          {/* Apple leaf */}
          <path
            className="apple-leaf"
            d="M107.73 25.066c6.047-7.33 10.13-17.52 9.01-27.656-8.7.354-19.238 5.797-25.496 13.127-5.596 6.48-10.513 16.83-9.2 26.764 9.71.755 19.633-4.933 25.677-12.235"
          />
          {/* Bite animation circle */}
          <circle className="apple-bite" cx="145" cy="70" r="20" />
        </svg>
      </div>

      {/* Static apple for when not animating */}
      <div className={`apple-logo-wrapper ${animationActive ? 'hidden' : ''}`}>
        <svg width="30" height="30" viewBox="0 0 170 195" className="apple-logo">
          {/* Apple body */}
          <path
            className="apple-body"
            d="M127.805 83.478c-.21-21.95 17.92-32.47 18.725-32.999-10.18-14.9-26.043-16.937-31.682-17.176-13.488-1.365-26.338 7.944-33.173 7.944-6.835 0-17.398-7.727-28.587-7.525-14.697.214-28.252 8.55-35.8 21.715-15.27 26.445-3.905 65.65 10.984 87.156 7.275 10.513 15.962 22.333 27.372 21.9 10.975-.427 15.122-7.09 28.386-7.09 13.264 0 16.988 7.09 28.586 6.878 11.835-.214 19.343-10.727 26.618-21.24 8.387-12.254 11.835-24.15 12.054-24.745-.262-.12-23.166-8.908-23.403-35.32"
          />
          {/* Apple leaf */}
          <path
            className="apple-leaf"
            d="M107.73 25.066c6.047-7.33 10.13-17.52 9.01-27.656-8.7.354-19.238 5.797-25.496 13.127-5.596 6.48-10.513 16.83-9.2 26.764 9.71.755 19.633-4.933 25.677-12.235"
          />
        </svg>
      </div>

      {/* Text that will be eaten */}
      <div className={`animated-text-container ms-2 ${animationActive ? 'being-eaten' : ''}`}>
        <p className="animated-text text-white mb-0" style={{ fontSize: "20px", fontWeight: "500", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>
          <span>M</span>
          <span>a</span>
          <span>n</span>
          <span>g</span>
          <span>&nbsp;</span>
          <span>l</span>
          <span>ạ</span>
          <span>i</span>
          <span>&nbsp;</span>
          <span>t</span>
          <span>r</span>
          <span>ả</span>
          <span>i</span>
          <span>&nbsp;</span>
          <span>n</span>
          <span>g</span>
          <span>h</span>
          <span>i</span>
          <span>ệ</span>
          <span>m</span>
          <span>&nbsp;</span>
          <span>t</span>
          <span>ố</span>
          <span>t</span>
          <span>&nbsp;</span>
          <span>n</span>
          <span>h</span>
          <span>ấ</span>
          <span>t</span>
          <span>&nbsp;</span>
          <span>d</span>
          <span>à</span>
          <span>n</span>
          <span>h</span>
          <span>&nbsp;</span>
          <span>c</span>
          <span>h</span>
          <span>o</span>
          <span>&nbsp;</span>
          <span>b</span>
          <span>ạ</span>
          <span>n</span>
        </p>
      </div>
    </div>

  );
};

export default AppleAnimation;
