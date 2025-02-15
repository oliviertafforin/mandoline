import "./styles/App.css";
import Navigation from "./components/Navigation";
import React from "react";
import { Slide, ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
function App() {
  return (
<div className="app-container">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      <Navigation />
      <main className="content">
        <Outlet /> {/* Permet d'afficher les pages ici */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
