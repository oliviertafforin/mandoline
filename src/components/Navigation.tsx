import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./../styles/Navigation.css";
import React, { useEffect, useState } from "react";
import { getRecette, Recette } from '../services/recette';

function Navigation() {
  const [recette, setRecette] = useState<Recette | null>(null);

  useEffect(() => {
    getRecette("ac020506-d23d-4218-b3ae-f9858b8833f7").then((data) => {
      if (data) {
        setRecette(data);
      } else {
        setRecette(null);
      }
    });
  }, []);
  
  return (
    <Navbar expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Mandoline</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/about">À propos</Nav.Link>
            <Nav.Link href="/ingredients">Ingrédients</Nav.Link>
            <Nav.Link href="/recettes">Recettes</Nav.Link>
            <Nav.Link href="/courses">Liste de course</Nav.Link>
          </Nav>
          <Nav>
            { <Navbar.Text>  {recette ? recette.nom : 'Loading...'}</Navbar.Text> }
          <Navbar.Text>
            État {recette ? <i className="bi-reception-4" style={{color:"green"}}/> : <i className="bi-reception-0" style={{color:"red"}} />}
          </Navbar.Text>
            <Nav.Link href="/profil">Profil</Nav.Link>
            <Nav.Link href="/logout">
              Déconnection
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;