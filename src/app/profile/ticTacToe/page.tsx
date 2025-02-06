'use client'

import { useLanguage } from "@/app/context/LanguageContext";
import { useState, useEffect } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const winner = calculateWinner(board);

  useEffect(() => {
    if (winner) {
      if (winner === "X") setXWins((prev) => prev + 1);
      if (winner === "O") setOWins((prev) => prev + 1);
    }
  }, [winner]);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const { language } = useLanguage()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen h-screen p-6 bg-gradient-to-r dark:from-purple-500 dark:via-indigo-500 dark:to-blue-500 dark:bg-gray-900 transition-all">
      <h1 className="text-5xl font-extrabold mb-6 text-black dark:text-white drop-shadow-lg">
        {language === "eng" ? "Tic-Tac-Toe" : "იქსიკ ნოლიკი"}
      </h1>
      <div className="grid grid-cols-3 gap-4 p-4 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg bg-gradient-to-t from-gray-100 to-gray-200 dark:bg-gray-800">
        {board.map((value, index) => (
            <div className="flex items-center justify-center">
                <button
                    key={index}
                    className={`w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center text-4xl sm:text-5xl font-bold text-white border-4 rounded-lg transition-all transform ${value === "X" ? "bg-blue-500 border-blue-700 hover:bg-blue-400" : value === "O" ? "bg-green-500 border-green-700 hover:bg-green-400" : "bg-gray-200 border-gray-400 hover:bg-gray-300 dark:bg-gray-700 dark:border-gray-500"}`}
                    onClick={() => handleClick(index)}
                >
                    {value}
                </button>
            </div>

        ))}
      </div>
      <p className="text-2xl sm:text-3xl mt-4 font-semibold text-black dark:text-white drop-shadow-lg">
        {winner ? 
        `${language === "eng" ? "Winner: " : "გამარჯვებული: "} ${winner}` : 
        `${language === "eng" ? "Next Player:" : "შემდეგი მოთამაშე"} ${isXNext ? "X" : "O"}`
        }
      </p>
      <div className="flex gap-6 mt-6 text-lg text-white">
        <p className="px-4 py-2 rounded-lg shadow-md bg-gray-600 bg-opacity-70">X {language === "eng" ? "Wins: " : "მოგება: "} {xWins}</p>
        <p className="px-4 py-2 rounded-lg shadow-md bg-gray-600 bg-opacity-70">O {language === "eng" ? "Wins: " : "მოგება: "} {oWins}</p>
      </div>
      <button
        className="mt-6 px-6 py-3 bg-yellow-500 text-black text-lg font-bold rounded-lg shadow-xl hover:bg-yellow-400 transition-all transform hover:scale-105"
        onClick={resetGame}
      >
        {language === "eng" ? "Reset Game" : "თავიდან დაწყება"}
      </button>
    </div>
  );
  };

const calculateWinner = (squares: (string | null)[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default TicTacToe;
