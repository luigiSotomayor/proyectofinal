import './App.css'
import { ToastContainer, Slide } from "react-toastify";
import Header from './components/Header';
import Home from './pages/home';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <div className="App">
        <Header />
        <Home />
        <Footer />
      </div>
      <ToastContainer transition={Slide} />
    </>
  )
}

export default App
