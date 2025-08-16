
import React from 'react';
import { Typography, Button, Container, Box } from '@mui/material';

const Result = ({ score, onRestart }) => {
  const getRank = () => {
    if (score === 20) {
      return { rank: '★★★★★', title: 'メタメタ大作戦2025 学力王認定！' };
    } else if (score >= 16) {
      return { rank: '★★★★☆', title: 'メタメタ大作戦2025 学力王挑戦者' };
    } else if (score >= 11) {
      return { rank: '★★★☆☆', title: 'メタメタ大作戦2025 案内人' };
    } else if (score >= 6) {
      return { rank: '★★☆☆☆', title: 'メタメタ大作戦2025 一般人' };
    } else {
      return { rank: '★☆☆☆☆', title: 'メタメタ大作戦2025 訪問者' };
    }
  };

  const handleShare = () => {
    const text = `#メタメタ大作戦2025学力王診断
20問中${score}問正解しました✨
あなたも挑戦しよう
`;
    const url = "https://asarigirl.github.io/metasama";
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  const { rank, title } = getRank();

  return (
    <Container sx={{ textAlign: 'center' }}>
      <Typography variant="h6" component="p" gutterBottom>
        あなたの「メタメタ大作戦2025 学力王診断」結果は…
      </Typography>
      <Typography variant="h2" component="p" gutterBottom color="primary">
        {rank}
      </Typography>
      <Typography variant="h4" component="p" gutterBottom sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Typography variant="h5" component="p" gutterBottom>
        {score} / 20問正解
      </Typography>
      <Button variant="contained" color="primary" onClick={onRestart} sx={{ mt: 2, mr: 1 }}>
        もう一度診断する
      </Button>
      <Button variant="contained" color="secondary" onClick={handleShare} sx={{ mt: 2, ml: 1 }}>
        Xへ投稿
      </Button>
      
    </Container>
  );
};

export default Result;
