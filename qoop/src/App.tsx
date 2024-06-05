import React, { useState } from "react";
import "./App.css";
import "./styles.css/loader.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TwistedCube from "./components/TwistedCube";
import Loader from "./components/Loader";

const App = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [reduceColor, setReduceColor] = useState(false);

  const handleToggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleLoaded = () => {
    setIsLoaded(true);
  };

  const handleToggleReduceMotion = () => {
    setReduceMotion(!reduceMotion);
  };

  const handleToggleReduceColor = () => {
    setReduceColor(!reduceColor);
  };

  return (
    <>
      {!isLoaded && <Loader onLoaded={handleLoaded} />}
      {isLoaded && (
        <div style={{ height: "100vh", width: "100vw" }}>
          <Header onToggleDialog={handleToggleDialog} />
          <TwistedCube reduceMotion={reduceMotion} reduceColor={reduceColor} />
          {isDialogOpen && (
            <Dialog
              onClose={handleToggleDialog}
              onToggleReduceMotion={handleToggleReduceMotion}
              onToggleReduceColor={handleToggleReduceColor}
              reduceMotion={reduceMotion}
              reduceColor={reduceColor}
            />
          )}
          <Footer />
        </div>
      )}
    </>
  );
};

interface DialogProps {
  onClose: () => void;
  onToggleReduceMotion: () => void;
  onToggleReduceColor: () => void;
  reduceMotion: boolean;
  reduceColor: boolean;
}

const Dialog: React.FC<DialogProps> = ({ onClose, onToggleReduceMotion, onToggleReduceColor, reduceMotion, reduceColor }) => {
  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <button className="dialog-close" onClick={onClose}>
          &times;
        </button>
        <h2>Accessibility</h2>
        <p>Use the controls below to customize your web experience.</p>
        <div className="dialog-checkbox">
          <label>
            <span>Reduce color</span>
            <input type="checkbox" checked={reduceColor} onChange={onToggleReduceColor} />
          </label>
        </div>
        <div className="dialog-checkbox">
          <label>
            <span>Reduce motion</span>
            <input type="checkbox" checked={reduceMotion} onChange={onToggleReduceMotion} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default App;
