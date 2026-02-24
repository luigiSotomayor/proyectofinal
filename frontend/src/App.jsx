import "./App.css";
import { ToastContainer, Slide } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home.jsx";
import Footer from "./components/Footer.jsx";
import InfoDisplay from "./pages/InfoDisplay.jsx";
import { useState } from "react";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <AuthProvider>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/infodisplay" element={<InfoDisplay />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
      <ToastContainer transition={Slide} />
    </>
  );
}

export default App;
