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

let cells;

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

function bornCellsClick() {
  const cellClicked = this.id.split("_");
  const indexClicked = parseInt(cellClicked[0], 10);
  const cellToLive = cells[indexClicked];
  if (this.className === "td--dead") {
    this.className = "td--alive";
    cellToLive.status = true;
  } else {
    this.className = "td--dead";
    cellToLive.status = false;
  }
}

const cellsGridHTML = (cellGrid) => {
  const initialGrid = document.getElementById("cellGridContainer");
  if (initialGrid !== null) {
    initialGrid.innerHTML = "";
  }
  const newGrid = document.createElement("table");
  newGrid.setAttribute("id", "cellGridContainer");
  let cellIndex = 0;
  for (let xPosition = 0; xPosition < cellGrid; xPosition++) {
    const newColumn = document.createElement("tr");
    for (let yPosition = 0; yPosition < cellGrid; yPosition++) {
      const newCell = document.createElement("td");
      newCell.setAttribute("id", `${cellIndex++}_${xPosition}, ${yPosition}`);
      newCell.setAttribute("class", "td--dead");
      newCell.onclick = bornCellsClick;
      newColumn.appendChild(newCell);
    }
    newGrid.appendChild(newColumn);
  }
  const currentDiv = document.getElementById("cellsGridHTML");
  currentDiv.appendChild(newGrid);
};

const checkNeighbours = (cellGrid) => {
  const cellGridWidth = Math.sqrt(cellGrid.length);
  for (let index = 0; index < cellGrid.length; index++) {
    const cellNow = cellGrid[index];
    let aliveNeighbours = 0;
    if (typeof cellGrid[index - 1] !== "undefined") {
      if (cellGrid[index - 1].status) {
        aliveNeighbours++;
      }
    }
    if (typeof cellGrid[index - cellGridWidth] !== "undefined") {
      if (cellGrid[index - cellGridWidth].status) {
        aliveNeighbours++;
      }
    }

    if (typeof cellGrid[index + 1] !== "undefined") {
      if (cellGrid[index + 1].status) {
        aliveNeighbours++;
      }
    }

    if (typeof cellGrid[index + cellGridWidth] !== "undefined") {
      if (cellGrid[index + cellGridWidth].status) {
        aliveNeighbours++;
      }
    }

    if (typeof cellGrid[index - cellGridWidth - 1] !== "undefined") {
      if (cellGrid[index - cellGridWidth - 1].status) {
        aliveNeighbours++;
      }
    }

    if (typeof cellGrid[index - cellGridWidth + 1] !== "undefined") {
      if (cellGrid[index - cellGridWidth + 1].status) {
        aliveNeighbours++;
      }
    }
    if (typeof cellGrid[index + cellGridWidth - 1] !== "undefined") {
      if (cellGrid[index + cellGridWidth - 1].status) {
        aliveNeighbours++;
      }
    }
    if (typeof cellGrid[index + cellGridWidth + 1] !== "undefined") {
      if (cellGrid[index + cellGridWidth + 1].status) {
        aliveNeighbours++;
      }
    }
    cellNow.aliveNeighbours = aliveNeighbours;
  }
};

const checkNextCellStatus = (cellGrid) => {
  for (let index = 0; index < cellGrid.length; index++) {
    const cellNow = cellGrid[index];
    if (cellNow.status) {
      if (cellNow.aliveNeighbours < 2) {
        cellNow.status = false;
        document.querySelector(`[id^='${index}']`).classList.remove("td--alive");
        document.querySelector(`[id^='${index}']`).classList.add("td--dead");
      }
      if (cellNow.aliveNeighbours > 3) {
        cellNow.status = false;
        document.querySelector(`[id^='${index}']`).classList.remove("td--alive");
        document.querySelector(`[id^='${index}']`).classList.add("td--dead");
      }
    }
    if (!cellNow.status) {
      if (cellNow.aliveNeighbours === 3) {
        cellNow.status = true;
        document.querySelector(`[id^='${index}']`).classList.remove("td--dead");
        document.querySelector(`[id^='${index}']`).classList.add("td--alive");
      }
    }
  }
};

let stop = false;
const stopLife = () => {
  if (stop) {
    stop = false;
  } else {
    stop = true;
  }
};

const executionTime = 100;

const createGrid = () => {
  const gridWidth = document.getElementById("gridWidth").value;
  cells = allCells(gridWidth);
  cellsGridHTML(gridWidth);
};

const startLife = () => {
  checkNeighbours(cells);
  checkNextCellStatus(cells);
  if (!stop) {
    setTimeout(startLife, executionTime);
  }
};

Window.onload = () => {
  document.getElementById("stopLife").addEventListener("click", stopLife());
  document.getElementById("startLife").addEventListener("click", startLife());
  document.getElementById("createGrid").addEventListener("click", createGrid());
};
