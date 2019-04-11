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
          console.log(props);
          this.state = { 
                squares : Array(props.size*props.size).fill(null),
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

    generateWinCombinations(sizeParam) {
        let winningCombinations = [];
        let diag1 = [];
        let diag2 = [];
        let size = parseInt(sizeParam);
        let combVertical = new Array(size).fill(0).map(() => new Array(size).fill(0));
        console.log(combVertical);
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
      var winningCombins = this.generateWinCombinations(this.props.size);
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
      var boardData = [];
      for(let i=0; i<this.props.size; i++) {
        boardData.push(
          { 'row' : i, 'col': new Array(parseInt(this.props.size)).fill({'thisReference' : this})}
          );
      }
      console.log('boardDATA',boardData);
      var thisReference = this;
      var board = boardData.map( function(element) {
        var elements = [];  
        for(let j=0; j<element.col.length; j++) {

          console.log('j',j);
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
        console.log(this.state.boardSize);
    }
    render() {
      console.log(this.state.boardSize);
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
  