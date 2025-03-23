"use client";

import { useState, useEffect } from "react";
import { Modal } from "antd";

import { getRandomPackage } from "@/lib/useFetchPackage";
import Aside from "./components/aside";

export default function Home() {
  const [currentPackageName, setCurrentPackageName] = useState("");
  const [nextPackageName, setNextPackageName] = useState("");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const refreshPackages = () => {
    setCurrentPackageName(nextPackageName);
    const newNextPackage = getRandomPackage([
      nextPackageName,
      currentPackageName,
    ]);
    setNextPackageName(newNextPackage);
  };

  const startGame = () => {
    const firstPackageName = getRandomPackage();
    const secondPackageName = getRandomPackage([firstPackageName]);

    setScore(0);
    setGameOver(false);
    setCurrentPackageName(firstPackageName);
    setNextPackageName(secondPackageName);
  };

  useEffect(() => {
    startGame();
    if (typeof window !== "undefined") {
      const savedHighScore = localStorage.getItem("npmHighScore");
      if (savedHighScore) setHighScore(parseInt(savedHighScore));
    }
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f7f7f7",
      }}
    >
      <Aside
        current={currentPackageName}
        next={nextPackageName}
        refreshPackages={refreshPackages}
        score={score}
        setScore={setScore}
        gameOver={gameOver}
        setGameOver={setGameOver}
        highScore={highScore}
        setHighScore={setHighScore}
      />

      <Modal
        title="Game Over!"
        open={gameOver}
        onOk={startGame}
        onCancel={startGame}
        okText="Play Again"
      >
        <p>Your final score: {score}</p>
        {score === highScore && score > 0 && (
          <p>New high score! Congratulations!</p>
        )}
      </Modal>
    </div>
  );
}
