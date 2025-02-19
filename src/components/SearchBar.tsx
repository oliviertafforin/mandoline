// SearchBar.tsx
import React, { FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import {
    ResultatRecherche
} from "../services/recherche";

interface SearchBarProps {
  onSearch: (query: string) => void;
  searchData: Array<ResultatRecherche>;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchData }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const performSearch = (searchQuery: string) => {
    // Filtrer les données localement
    const results = searchData.filter((item: ResultatRecherche) =>
      item.nom.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log("Résultats de la recherche :", results);
  };

  return (
    <Form className="d-flex ms-auto" onSubmit={handleSearchSubmit}>
      <FormControl
        type="search"
        placeholder="Rechercher"
        className="me-2"
        aria-label="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button variant="outline-success" type="submit">
        Rechercher
      </Button>
    </Form>
  );
};

export default SearchBar;
