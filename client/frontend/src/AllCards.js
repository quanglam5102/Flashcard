import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import FlashcardList from "./FlashcardList";
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function AllCards() {
    const [flashcards, setFlashcards] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:5000/all-cards")
            .then(res => {
                console.log('data', res);
                setFlashcards(res.data.map((data, index) => {
                    return {
                        'id': data.id,
                        'question': data.question,
                        'answer': data.answer,
                        'status': data.status,
                        'options': data.options.sort(() => Math.random() - .5)
                    }
                }));
            })
    }, [])
    return (
        <div className="container">
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: '20px'}}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/create-card")}
                    startIcon={<AddCircleIcon />}
                  >
                    Create
                  </Button>
              </div>
              <FlashcardList flashcards={flashcards} />
          </div>
    )
}