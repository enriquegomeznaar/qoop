import "./App.css"; 
import "./styles.css/loader.css"
import Footer from "./components/Footer";
import Header from "./components/Header";
import TwistedCube from "./components/TwistedCube";
import { useState } from "react";

const App = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleToggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  return (

    <> 
    <div className="loader-container" >
      <h1 className="loader-container-text">Block</h1>
    </div> 
    <div style={{ height: "100vh", width: "100vw" }}>
      <Header onToggleDialog={handleToggleDialog} />
      <TwistedCube />
      {isDialogOpen && (
        <Dialog onClose={handleToggleDialog} />
      )}
      <Footer />

    </div>
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
        <button className="dialog-close" onClick={onClose}>&times;</button>
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