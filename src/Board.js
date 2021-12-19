/** @format */

import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());
  console.log(board);

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    function getRandomLight() {
      return Math.random() < chanceLightStartsOn ? true : false;
    }
    let initialBoard = [];
    for (let i = 0; i < nrows; i++) {
      initialBoard.push([]);
      for (let j = 0; j < ncols; j++) {
        initialBoard[i].push(getRandomLight());
      }
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    let offLights = [];
    let onLights = [];
    for (let i = 0; i < nrows; i++) {
      for (let j = 0; j < ncols; j++) {
        board[i][j] === false
          ? offLights.push(`Off at: board[${[i]}-${[j]}]`)
          : onLights.push(`On at: board[${[i]}-${[j]}]`);
      }
    }
    return onLights.length === 0 ? true : false;
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let boardCopy = [...oldBoard];

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y - 1, x, boardCopy);

      // TODO: return the copy
      return boardCopy;
    });
  }

  // TODO
  // if the game is won, just show a winning msg & render nothing else
  if (hasWon() === true) {
    return (
      <div>
        <h4>YOU WON!</h4>
      </div>
    );
  }

  // TODO
  // make table board

  function renderTableData() {
    return board.map((x, xidx) => {
      return (
        <tr>
          {x.map((y, yidx) => {
            return (
              <Cell
                isLit={y}
                flipCellsAroundMe={() => flipCellsAround(`${xidx}-${yidx}`)}
              />
            );
          })}
        </tr>
      );
    });
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th colSpan={ncols}>Lights Out!</th>
          </tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </table>
    </div>
  );
}

export default Board;
