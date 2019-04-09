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
                squares : Array(16).fill(null),
                nextMove: 'X'
            };
      }
    handleClick(i) {
        const squares = this.state.squares.slice();
        //console.log(this.state);
        if(this.calculateWinner(this.state.squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.nextMove;
        this.setState({squares :squares, nextMove : (this.state.nextMove === 'X') ? '0': 'X'});
    }

    generateWinCombinations(size) {
        let winningCombinations = [];
        let diag1 = [];
        let diag2 = [];
        let combVertical = new Array(size).fill(0).map(() => new Array(size).fill(0));
        for(var i = 0 ; i < size; i++) {
          let combHorizantal = [];
          for(var j = 0 ; j < size; j++) {
            combVertical[j][i] = i*size+j;
            combHorizantal.push(i*size+j);
            if(i === j) diag1.push(i*size+j);
            if(i+j === size-1) diag2.push(i*size+j);
          }
          if(i === 0) console.log('Vertical',combVertical);
          winningCombinations.push(combHorizantal);
        }
        winningCombinations.push(diag1,diag2, ...combVertical);
        console.log(winningCombinations);
        return winningCombinations;
    }

    calculateWinner(squares) {
      var winningCombins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [6,4,2]
      ];
      winningCombins = this.generateWinCombinations(4);
      let winner = null;
      for(let k=0; k < winningCombins.length; k++ ) {
        for(let m = 0; winningCombins[k].length; m++) {
          if(winningCombins[k][0] && winningCombins[k][0] === winningCombins[k][m]) {
            winner = winningCombins[k][0];
          } else {
            return null;
          }
        }
      }
      return winner;
    }
    renderSquare(i) {
      console.log('render'+i);
      return (<Square value={this.state.squares[i]} onClick={ () => this.handleClick(i)}/>);
    }
  
    render() {
      let status ='';
      const winner = this.calculateWinner(this.state.squares);
      if(winner) {
        status = winner+' won';
      } else {
        status = 'Next player: X';
      }
      let size = 4;
      var boardData = [];
      for(let i=0; i<size; i++) {
        boardData.push(
          { 'row' : i, 'col': Array(size).fill({'thisReference' : this})}
          );
      }
      console.log('boardDATA',boardData);
      var board = boardData.map( function(element) {
        var elements = []; 
        for(let j=0; j<element.col.length; j++) {

          console.log('j',j);
          elements.push(element.col[j].thisReference.renderSquare((element.row) * size + j));
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
      console.log('board',board);
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
            history : [{squares : Array(9).fill(null)}],
            nextMove: 'X'
        };
    }
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  