import "./styles/App.css";
import Navigation from "./components/Navigation";
import React from "react";
import { Slide, ToastContainer } from "react-toastify";
import { AuthProvider } from "./components/utils/AuthContextType";
function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;
