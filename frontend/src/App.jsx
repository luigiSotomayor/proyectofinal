import "./App.css";
import { ToastContainer, Slide } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home.jsx";
import Footer from "./components/Footer.jsx";
import InfoDisplay from "./components/InfoDisplay.jsx";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/infodisplay" element={<InfoDisplay />} />
          </Routes>
        </main>
      {/*   {isAuthenticated ? (
          <InfoDisplay />
        ) : (
          <Home setIsAuthenticated={setIsAuthenticated} />
        )} */}
        <Footer />
      </div>
      <ToastContainer transition={Slide} />
    </>
  );
}

export default App;
