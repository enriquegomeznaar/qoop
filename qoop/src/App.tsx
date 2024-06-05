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

  const handleToggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleLoaded = () => {
    setIsLoaded(true);
  };

  return (
    <>
      {!isLoaded && <Loader onLoaded={handleLoaded} />}
      {isLoaded && (
        <div style={{ height: "100vh", width: "100vw" }}>
          <Header onToggleDialog={handleToggleDialog} />
          <TwistedCube />
          {isDialogOpen && <Dialog onClose={handleToggleDialog} />}
          <Footer />
        </div>
      )}
    </>
  );
};

interface DialogProps {
  onClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({ onClose }) => {
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
            <input type="checkbox" />
          </label>
        </div>
        <div className="dialog-checkbox">
          <label>
            <span>Reduce motion</span>
            <input type="checkbox" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default App;
