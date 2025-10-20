import { useState, useEffect } from 'react'
import { Button, Container, Typography, Stack } from "@mui/material";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => setTime((t) => t + 10), 10);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const displayMs = Math.floor((ms % 1000) / 10)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${(seconds % 60).toString().padStart(2, "0")}.${displayMs}`;
  };

  return (
    <Container maxWidth="xs" sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4" gutterButtom>
        ストップウォッチ
      </Typography>
      <Typography variant="h3" sx={{ mb: 4 }}>
        {formatTime(time)}
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant="contained"
          color={isRunning ? "error" : "primary"}
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? "停止" : "開始"}
        </Button>
        <Button variant="outlined" onClick={() => setTime(0)}>
          リセット
        </Button>
      </Stack>
    </Container>
  );
}

export default App;