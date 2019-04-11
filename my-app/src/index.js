import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
function Square(props) {
    return (
      <button className="square" onClick={ props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
      constructor(props) {
          super(props);
          this.state = { 
                squares : Array(props.size*props.size).fill(null),
                nextMove: 'X'
            };
      }
    handleClick(i) {
        const squares = this.state.squares.slice();
        //console.log(this.state);
        if(squares[i]) {
            return;
        }
        squares[i] = this.state.nextMove;
        this.setState({squares :squares, nextMove : (this.state.nextMove === 'X') ? '0': 'X'});
    }

    generateWinCombinations(sizeParam) {
        let winningCombinations = [];
        let diag1 = [];
        let diag2 = [];
        let size = parseInt(sizeParam);
        let combVertical = new Array(size).fill(0).map(() => new Array(size).fill(0));
        for(var i = 0 ; i < size; i++) {
          let combHorizantal = [];
          for(var j = 0 ; j < size; j++) {
            combVertical[j][i] = i*size+j;
            combHorizantal.push(i*size+j);
            if(i === j) diag1.push(i*size+j);
            if(i+j === size-1) diag2.push(i*size+j);
          }
          winningCombinations.push(combHorizantal);
        }
        winningCombinations.push(diag1,diag2, ...combVertical);
        return winningCombinations;
    }

    calculateWinner(squares) {
      var winningCombins = this.generateWinCombinations(this.props.size);
      let winner = null;
      for(let k=0; k < winningCombins.length; k++ ) {
        for(let m = 1; m < winningCombins[k].length; m++) {
          if(squares[winningCombins[k][0]] === squares[winningCombins[k][m]]) {
            winner = squares[winningCombins[k][0]];
          } else {
            winner = null;
            break;
          }
        } 
        if(winner) return winner;
      }
      return winner;
    }
    renderSquare(i) {
      return (<Square value={this.state.squares[i]} onClick={ () => this.handleClick(i)}/>);
    }
  
    render() {
      let status ='';
      const winner = this.calculateWinner(this.state.squares);
      if(winner) {
        status = winner+' won';
      } else {
        status = 'Next player: '+ this.state.nextMove;
      }
      var boardData = [];
      for(let i=0; i<this.props.size; i++) {
        boardData.push(
          { 'row' : i, 'col': new Array(parseInt(this.props.size)).fill({'thisReference' : this})}
          );
      }
      var thisReference = this;
      var board = boardData.map( function(element) {
        var elements = [];  
        for(let j=0; j<element.col.length; j++) {
          elements.push(element.col[j].thisReference.renderSquare((element.row) * thisReference.props.size + j));
          //element.col[j].location = parseInt( (element.row) * size + j);
        }
        /*console.log('column',element.col);
        let elements = element.col.map( function(rowData) {
          return (rowData.thisReference.renderSquare(rowData.location));
        });*/
        return (
          <div className="board-row">
            { elements }
          </div>
        );
      });
      return (
        <div>
          <div className="status">{status}</div>
          {board}
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        };
    }
    renderGame1() {
      return (
        <div className="game">
          <div className="game-board">
            <Board size={this.state.boardSize}/>
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
    updateBoardSize(evt) {
        this.setState({
          boardSize: evt.target.value
        });
    }
    render() {
      if(!this.state.boardSize || this.state.boardSize < 1) {
        return (
          <input value={this.state.boardSize} onChange={evt => this.updateBoardSize(evt)}/>
        );
      } else {
        return (
          this.renderGame1()
        );
      }
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  