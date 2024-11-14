import React from "react";
import Board from "./components/Board";

function App() {
  return (
    <div className="bg-gray-800 min-h-screen p-5">
      <header className="flex flex-col items-center justify-center text-2xl text-white mb-8">
        <b>Kanban Board</b>
      </header>
      <Board />

    </div>
  );
}

export default App;
