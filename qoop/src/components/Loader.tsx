import React, { useEffect, useState } from "react";
import "../styles.css/loader.css";

const Loader: React.FC<{ onLoaded: () => void }> = ({ onLoaded }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500); // Cambiar a 1.5 segundos para una transición más suave

    const timer2 = setTimeout(() => {
      onLoaded();
    }, 2000); // 2 segundos

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [onLoaded]);

  return (
    <div className={`loader-container ${!isVisible ? 'hidden' : ''}`}>
      <h1 className="loader-container-text">BLOCK</h1>
    </div>
  );
};

export default Loader;
