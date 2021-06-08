import React, { useContext, useState, useEffect } from "react";
import GameCell from "./GameCell";
import { GameContext } from './Game';



export default function GameGrid ({}) {
  const { gameState: { level }, gameData, advance } = useContext(GameContext)

  const currentData = gameData[`data${level}`];
  
  const [state, setState] = useState({
    mouseDown: false,
    start: undefined,
    end: undefined,
  });
  const { mouseDown, end, start } = state;

  const emitValue = (cellValue: string, isStart: boolean) => {
    const start = isStart ? cellValue : state.start
    const end = !isStart ? cellValue : state.end
    setState(prevState => ({ ...prevState, start, end }))
  };

  const onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      mouseDown: true
    }));
  }

  const onMouseUp = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    console.log("mousing up")
    const targetCoords = Object.keys(currentData.word_locations)[0].split(',')
    const startTarget = targetCoords.slice(0, 2).join(',')
    const endTarget = targetCoords.slice(-2).join(',')
    console.log({endTarget, startTarget})
    setState((prevState) => ({
      ...prevState,
      mouseDown: false
    }));

    if (endTarget === end && startTarget === start)
      advance();
    }

  const updateMouseDownState = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>, mouseDownState: boolean) => {
    event.preventDefault();
    setState((prevState) => ({ ...prevState, mouseDown: mouseDownState }));
  };

  const displayCells = currentData.character_grid.map((row, yCoord) => (
    row.map((cell, xCoord)=> (
      <GameCell
        key={xCoord}
        index={xCoord}
        coords={`${xCoord},${yCoord}`}
        mouseDown={mouseDown}
        cellValue={cell}
        emitValue={emitValue}
      />
    ))
  ));

  return (
    <>
      <p>Lets find the correct translation of the word! </p>
      <p>current word is {currentData.word}</p>
      <div
        className="wrapper"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchStart={(event) => {
          updateMouseDownState(event, true);
        }}
        onTouchEnd={(event) => {
          updateMouseDownState(event, false);
        }}
      >
        {displayCells}
      </div>
    </>
  );
};
