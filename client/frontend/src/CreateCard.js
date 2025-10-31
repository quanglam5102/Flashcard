import React, { useState } from "react";
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

function CreateCard() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState(false);
  const [options, setOptions] = useState([""]);

  const addOption = () => setOptions([...options, ""]);
  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { question, answer, status, options };

    try {
      const response = await fetch("http://localhost:5000/create-new-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Card created! ID: " + data.card_id);
        setQuestion("");
        setAnswer("");
        setStatus(false);
        setOptions([""]);
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  return (
    <Stack
      spacing={3}
      sx={{ width: "400px", margin: "20px auto", padding: 2 }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" textAlign="center">
        Create a Card
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

      <Typography variant="subtitle1">Options</Typography>
      {options.map((option, index) => (
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
      ))}
      <Button
        variant="outlined"
        startIcon={<AddCircle />}
        onClick={addOption}
      >
        Add Option
      </Button>

      <Button type="submit" variant="contained" color="primary">
        Create Card
      </Button>
    </Stack>
  );
}

export default CreateCard;
