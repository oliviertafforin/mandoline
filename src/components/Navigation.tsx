import React, { useContext, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./../styles/Navigation.module.css";
import { AuthContext } from "./utils/AuthContextType";
import SearchBar from "./SearchBar";
import { ResultatRecherche } from "../services/recherche";
import { useNavigate } from "react-router-dom";

interface NavigationProps {
  resultatsPrecharges: Array<ResultatRecherche>;
}

const Navigation: React.FC<NavigationProps> = ({ resultatsPrecharges }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  // Déconnexion => suppression du token en local storage et dans les headers axios et redirection à la page d'accueil
  const handleLogout = useCallback(
    (e: any) => {
      e.preventDefault();
      auth.logout();
      navigate("/");
    },
    [auth, navigate]
  );

  return (
    <Navbar expand="lg" className={styles.navbar}>
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
              resultatsPrecharges={resultatsPrecharges}
              onSearch={(query) => console.log("Recherche :", query)}
            />
            <Nav>
              <Nav.Link href="/profil">{auth.username}</Nav.Link>
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
              resultatsPrecharges={resultatsPrecharges}
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
