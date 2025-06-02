import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import styles from "./../styles/ReturnButton.module.css";

interface ReturnButtonProps {
  label?: string;
  className?: string;
}

const ReturnButton: React.FC<ReturnButtonProps> = ({ label = "← Retour", className = "" }) => {
  const navigate = useNavigate();

  return (
    <Button variant="outline-dark" className={`${styles.bouton} ${className}`} onClick={() => navigate(-1)}> {label} </Button> ); };

    export default ReturnButton;