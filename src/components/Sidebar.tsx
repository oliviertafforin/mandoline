import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import modern icons
import "../styles/Sidebar.css";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <>
      {/* Floating Toggle Button */}
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
      </button>
      {/* Sidebar Container */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Ajouter Button */}
        <Button
          variant="primary"
          className="add-button"
          onClick={() => navigate("/add-ingredient")}
        >
          Nouvel ingrédient
        </Button>

        {/* Checkbox Fields */}
        <div className="filters">
          <h4>Filtres</h4>
          <Form>
            <Form.Check type="checkbox" label="De saison" />
            <Form.Check type="checkbox" label="Préférées seulement" />
            <Form.Check type="checkbox" label="Rapides" />
            <Form.Check type="checkbox" label="Faciles" />
            <Form.Check type="checkbox" label="Végés" />
            <Form.Check type="checkbox" label="Véganes" />
            <Form.Check type="checkbox" label="Entrées" />
            <Form.Check type="checkbox" label="Plats" />
            <Form.Check type="checkbox" label="Desserts" />
            <Form.Check type="checkbox" label="Pas chères" />
            <Form.Check type="checkbox" label="Option 1" />
            <Form.Check type="checkbox" label="Option 2" />
            <Form.Check type="checkbox" label="Option 3" />
            <Form.Check type="checkbox" label="Option 4" />
            <Form.Check type="checkbox" label="Option 5" />
            <Form.Check type="checkbox" label="Option 1" />
            <Form.Check type="checkbox" label="Option 2" />
            <Form.Check type="checkbox" label="Option 3" />
            <Form.Check type="checkbox" label="Option 4" />
            <Form.Check type="checkbox" label="Option 5" />
          </Form>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
