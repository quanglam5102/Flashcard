import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UpdateCard() {
  const { id } = useParams();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/get-card/${id}`)
      .then((res) => {
        setQuestion(res.data.question);
        setAnswer(res.data.answer);
        setStatus(res.data.status);
        setOptions(res.data.options);
      })
      .catch((err) => {
        console.error("Error fetching card data:", err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/update-card/${id}`, {
        question: question,
        answer: answer,
        status: status,
        options: options
    })
    .then(res => {
        console.log("Updated successfully", res);
    })
    .catch(error => {
        console.error("Error updating", error);
    })
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  return (
    <Stack
      spacing={3}
      sx={{ width: "400px", margin: "20px auto", padding: 2 }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" textAlign="center">
        Update Card
      </Typography>
      <TextField
        label="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      <TextField
        label="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
        }
        label="Status"
      />
      <Typography variant="subtitle">Options</Typography>
      {options &&
        options.map((option, index) => {
          return (
            <Stack direction="row" spacing={1} key={index} alignItems="center">
              <TextField
                label={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                fullWidth
              />
              <IconButton color="error" onClick={() => removeOption(index)}>
                <RemoveCircle />
              </IconButton>
            </Stack>
          );
        })}
      <Button variant="outlined" startIcon={<AddCircle />} onClick={addOption}>
        Add Option
      </Button>

      <Button type="submit" variant="contained" color="primary">
        Update Card
      </Button>
    </Stack>
  );
}
