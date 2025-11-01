import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Flashcard({ flashcard, refreshCards }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState("initial");
  const frontEl = useRef();
  const backEl = useRef();

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  }

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  function handleEdit() {
    navigate(`/update-card/${flashcard.id}`);
  }

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/delete-card/${flashcard.id}`);
      refreshCards();
      handleClose();
    } catch (err) {
      console.error("Faild to delete card: ", err);
    }
  };

  useEffect(() => {
    setMaxHeight();
  }, [flashcard.question, flashcard.answer, flashcard.options]);

  useEffect(() => {
    window.addEventListener("resize", setMaxHeight);
    return () => window.removeEventListener("resize", setMaxHeight);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Dialog open={open} onClose={handleClose} disableEnforceFocus >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this card? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <div
        hidden={flashcard.status == undefined}
        style={{ marginBottom: "10px" }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={handleEdit}
          style={{ marginRight: "20px" }}
        >
          Edit
        </Button>
        <Button variant="outlined" color="error" onClick={handleOpen}>
          Delete
        </Button>
      </div>
      <div
        className={`card ${flip ? "flip" : ""}`}
        onClick={() => setFlip(!flip)}
        style={{ height: height }}
      >
        <div className="item front" ref={frontEl}>
          {flashcard.question}

          <div className="item flashcard-options">
            {flashcard.options.map((option) => {
              return (
                <div className="flashcard-option" key={option}>
                  {option}
                </div>
              );
            })}
          </div>
        </div>
        <div className="back" ref={backEl}>
          {flashcard.answer}
        </div>
        {/*{flip ? flashcard.answer : flashcard.question}*/}
      </div>
    </div>
  );
}
