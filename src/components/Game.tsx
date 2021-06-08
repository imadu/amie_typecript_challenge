import React, { createContext, useState, useEffect, useReducer } from "react";
import data from '../source-data.json'

const initialState = {
  gameData: data,
  gameState: {
    level: 1,
    completed: false,
  },
  advance: () => {}
}

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_LEVEL': {
      const nextLevel = state.gameState.level + 1
      console.log('ADVANCING')
      const completed = !state.gameData[`data${nextLevel}`]
      return {
        ...state, 
        gameState: {
          ...state.gameState,
          level: nextLevel, 
          completed
        }
      }
    }
    default:
      return state;
  }
}

export const GameContext = createContext(initialState)


export default function Game ({children}) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const advance = () => {
    dispatch({type: 'UPDATE_LEVEL'})
  }

  return (
    <GameContext.Provider value={{ ...state, advance }}>
      {children}
    </GameContext.Provider>
  )
}
