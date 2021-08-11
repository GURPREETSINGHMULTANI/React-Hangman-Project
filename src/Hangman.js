import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import { randomWord } from './words.js';

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord(), hasWon: false };
    this.handleGuess = this.handleGuess.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.hasWon = this.hasWon.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
      hasWon: this.hasWon()

    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr, i) => (
      <button
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
        key={i}
      >
        {ltr}
      </button>
    ));
  }

  restartGame() {
    this.setState({ nWrong: 0, guessed: new Set(), answer: randomWord(), hasWon: false })
  }
  hasWon() {
    let won = true;
    this.state.answer.split("").forEach(ltr => {
      if (!this.state.guessed.has(ltr)) {
        won = false;
      }
    })
    return won;
  }

  /** render: render game */
  render() {
    return (
      <div className='Hangman'>
        <div className='Hangman-section-1'>
          <h1>Hangman</h1>
          <img alt={`${this.state.nWrong} wrong guesses`} src={this.props.images[this.state.nWrong]} />
        </div>
        <div className='Hangman-section-2'>
          <p className='Hangman-wrong-guesses'>Number wrong: {this.state.nWrong}</p>
          <p className='Hangman-word'>{this.props.maxWrong === this.state.nWrong ? this.state.answer : this.guessedWord()}</p>
          {(this.props.maxWrong === this.state.nWrong || this.state.hasWon) ? null : <p className='Hangman-btns'>{this.generateButtons()}</p>}
          {this.props.maxWrong === this.state.nWrong ? <p>You Lose!</p> : null}
          {this.state.hasWon ? <p>You Win!</p> : null}
          <div className="Hangman-button">
            <button style={{ display: 'block', width: 'auto' }} className="Hangman-restart" onClick={this.restartGame}>Restart Game</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Hangman;
