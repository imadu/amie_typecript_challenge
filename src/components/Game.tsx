import { createContext, useReducer } from "react";
import data from '../source-data.json'

const initialState = {
  gameData: data,
  gameState: {
    level: 1,
    completed: false,
  },
  advance: () => {}
}

/**Had to use an any type here because react suspects that gameData could have a situation  
 * where it doens't come with  a completed  property and I didn't know how to fix that
*/
const gameReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'UPDATE_LEVEL': {
      const nextLevel = state.gameState.level + 1
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

  const isCompleted = state.gameState.completed

  return (
    <GameContext.Provider value={{ ...state, advance }}>
      {isCompleted ? <h1>You've reached the end. Refresh to start again</h1> : children}
    </GameContext.Provider>
  )
}
