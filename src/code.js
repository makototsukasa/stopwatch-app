// code.js
// Vite専用: import.meta.glob を使って生テキストとして読み込む
const modules = import.meta.glob('./App.jsx', { as: 'raw' });

// Promiseをexport（App.jsx側でawaitまたはthenで受け取る）
export const appSourceCodePromise = modules['./App.jsx']();
