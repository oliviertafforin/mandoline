import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./../styles/ReturnButton.css";

interface ReturnButtonProps {
  label?: string;
  className?: string;
}

const ReturnButton: React.FC<ReturnButtonProps> = ({ label = "← Retour", className = "" }) => {
  const navigate = useNavigate();

  return (
    <Button variant="outline-dark" className={`return-button ${className}`} onClick={() => navigate(-1)}> {label} </Button> ); };

    export default ReturnButton;