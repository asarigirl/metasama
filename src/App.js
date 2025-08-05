import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Button,
  Box,
} from '@mui/material';
import Question from './components/Question';
import Result from './components/Result';
import { quizData } from './quizData';

import { responsiveFontSizes } from '@mui/material';

let theme = createTheme({
  palette: {
    primary: {
      main: '#F0566E', // 赤
    },
    secondary: {
      main: '#00AEEF', // 水色
    },
    background: {
      default: '#ffffff', // 背景色: 白
    },
  },
  typography: {
    fontFamily: ['Kiwi Maru', 'sans-serif'].join(','),
  },
});

theme = responsiveFontSizes(theme);

const AppTitle = () => (
  <Box sx={{ textAlign: 'center', color: 'black' }}>
    <Typography variant="h4" component="div" sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}>
      メタメタ大作戦2025ファンゲーム
    </Typography>
    <Typography variant="h4" component="div" sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}>
      <Box component="span" sx={{ color: 'blue' }}>クイズ</Box>
      <Box component="span" sx={{ color: '#00AEEF' }}>プレゼン</Box>
      <Box component="span" sx={{ color: 'magenta' }}>バラエティー</Box>
    </Typography>
  </Box>
);

// 配列をシャッフルする関数
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function App() {
  const [gameState, setGameState] = useState('start'); // 'start', 'quiz', 'result'
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  

  const startGame = () => {
    // クイズデータをシャッフルして20問選ぶ
    const selectedQuestions = shuffleArray(quizData).slice(0, 20);
    // 各問題の選択肢もシャッフル
    const shuffledQuestions = selectedQuestions.map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setQuestions(shuffledQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setGameState('quiz');
  };

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setGameState('result');
    }
  };

  const handleRestart = () => {
    setGameState('start');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="transparent" elevation={0} sx={{ mt: 4 }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <AppTitle />
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <Box
          component="img"
          src={process.env.PUBLIC_URL + '/q.png'}
          alt="Qさまロゴ"
          sx={{
            maxWidth: { xs: '50%', md: '35%' },
            width: '100%',
            height: 'auto',
            display: 'block',
            margin: '0 auto 20px',
          }}
        />
        {gameState === 'start' && (
          <Button variant="contained" color="primary" size="large" onClick={startGame}>
            スタート
          </Button>
        )}
        {gameState === 'quiz' && questions.length > 0 && (
          <Question
            question={questions[currentQuestion]}
            onAnswer={handleAnswer}
            onQuit={() => setGameState('result')}
          />
        )}
        {gameState === 'result' && (
          <Result score={score} onRestart={handleRestart} />
        )}
      </Container>
      <Box sx={{ textAlign: 'center', color: 'black', mt: 4, mb: 2 }}>
        <Typography variant="body2">
          メタメタ大作戦2025 学力王診断
        </Typography>
        <Typography variant="body2">
          ✍️20問出題（ランダム）
        </Typography>
        <Typography variant="body2">
          ⌛制限時間：1問10秒
        </Typography>
        <Typography variant="body2">
          ⚙️作成：ふつうのアサリガール 
        </Typography>
        <Typography variant="body2">
          最終更新：2025年8月6日
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

export default App;

