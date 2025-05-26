// SearchBar.tsx
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import styles from "./../styles/SearchBar.module.css";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { recherche, ResultatRecherche } from "../services/recherche";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "./Context";
import { download } from "../services/image";

interface SearchBarProps {
  onSearch: (query: string) => void;
  resultatsPrecharges: Array<ResultatRecherche>;
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
    if (results) {
      enrichirResultatsAvecImages(results).then((resultatsAvecImage) => {
        setResultats(resultatsAvecImage);
      });
    } else {
      setResultats([]);
    }
  };

  const performSearch = (searchQuery: string) => {
    //Recherche directe en base
    recherche(searchQuery).then((results) => {
      if (results) {
        enrichirResultatsAvecImages(results).then((resultatsAvecImage) => {
          setResultats(resultatsAvecImage);
        });
      } else {
        setResultats([]);
      }
      navigate("resultats");
    });
  };

  const enrichirResultatsAvecImages = async (
    resultats: ResultatRecherche[]
  ) => {
    const resultatsEnrichis = await Promise.all(
      resultats.map(async (resultat) => {
        if (resultat.image.id) {
          const imageUrl = await download(resultat.image.id);
          return {
            ...resultat,
            image: {
              ...resultat.image,
              url: imageUrl,
            },
          };
        }
        return resultat;
      })
    );
    return resultatsEnrichis;
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
          <Dropdown.Menu show={true} className={styles.searchResultsDropdown}>
            {resultats.map((result) => (
              <Dropdown.Item
                key={result.id}
                href={`/${result.type}/${result.id}`}
                className={styles.searchResultsDropdownRow}
              >
                {result.image.url && (
                  <img
                    src={result.image.url}
                    alt={result.nom}
                    className={styles.searchResultsImage}
                  />
                )}
                <div>
                  <strong>{result.nom}</strong>
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
