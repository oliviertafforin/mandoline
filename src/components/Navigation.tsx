import React, { useContext, useEffect, useState, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./../styles/Navigation.css";
import { getRecette, Recette } from "../services/recette";
import { AuthContext } from "./utils/AuthContextType";
import SearchBar from "./SearchBar";
import { ResultatRecherche } from "../services/recherche";

interface NavigationProps {
  searchData: Array<ResultatRecherche>;
}

const Navigation: React.FC<NavigationProps> = ({ searchData }) => {
  const [recette, setRecette] = useState<Recette | null>(null);
  const [error, setError] = useState<string | null>(null);
  const auth = useContext(AuthContext);

  useEffect(() => {
    getRecette("ac020506-d23d-4218-b3ae-f9858b8833f7")
      .then((data) => {
        if (data) {
          setRecette(data);
        } else {
          setRecette(null);
        }
      })
      .catch(() => {
        setError("Erreur lors du chargement de la recette.");
      });
  }, [auth]);

  const handleLogout = useCallback((e : any) => {
    e.preventDefault();
    auth.logout();
  }, [auth]);

  return (
    <Navbar expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Mandoline</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {auth.token ? (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/ingredients">Ingrédients</Nav.Link>
              <Nav.Link href="/recettes">Recettes</Nav.Link>
              <Nav.Link href="/courses">Liste de course</Nav.Link>
            </Nav>
            <SearchBar searchData={searchData} onSearch={(query) => console.log("Recherche :", query)} />
            <Nav>
              {error ? (
                <Navbar.Text>{error}</Navbar.Text>
              ) : (
                <Navbar.Text>
                  {recette ? recette.nom : "Loading..."}
                </Navbar.Text>
              )}
              <Navbar.Text>
                État
                {recette ? (
                  <i className="bi-reception-4" style={{ color: "green" }} />
                ) : (
                  <i className="bi-reception-0" style={{ color: "red" }} />
                )}
              </Navbar.Text>
              <Nav.Link href="/profil">Profil</Nav.Link>
              <Nav.Link onClick={handleLogout}>Déconnexion</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/ingredients">Ingrédients</Nav.Link>
              <Nav.Link href="/recettes">Recettes</Nav.Link>
              <Nav.Link href="/courses">Liste de course</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/login">Connexion</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
        
      </Container>
    </Navbar>
  );
}

export default React.memo(Navigation);
