import React, { useState } from "react";
import "./../../styles/CoursesPage.css";

interface ShoppingItem {
  id: number;
  name: string;
  quantity: number;
}

const CoursesPage: React.FC = () => {
  const [items, setItems] = useState<ShoppingItem[]>([
    { id: 1, name: "Pommes", quantity: 3 },
    { id: 2, name: "Lait", quantity: 1 },
    { id: 3, name: "Pain", quantity: 2 },
  ]);

  const [newItem, setNewItem] = useState({ name: "", quantity: 1 });

  const handleAddItem = () => {
    if (newItem.name.trim() === "") return;

    const newItemObj: ShoppingItem = {
      id: items.length + 1,
      name: newItem.name,
      quantity: newItem.quantity,
    };

    setItems([...items, newItemObj]);
    setNewItem({ name: "", quantity: 1 });
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h2>Ma Liste de Courses</h2>
      <button>Préparer ses courses / Terminer</button>
      <button>Nouvel article</button>
      <button>Gérer les listes</button>
      <button>...</button>
      <ul className="shopping-list">
        {items.map((item) => (
          <li key={item.id} className="shopping-item">
            {item.name} - {item.quantity}
            <button
              className="remove-btn"
              onClick={() => handleRemoveItem(item.id)}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
      <div className="shopping-form">
        <input
          type="text"
          placeholder="Nouvel article..."
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="number"
          min="1"
          value={newItem.quantity}
          onChange={(e) =>
            setNewItem({ ...newItem, quantity: Number(e.target.value) })
          }
        />
        <button className="add-btn" onClick={handleAddItem}>
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default CoursesPage;
