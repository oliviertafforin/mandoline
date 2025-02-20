import React, { useContext, useEffect, useState, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./../styles/Navigation.css";
import { getRecette, Recette } from "../services/recette";
import { AuthContext } from "./utils/AuthContextType";
import SearchBar from "./SearchBar";
import { ResultatRecherche } from "../services/recherche";
import { useNavigate } from "react-router-dom";

interface NavigationProps {
  searchData: Array<ResultatRecherche>;
}

const Navigation: React.FC<NavigationProps> = ({ searchData }) => {
  const [error, setError] = useState<string | null>(null);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  // Déconnexion => suppression du token en local storage et dans les headers axios
  //redirection à la page d'accueil
  const handleLogout = useCallback(
    (e: any) => {
      e.preventDefault();
      auth.logout();
      navigate("/");
    },
    [auth, navigate]
  );

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
            <SearchBar
              searchData={searchData}
              onSearch={(query) => console.log("Recherche :", query)}
            />
            <Nav>
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
            <SearchBar
              searchData={searchData}
              onSearch={(query) => console.log("Recherche :", query)}
            />
            <Nav>
              <Nav.Link href="/login">Connexion</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default React.memo(Navigation);
