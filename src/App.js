import React, { Component } from "react";
import "./App.css";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      puzzle: this.genetareShufflePuzzle(props.successPuzzle)
    };
    this.count = 0;
    this.baseState = this.state;
  }
  resetForm = () => {
    this.state = this.baseState;
    this.count = 0;
  };
  genetareShufflePuzzle(puzzle) {
    let newPuzzle = [];
    const first = 0;
    const last = puzzle.length - 1;
    for (var i = 1; i <= puzzle.length - 1; i++) {
      newPuzzle.push(i);
    }
    newPuzzle.push(false);
    newPuzzle.forEach((square, i) => {
      const swapSquareIndex = this.getRandomIntAtRange(first, last);
      [newPuzzle[swapSquareIndex], newPuzzle[i]] = [
        newPuzzle[i],
        newPuzzle[swapSquareIndex]
      ];
    });

    return newPuzzle;
  }

  getRandomIntAtRange(first, last) {
    return Math.floor(Math.random() * (last - first + 1)) + first;
  }

  displayPuzzle() {
    const { puzzle } = this.state;

    return (
      <div className="puzzle">
        {puzzle.map((square, i) => (
          <div
            key={i}
            className={this.getSquareClassName(square)}
            onClick={() => this.shift(i)}
          >
            {!!square ? square : "empty"}
          </div>
        ))}
      </div>
    );
  }
  /**
   * On application we have 2 style for cell
   * 1. Cell with number
   * 2. Cell without number
   */
  getSquareClassName(value) {
    if (!value) {
      return "puzzle--square-empty";
    }

    return "puzzle--square";
  }
  /**
   * Method after every step we should check win or not
   */
  isWinning() {
    const { puzzle } = this.state;
    const { successPuzzle } = this.props;
    let isWon = true;
    this.count += 1;
    successPuzzle.every((square, i) => {
      if (square !== puzzle[i]) {
        isWon = false;
        return;
      }
    });

    return isWon;
  }
  /**
   * Method for shift cell on different way
   */
  shift(index) {
    const { puzzle } = this.state;
    if (index % 4 !== 0 && puzzle[index - 1] === false) {
      puzzle[index - 1] = puzzle[index];
      puzzle[index] = false;
    } else if ((index + 1) % 4 !== 0 && puzzle[index + 1] === false) {
      puzzle[index + 1] = puzzle[index];
      puzzle[index] = false;
    } else if (index > 3 && puzzle[index - 4] === false) {
      puzzle[index - 4] = puzzle[index];
      puzzle[index] = false;
    } else if (index < 12 && puzzle[index + 4] === false) {
      puzzle[index + 4] = puzzle[index];
      puzzle[index] = false;
    }

    this.setState({ puzzle: puzzle });
  }

  render() {
    return (
      <div className="container">
        <div className="App">
          {this.displayPuzzle()}
          <div>Count of step {this.count}</div>
          {this.isWinning() && <div>YOU WON!</div>}
        </div>
      </div>
    );
  }
}

export default App;
