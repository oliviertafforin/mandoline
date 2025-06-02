import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import modern icons
import styles from "../styles/Sidebar.module.css";
import { Categorie } from "../services/recette";

interface SidebarRecetteProps {
  filtreNom: string;
  sortBy: string;
  sortDir: "asc" | "desc";
  onFiltreNomChange: (value: string) => void;
  onSortByChange: (value: string) => void;
  onSortDirChange: (dir: "asc" | "desc") => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}

const SidebarRecette: React.FC<SidebarRecetteProps> = ({
  filtreNom,
  sortBy,
  sortDir,
  onFiltreNomChange,
  onSortByChange,
  onSortDirChange,
  selectedCategories,
  setSelectedCategories
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const categoriesDisponibles = Object.values(Categorie);

  const handleCategorieChange = (categorie: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categorie]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((c) => c !== categorie)
      );
    }
  };
  return (
    <>
      {/* Floating Toggle Button */}
      <button
        className={styles.sidebarToggle}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
      </button>

      {/* Sidebar Container */}
      <div className={isOpen ? styles.sidebarOpen : styles.sidebarClosed}>
        {/* Ajouter Button */}
        <Button
          variant="primary"
          className={styles.addButton}
          onClick={() => navigate("/add-recette")}
        >
          Nouvelle recette
        </Button>

        {/* Filtres */}
        <div className={styles.filter}>
          <h4>Filtres</h4>
          <Form>
          <Form.Group className="mb-3">
  <Form.Label>Filtrer par nom</Form.Label>
  <Form.Control
    type="text"
    placeholder="Nom de la recette"
    value={filtreNom}
    onChange={(e) => onFiltreNomChange(e.target.value)}
  />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Tri</Form.Label>
  <Form.Select
    value={sortBy}
    onChange={(e) => onSortByChange(e.target.value)}
  >
    <option value="nom">Nom</option>
    {/* Ajoute d'autres critères plus tard */}
  </Form.Select>
</Form.Group>

<Button
  variant="outline-secondary"
  className="mb-3"
  onClick={() => onSortDirChange(sortDir === "asc" ? "desc" : "asc")}
>
  {sortDir === "asc" ? "⬆️ Croissant" : "⬇️ Décroissant"}
</Button>

            <Form.Group>
              <Form.Label>Catégories</Form.Label>
              {categoriesDisponibles.map((cat) => (
                <Form.Check
                  key={cat}
                  type="checkbox"
                  label={cat}
                  checked={selectedCategories.includes(cat)}
                  onChange={(e) =>
                    handleCategorieChange(cat, e.target.checked)
                  }
                />
              ))}
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SidebarRecette;