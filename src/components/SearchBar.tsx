// SearchBar.tsx
import React, { ChangeEvent, FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import "./../styles/SearchBar.css";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { ResultatRecherche } from "../services/recherche";
import { Dropdown } from "react-bootstrap";

interface SearchBarProps {
  onSearch: (query: string) => void;
  searchData: Array<ResultatRecherche>;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchData }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Array<ResultatRecherche>>(
    []
  );

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.currentTarget.value;
    setSearchQuery(query);
    if (query.length >= 3) {
      performSearch(query);
    }
  };

  const performSearch = (searchQuery: string) => {
    // Filtrer les données localement
    const results = searchData.filter((item: ResultatRecherche) =>
      item.nom.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
    console.log("Résultats de la recherche :", results);
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
      {searchResults.length > 0 && (
        <Dropdown.Menu show={true} className="search-results-dropdown">
          {searchResults.map((result) => (
            <Dropdown.Item
              key={result.id}
              href={`/${result.type}/${result.id}`}
              className="search-results-dropdown-row"
            >
              {result.image.url && (
                <img
                  src={result.image.url}
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
    </Form>
    <Button className="w-auto" variant="outline-success" type="submit">
    Rechercher
  </Button>
  </div>
  );
};

export default SearchBar;
