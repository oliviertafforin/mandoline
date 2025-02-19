import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import "./styles/App.css";
import { prechargement, ResultatRecherche } from "./services/recherche";

function App() {
  const [searchData, setSearchData] = useState<ResultatRecherche[]>([]);

  useEffect(() => {
    // Précharger les données lors du montage du composant
    const fetchSearchData = async () => {
      prechargement().then((data) => {
        console.log(data);
        if (data) {
            setSearchData(data);
        } else {
            setSearchData([]);
        }
      });
    };

    fetchSearchData();
  }, []);
  
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
      <Navigation searchData={searchData} />
      <main className="content">
        <Outlet /> {/* Permet d'afficher les pages ici */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
