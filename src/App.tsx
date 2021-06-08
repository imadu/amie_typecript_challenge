import React, { Component } from 'react';
import './App.css';
import Game from './components/Game';
import GameGrid from './components/GameGrid';
import  Hello from './hello'

interface AppProps { }
interface AppState {
  name: string;
}
class App extends Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        <p>
          Look for the words for <strong>Cole</strong>
        </p>
        <Game>
          <GameGrid/>
        </Game>
      </div>
    );
  }
}

export default App;
