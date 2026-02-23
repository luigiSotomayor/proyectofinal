import "./App.css";
import { ToastContainer, Slide } from "react-toastify";
import Header from "./components/Header";
import Home from "./pages/home";
import Footer from "./components/Footer";
import InfoDisplay from "./components/InfoDisplay";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <div className="App">
        <Header />
        {isAuthenticated ? (
          <InfoDisplay />
        ) : (
          <Home setIsAuthenticated={setIsAuthenticated} />
        )}
        <Footer />
      </div>
      <ToastContainer transition={Slide} />
    </>
  );
}

export default App;
