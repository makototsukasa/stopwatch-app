import './App.css';
import { useState, useRef } from 'react'
import { Box, Button, Typography, Container } from "@mui/material";

export default function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const startStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 0.01);
      }, 10);
    }
    setIsRunning(!isRunning);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (t) => {
    const minutes = Math.floor(t / 60);
    const seconds = Math.floor(t % 60);
    const centiseconds = Math.floor((t % 1) * 100);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${centiseconds.toString().padStart(2, '0')}`;
  }

  return (
    <Container
      sx={{
        width: "100%",
        minWidth: 320,
        height: "100vh",
        minHeight: 568,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        boxSizing: "border-box", // paddingやborderを含める
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontVariantNumeric: "tabular-nums",
          fontFamily: "Fira Code",
          mb: 3 ,
          color: "white"
        }}
      >
        {formatTime(time)}
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color={isRunning ? "error" : "primary"}
          onClick={startStop}
          sx={{ width: 100 }}
        >
          {isRunning ? "停止" : "開始"}
        </Button>
        <Button
          variant="outlined"
          onClick={reset}
          sx={{ width: 100 }}
        >
          リセット
        </Button>
      </Box>
    </Container>
  );
}