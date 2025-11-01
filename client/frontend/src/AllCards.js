import React, { useState, useEffect, useRef } from "react";
import FlashcardList from "./FlashcardList";
import { Button, Box } from "@mui/material";
import Icon from "@mui/material/Icon";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function AllCards() {
  const [flashcards, setFlashcards] = useState([]);
  const navigate = useNavigate();
  const fetchAllCards = () => {
    fetch("http://localhost:5000/all-cards")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setFlashcards(
          data.map((item) => ({
            id: item.id,
            question: item.question,
            answer: item.answer,
            status: item.status,
            options: item.options.sort(() => Math.random() - 0.5),
          }))
        );
      })
      .catch((err) => {
        console.error("Error fetching flashcards:", err);
      });
  }
  useEffect(() => {
    fetchAllCards()
  }, []);
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          maxWidth: 400,
          margin: "auto",
          mt: 5,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/create-card")}
          startIcon={<AddCircleIcon />}
        >
          Create
        </Button>
      </Box>
      <div className="container">
        <FlashcardList flashcards={flashcards} refreshCards={fetchAllCards} />
      </div>
    </div>
  );
}
