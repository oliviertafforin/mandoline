import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import styles from "./styles/App.module.css";
import { prechargement, ResultatRecherche } from "./services/recherche";

function App() {
  const [resultatsPrecharges, setResultatsPrecharges] = useState<
    ResultatRecherche[]
  >([]);

  useEffect(() => {
    // Précharger les données lors du montage du composant
    const fetchSearchData = async () => {
      prechargement().then((data) => {
        if (data) {
          setResultatsPrecharges(data);
        } else {
          setResultatsPrecharges([]);
        }
      });
    };

    fetchSearchData();
  }, []);

  return (
    <div className={styles.appContainer}>
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
      <Navigation resultatsPrecharges={resultatsPrecharges} />
      <main className={styles.content}>
        <Outlet /> {/* Permet d'afficher les pages ici */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
