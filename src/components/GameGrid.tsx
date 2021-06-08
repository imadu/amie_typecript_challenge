import React, { useContext, useState, useEffect } from "react";
import GameCell from "./GameCell";
import { GameContext } from "./Game";


export default function GameGrid({}) {
  const {
    gameState: { level },
    gameData,
    advance,
  } = useContext(GameContext);
  const currentData = gameData[`data${level}`];

  const [status, setStatus] = useState("IDLE");
  const [selection, setSelection] = useState([]);

  const selectionString = selection.join(",");

  useEffect(() => {
    const match = Object.keys(currentData.word_locations).includes(
      selectionString
    );
    if (match) {
      if (window.confirm("Congrations you got the right translation")) {
        advance();
        setSelection([]);
        setStatus("IDLE");
      }
    }
  }, [status]);

  const onMouseOver = (value: any) => {
    if (status === "SELECTING") {
      setSelection((selection) => [...selection, value]);
    }
  };

  const onMouseDown = (value: any) => {
    setStatus("SELECTING");
    setSelection((selection) => [value]);
  };

  const onMouseUp = (value: any) => {
    setStatus("SELECTED");
  };

  const gridSize = currentData.character_grid.length;
  const displayCells = currentData.character_grid.map(
    (row: any[], yCoord: any) =>
      row.map((cell: any, xCoord: React.Key) => {
        const coords = `${xCoord},${yCoord}`;
        const active = selection.includes(coords);
        return (
          <GameCell
            active={active}
            key={xCoord}
            status={status}
            coords={coords}
            cellValue={cell}
            onMouseDown={onMouseDown}
            onMouseOver={onMouseOver}
            onMouseUp={onMouseUp}
          />
        );
      })
  );

  return (
    <div>
      <p>Let's translate some words to spanish!</p>
      <p>
        The word we are looking for is <strong>{currentData.word}</strong>
      </p>
      <div
        className="wrapper"
        style={{ "--size": gridSize } as React.CSSProperties}
      >
        {displayCells}
      </div>
    </div>
  );
}
