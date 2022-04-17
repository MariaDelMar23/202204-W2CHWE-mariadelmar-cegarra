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
  return allCellsGrid
};

function bornCellsClick(){
  const cellClicked = this.id.split(",");
  const xPositionClicked = parseInt(cellClicked[0], 10);
  const yPositionClicked = parseInt(cellClicked[1], 10);
  const cellToLive = allCells.find((cell) => cell.x === xPositionClicked && cell.y === yPositionClicked);
  cellToLive.status = true
};

const cellsGridHTML = (cellGrid) => {
  const initialGrid = document.getElementById("cellGridContainer");
  if (initialGrid !== null) {
    initialGrid.innerHTML = "";
  }
  const newGrid = document.createElement("table");
  newGrid.setAttribute("id", "cellGridContainer");
  for (let xPosition = 0; xPosition < cellGrid; xPosition++) {
    const newColumn = document.createElement("tr");
    for (let yPosition = 0; yPosition < cellGrid; yPosition++) {
      const newCell = document.createElement("td");
      newCell.setAttribute("id", `${xPosition}, ${yPosition}`);
      newCell.onclick = bornCellsClick;
      newColumn.appendChild(newCell);
    }
    newGrid.appendChild(newColumn);
  }
  const currentDiv = document.getElementById("cellsGridHTML");
  currentDiv.appendChild(newGrid);
};

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

const stopLife = () => false;

const createGrid = () => {
  const gridWidth = document.getElementById("gridWidth").value;
  allCells(gridWidth);
  cellsGridHTML(gridWidth);
};

const startLife = () => {
  const gridWidth = document.getElementById("gridWidth").value;
  const cells = allCells(gridWidth);
  do {
    checkNeighbours(cells);
    checkNextCellStatus(cells);
  } while (stopLife());
};

createGrid();
startLife();
