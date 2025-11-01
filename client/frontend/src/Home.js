import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import FlashcardList from "./FlashcardList";
import "./app.css";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";

function Home() {
  const [flashcards, setFlashcards] = useState([]);
  const [category, setCategory] = useState('');
  const categoryEl = useRef();
  const amountEl = useRef();
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.trivia_categories));
  }, []);

  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get("https://opentdb.com/api.php", {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value,
        },
      })
      .then((res) => {
        setFlashcards(
          res.data.results.map((questionItem, index) => {
            const answer = decodeString(questionItem.correct_answer);
            const options = [
              ...questionItem.incorrect_answers.map((a) => decodeString(a)),
              answer,
            ];
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(questionItem.question),
              answer: answer,
              options: options.sort(() => Math.random() - 0.5),
            };
          })
        );
      });
  }
  return (
    <>
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                maxWidth: 400,
                margin: "auto",
                mt: 5,
            }}
        >
            <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select 
                    inputRef={categoryEl}
                    label="Category"
                    value={category}
                    onChange={(e)=> setCategory(e.target.value)}
                >
                    {categories.map((category) => {
                        return(
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    )})}
                </Select>            
            </FormControl>
            <TextField
                inputRef={amountEl}
                label="Number of Questions"
                type="number"
                defaultValue="10"
            />
            <Button type="submit" variant="contained" color="primary">Generate</Button>
        </Box>
      <div className="container">
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}

export default Home;
