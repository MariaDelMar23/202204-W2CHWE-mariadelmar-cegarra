class Cell {
  x;
  y;
  status = false;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const allCells = (cellGrid) => {
  const allCellsGrid = [];
  let cellPosition;
  for (let xPosition = 0; xPosition < cellGrid; xPosition++) {
    for (let yPosition = 0; yPosition < cellGrid; yPosition++) {
      cellPosition = new Cell(xPosition, yPosition);
      allCellsGrid.push(cellPosition);
    }
  }
  return allCellsGrid;
};

const checkNeighbours = (cells) => {
  for (let xPosition = 0; xPosition < Math.sqrt(cells.length); xPosition++) {
    for (let yPosition = 0; yPosition < Math.sqrt(cells.length); yPosition++) {
      let aliveCells = 0;
      if (
        cells.find((cell) => cell.x === xPosition - 1 && cell.y === yPosition)
          .status
      ) {
        aliveCells++;
      }
      if (
        cells.find((cell) => cell.x === xPosition + 1 && cell.y === yPosition)
          .status
      ) {
        aliveCells++;
      }
      if (
        cells.find((cell) => cell.x === xPosition && cell.y === yPosition - 1)
          .status
      ) {
        aliveCells++;
      }
      if (
        cells.find((cell) => cell.x === xPosition && cell.y === yPosition + 1)
          .status
      ) {
        aliveCells++;
      }
      if (
        cells.find((cell) => cell.x === xPosition - 1 && cell.y === yPosition)
          .status
      ) {
        aliveCells++;
      }
      if (
        cells.find(
          (cell) => cell.x === xPosition - 1 && cell.y === yPosition - 1
        ).status
      ) {
        aliveCells++;
      }
      if (
        cells.find(
          (cell) => cell.x === xPosition - 1 && cell.y === yPosition + 1
        ).status
      ) {
        aliveCells++;
      }
      if (
        cells.find(
          (cell) => cell.x === xPosition + 1 && cell.y === yPosition - 1
        ).status
      ) {
        aliveCells++;
      }
      if (
        cells.find(
          (cell) => cell.x === xPosition + 1 && cell.y === yPosition + 1
        ).status
      ) {
        aliveCells++;
      }
      cellNow.aliveCells = aliveCells;
    }
  }
};

checkNeighbours();
