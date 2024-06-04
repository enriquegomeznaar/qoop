import "./App.css"; 
import Footer from "./components/Footer";
import Header from "./components/Header";
import TwistedCube from "./components/TwistedCube";



const App = () => {
  return (
    <div style={{ height: "100vh", width: "100vw", margin: 0, padding: 0 }}>
    <Header />
      <TwistedCube />
    <Footer />
    </div>
  );
};

export default App;
