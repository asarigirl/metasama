
import React, { useState, useEffect } from 'react';
import { Typography, Button, Container, Box } from '@mui/material';

const Question = ({ question, onAnswer, onQuit }) => {
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer === 0) {
      onAnswer(false); // 時間切れで不正解
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer, onAnswer]);

  useEffect(() => {
    setTimer(10); // 新しい問題が来るたびにタイマーをリセット
  }, [question]);

  return (
    <Container>
      <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: 'left' }}>
        {question.question}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant="contained"
            color="primary"
            onClick={() => onAnswer(option)}
            sx={{ m: 1, width: '100%', justifyContent: 'flex-start' }}
          >
            <Typography variant="button">{option}</Typography>
          </Button>
        ))}
      </Box>
      <Button variant="outlined" color="secondary" onClick={onQuit} sx={{ mt: 2 }}>
        診断をやめる
      </Button>
      <Typography variant="h6" component="div" sx={{ mt: 2, textAlign: 'center' }}>
        残り時間: {timer}秒
      </Typography>
    </Container>
  );
};

export default Question;
