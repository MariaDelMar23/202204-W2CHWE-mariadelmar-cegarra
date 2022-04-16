class Cell {
  x;
  y;
  status = false;
  aliveNeighbours;

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
      const cellNow = cells.find(
        (cell) => cell.x === xPosition && cell.y === yPosition
      );
      let aliveNeighbours = 0;
      if (
        cells.find((cell) => cell.x === xPosition - 1 && cell.y === yPosition)
          .status
      ) {
        aliveNeighbours++;
      }
      if (
        cells.find((cell) => cell.x === xPosition + 1 && cell.y === yPosition)
          .status
      ) {
        aliveNeighbours++;
      }
      if (
        cells.find((cell) => cell.x === xPosition && cell.y === yPosition - 1)
          .status
      ) {
        aliveNeighbours++;
      }
      if (
        cells.find((cell) => cell.x === xPosition && cell.y === yPosition + 1)
          .status
      ) {
        aliveNeighbours++;
      }
      if (
        cells.find((cell) => cell.x === xPosition - 1 && cell.y === yPosition)
          .status
      ) {
        aliveNeighbours++;
      }
      if (
        cells.find(
          (cell) => cell.x === xPosition - 1 && cell.y === yPosition - 1
        ).status
      ) {
        aliveNeighbours++;
      }
      if (
        cells.find(
          (cell) => cell.x === xPosition - 1 && cell.y === yPosition + 1
        ).status
      ) {
        aliveNeighbours++;
      }
      if (
        cells.find(
          (cell) => cell.x === xPosition + 1 && cell.y === yPosition - 1
        ).status
      ) {
        aliveNeighbours++;
      }
      if (
        cells.find(
          (cell) => cell.x === xPosition + 1 && cell.y === yPosition + 1
        ).status
      ) {
        aliveNeighbours++;
      }
      cellNow.aliveCells = aliveNeighbours;
    }
  }
};

const checkNextCellStatus = (cells) => {
  for (let xPosition = 0; xPosition < Math.sqrt(cells.length); xPosition++) {
    for (let yPosition = 0; yPosition < Math.sqrt(cells.length); yPosition++) {
      const cellNow = cells.find(
        (cell) => cell.x === xPosition && cell.y === yPosition
      );
      if (cellNow.status) {
        if (cellNow.aliveNeighbours < 2) {
          cellNow.status = false;
        }
        if (cellNow.aliveNeighbours > 3) {
          cellNow.status = false;
        }
      }
      if (!cellNow.status) {
        if (cellNow.aliveNeighbours === 3) {
          cellNow.status = true;
        }
      }
    }
  }
};

allCells();
checkNeighbours();
checkNextCellStatus();
