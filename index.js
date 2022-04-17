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
  const cellClicked = this.id.split(",");
  const xPositionClicked = parseInt(cellClicked[0], 10);
  const yPositionClicked = parseInt(cellClicked[1], 10);
  const cellToLive = cells.find(
    (cell) => cell.x === xPositionClicked && cell.y === yPositionClicked
  );
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
  for (let xPosition = 0; xPosition < cellGrid; xPosition++) {
    const newColumn = document.createElement("tr");
    for (let yPosition = 0; yPosition < cellGrid; yPosition++) {
      const newCell = document.createElement("td");
      newCell.setAttribute("id", `${xPosition}, ${yPosition}`);
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
      cellNow.aliveNeighbours = aliveNeighbours;
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
          document
            .getElementById(`${xPosition}, ${yPosition}`)
            .classList.remove("td--alive");
          document
            .getElementById(`${xPosition}, ${yPosition}`)
            .classList.add("td--dead");
        }
        if (cellNow.aliveNeighbours > 3) {
          cellNow.status = false;
          document
            .getElementById(`${xPosition}, ${yPosition}`)
            .classList.remove("td--alive");
          document
            .getElementById(`${xPosition}, ${yPosition}`)
            .classList.add("td--dead");
        }
      }
      if (!cellNow.status) {
        if (cellNow.aliveNeighbours === 3) {
          cellNow.status = true;
          document
            .getElementById(`${xPosition}, ${yPosition}`)
            .classList.remove("td--dead");
          document
            .getElementById(`${xPosition}, ${yPosition}`)
            .classList.add("td--alive");
        }
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

const executionTime = 50;

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
