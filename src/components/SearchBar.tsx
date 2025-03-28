// SearchBar.tsx
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import "./../styles/SearchBar.css";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { recherche, ResultatRecherche } from "../services/recherche";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "./Context";

interface SearchBarProps {
  onSearch: (query: string) => void;
  resultatsPrecharges : Array<ResultatRecherche>;
}

const SearchBar: React.FC<SearchBarProps> = ({ resultatsPrecharges }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();
  const { resultats, setResultats } = useContext(Context)!;

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.currentTarget.value;
    setSearchQuery(query);
    if (query.length >= 3) {
      performLocalSearch(query);
    }
  };

  const performLocalSearch = (searchQuery: string) => {
    // Filtrer les données localement
    const results = resultatsPrecharges.filter((item: ResultatRecherche) =>
      item.nom.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResultats(results);
    console.log("Résultats de la recherche :", results);
  };

  const performSearch = (searchQuery: string) => {
    //Recherche directe en base
    recherche(searchQuery).then((results) => {
      if (results) {
        setResultats(results);
      } else {
        setResultats([]);
      }
      console.log("Résultats de la recherche :", results);
      navigate("resultats");
    });
  };

  return (
    <div className="d-flex ms-auto w-50 position-relative">
      <Form
        className="d-flex ms-auto w-50 position-relative"
        onSubmit={handleSearchSubmit}
      >
        <FormControl
          type="search"
          placeholder="Rechercher"
          className="me-2 flex-grow-1"
          aria-label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {resultats.length > 0 && (
          <Dropdown.Menu show={true} className="search-results-dropdown">
            {resultats.map((result) => (
              <Dropdown.Item
                key={result.id}
                href={`/${result.type}/${result.id}`}
                className="search-results-dropdown-row"
              >
                {result.image.path && (
                  <img
                    src={result.image.path}
                    alt={result.nom}
                    className="search-result-image"
                  />
                )}
                <div>
                  <strong>{result.nom}</strong>
                  <p>{result.description}</p>
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        )}
        <Button className="w-auto" variant="outline-success" type="submit">
          Rechercher
        </Button>
      </Form>
    </div>
  );
};

export default SearchBar;
