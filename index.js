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

const cellsGridHTML = (cellGrid) => {
  const newGrid = document.createElement("table");
  for (let xPosition = 0; xPosition < cellGrid; xPosition++) {
    const newColumn = document.createElement("td");
    for (let yPosition = 0; yPosition < cellGrid; yPosition++) {
      const newCell = document.createElement("tr");
      newCell.setAttribute("id", `${xPosition}, ${yPosition}`);
      newColumn.appendChild(newCell);
    }
    newGrid.appendChild(newColumn);
  }
  const currentDiv = document.getElementById("CellsGridHTML");
  document.body.insertBefore(newGrid, currentDiv);
};

const cells = allCells(20);

const checkNeighbours = (cellGrid) => {
  for (let xPosition = 0; xPosition < Math.sqrt(cellGrid.length); xPosition++) {
    for (
      let yPosition = 0;
      yPosition < Math.sqrt(cellGrid.length);
      yPosition++
    ) {
      const cellNow = cellGrid.find(
        (cell) => cell.x === xPosition && cell.y === yPosition
      );
      let aliveNeighbours = 0;
      if (
        typeof cellGrid.find(
          (cell) => cell.x === xPosition - 1 && cell.y === yPosition
        ) !== "undefined"
      ) {
        if (
          cellGrid.find(
            (cell) => cell.x === xPosition - 1 && cell.y === yPosition
          ).status
        ) {
          aliveNeighbours++;
        }
      }
      if (
        typeof cellGrid.find(
          (cell) => cell.x === xPosition + 1 && cell.y === yPosition
        ) !== "undefined"
      ) {
        if (
          cellGrid.find(
            (cell) => cell.x === xPosition + 1 && cell.y === yPosition
          ).status
        ) {
          aliveNeighbours++;
        }
      }
      if (
        typeof cellGrid.find(
          (cell) => cell.x === xPosition && cell.y === yPosition - 1
        ) !== "undefined"
      ) {
        if (
          cellGrid.find(
            (cell) => cell.x === xPosition && cell.y === yPosition - 1
          ).status
        ) {
          aliveNeighbours++;
        }
      }
      if (
        typeof cellGrid.find(
          (cell) => cell.x === xPosition && cell.y === yPosition + 1
        ) !== "undefined"
      ) {
        if (
          cellGrid.find(
            (cell) => cell.x === xPosition && cell.y === yPosition + 1
          ).status
        ) {
          aliveNeighbours++;
        }
      }
      if (
        typeof cellGrid.find(
          (cell) => cell.x === xPosition - 1 && cell.y === yPosition - 1
        ) !== "undefined"
      ) {
        if (
          cellGrid.find(
            (cell) => cell.x === xPosition - 1 && cell.y === yPosition - 1
          ).status
        ) {
          aliveNeighbours++;
        }
      }
      if (
        typeof cellGrid.find(
          (cell) => cell.x === xPosition - 1 && cell.y === yPosition + 1
        ) !== "undefined"
      ) {
        if (
          cellGrid.find(
            (cell) => cell.x === xPosition - 1 && cell.y === yPosition + 1
          ).status
        ) {
          aliveNeighbours++;
        }
      }
      if (
        typeof cellGrid.find(
          (cell) => cell.x === xPosition + 1 && cell.y === yPosition - 1
        ) !== "undefined"
      ) {
        if (
          cellGrid.find(
            (cell) => cell.x === xPosition + 1 && cell.y === yPosition - 1
          ).status
        ) {
          aliveNeighbours++;
        }
      }
      if (
        typeof cellGrid.find(
          (cell) => cell.x === xPosition + 1 && cell.y === yPosition + 1
        ) !== "undefined"
      ) {
        if (
          cellGrid.find(
            (cell) => cell.x === xPosition + 1 && cell.y === yPosition + 1
          ).status
        ) {
          aliveNeighbours++;
        }
      }
      cellNow.aliveCells = aliveNeighbours;
    }
  }
};

const checkNextCellStatus = (cellGrid) => {
  for (let xPosition = 0; xPosition < Math.sqrt(cellGrid.length); xPosition++) {
    for (
      let yPosition = 0;
      yPosition < Math.sqrt(cellGrid.length);
      yPosition++
    ) {
      const cellNow = cellGrid.find(
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

const gridWidth = 20;
cellsGridHTML();
allCells(gridWidth);
checkNeighbours(cells);
checkNextCellStatus(cells);
