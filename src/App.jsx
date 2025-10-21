// App.jsx
// ストップウォッチアプリ（React + Material UI + Vite）

import './App.css';
import { useState, useRef, useEffect } from 'react'
import { Box, Button, Typography, Container, useTheme } from "@mui/material";
import { appSourceCodePromise } from './code';

export default function App() {
  // MUIテーマ（色など）を取得
  const theme = useTheme();
  // 経過時間（100分の1秒単位）
  const [time, setTime] = useState(0);
  // ストップウォッチの動作状態
  const [isRunning, setIsRunning] = useState(false);
  // ソースコード表示のON/OFF
  const [showCode, setShowCode] = useState(false);
  // ソースコードの文字列（ビルド時にcode.jsから非同期で受け取る）
  const [appSourceCode, setAppSourceCode] = useState('');
  // setIntervalのIDを保持するための参照
  const intervalRef = useRef(null);

  // App.jsxのソースコードをビルド時に読み込む
  useEffect(() => {
    appSourceCodePromise.then(setAppSourceCode);
  }, []);

  // 開始/停止ボタンが押されたときの処理
  const startStop = () => {
    if (isRunning) {
      // 停止中 ... intervalをクリア
      clearInterval(intervalRef.current);
    } else {
      // 開始 ... 0.01秒ごとにtimeを更新
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 0.01);
      }, 10);
    }
    setIsRunning(!isRunning);
  };

  // リセットボタンが押されたときの処理
  const reset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
  };

  // 時間を「MM:SS:CC（分:秒:センチ秒）」形式に整形する関数
  const formatTime = (t) => {
    const minutes = Math.floor(t / 60);
    const seconds = Math.floor(t % 60);
    const centiseconds = Math.floor((t % 1) * 100);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${centiseconds.toString().padStart(2, '0')}`;
  }

  return (
    <Container
    // 画面全体を張横揃えにして、スマホでも崩れにくいよう設定
      sx={{
        width: "100%",
        minWidth: 320,
        height: "100svh",
        minHeight: 568,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* 現在の経過時間を表示 */}
      <Typography
        variant="h2"
        sx={{
          fontVariantNumeric: "tabular-nums",
          fontFamily: "Fira Code",
          mb: 3 ,
        }}
      >
        {formatTime(time)}
      </Typography>

      {/* 開始/停止ボタンとリセットボタンの配置場所 */}
      <Box sx={{ display: "flex", gap: 2 }}>

        {/* 開始/停止ボタン */}
        <Button
          variant="contained"
          color={isRunning ? "error" : "primary"}
          onClick={startStop}
          sx={{ width: 100 }}
        >
          {isRunning ? "停止" : "開始"}
        </Button>

        {/* リセットボタン */}
        <Button
          variant="outlined"
          onClick={reset}
          sx={{ width: 100 }}
        >
          リセット
        </Button>
      </Box>

      {/* ソースコード表示切替ボタン */}
      <Button
        variant="text"
        onClick={() => setShowCode(!showCode)}
        color="secondary"
        sx={{ mt: 3}}
      >
        {showCode ? "ソースコードを閉じる" : "ソースコードをみる"}
      </Button>

      {/* ソースコード表示部分（開かれているときのみ描画） */}
      {showCode && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            width: "90%",
            maxHeight: "50vh",
            overflowY: "auto",
            fontSize: "0.8rem",
            borderRadius: 1,
            textAlign: "left",
            border: `1px solid ${theme.palette.divider}`,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            overflowX: "hidden",
          }}
        >
          <pre
            style={{
              margin: 0,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {appSourceCode}
          </pre>
        </Box>
      )}
    </Container>
  );
}