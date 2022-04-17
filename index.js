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
    if (cellNow.y !== 0) {
      if (cellGrid[index - 1].status) {
        aliveNeighbours++;
      }
    }
    if (cellNow.x !== 0) {
      if (cellGrid[index - cellGridWidth].status) {
        aliveNeighbours++;
      }
    }

    if (cellNow.y !== cellGridWidth - 1) {
      if (cellGrid[index + 1].status) {
        aliveNeighbours++;
      }
    }

    if (cellNow.x !== cellGridWidth - 1) {
      if (cellGrid[index + cellGridWidth].status) {
        aliveNeighbours++;
      }
    }

    if (cellNow.x !== 0 && cellNow.y !== 0) {
      if (cellGrid[index - cellGridWidth - 1].status) {
        aliveNeighbours++;
      }
    }

    if (cellNow.x !== 0 && cellNow.y !== cellGridWidth - 1) {
      if (cellGrid[index - cellGridWidth + 1].status) {
        aliveNeighbours++;
      }
    }
    if (cellNow.y !== 0 && cellNow.x !== cellGridWidth - 1) {
      if (cellGrid[index + cellGridWidth - 1].status) {
        aliveNeighbours++;
      }
    }
    if (cellNow.x !== cellGridWidth - 1 && cellNow.y !== cellGridWidth - 1) {
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
        document
          .querySelector(`[id^='${index}']`)
          .classList.remove("td--alive");
        document.querySelector(`[id^='${index}']`).classList.add("td--dead");
      }
      if (cellNow.aliveNeighbours > 3) {
        cellNow.status = false;
        document
          .querySelector(`[id^='${index}']`)
          .classList.remove("td--alive");
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
let timer;
const executionTime = 100;

const startLife = () => {
  if (!stop) {
    timer = setTimeout(startLife, executionTime);
    checkNeighbours(cells);
    checkNextCellStatus(cells);
    document.getElementById("startLife").style.display = "none";
    document.getElementById("stopLife").style.display = "inline";
    document.getElementById("randomize").style.display = "none";
  }
};

const stopLife = () => {
  if (stop) {
    stop = false;
    document.getElementById("stopLife").innerHTML = "Parar el tiempo";
    startLife();
  } else {
    stop = true;
    document.getElementById("stopLife").innerHTML = "Continuar";
    clearInterval(timer);
  }
};

const createGrid = () => {
  if (document.getElementById("gridWidth").checkValidity()) {
    const gridWidth = document.getElementById("gridWidth").value;
    cells = allCells(gridWidth);
    cellsGridHTML(gridWidth);
    document.getElementById("buttons").style.display = "flex";
    document.getElementById("mainMenu").style.display = "none";
    stop = false;
  }
};

const backMenu = () => {
  document.getElementById("mainMenu").style.display = "flex";
  document.getElementById("buttons").style.display = "none";
  document.getElementById("cellGridContainer").remove();
  stop = true;
  document.getElementById("startLife").style.display = "";
  document.getElementById("stopLife").innerHTML = "Parar el tiempo";
  document.getElementById("gridWidth").value = "";
  document.getElementById("stopLife").style.display = "none";
  document.getElementById("randomize").style.display = "inline";
};

const onKeyUpGridWidth = () => {
  const width = document.getElementById("gridWidth").value;

  if (width < 0) {
    document.getElementById("gridWidth").value = "3";
  }
  if (width > 80) {
    document.getElementById("gridWidth").value = "80";
  }
};

const onChangeGridWidth = () => {
  const width = document.getElementById("gridWidth").value;

  if (width < 3) {
    document.getElementById("gridWidth").value = "3";
  }
};

const randomizeCells = () => {
  for (let index = 0; index < cells.length; index++) {
    const randomZeroOrOne = Math.round(Math.random());
    if (randomZeroOrOne === 1) {
      cells[index].status = true;
      document.querySelector(`[id^='${index}']`).classList.remove("td--dead");
      document.querySelector(`[id^='${index}']`).classList.add("td--alive");
    }
  }
};

window.onload = () => {
  document.getElementById("stopLife").addEventListener("click", stopLife);
  document
    .getElementById("randomize")
    .addEventListener("click", randomizeCells);
  document.getElementById("startLife").addEventListener("click", startLife);
  document.getElementById("createGrid").addEventListener("click", createGrid);
  document.getElementById("backMenu").addEventListener("click", backMenu);
  document
    .getElementById("gridWidth")
    .addEventListener("keyup", onKeyUpGridWidth);
  document
    .getElementById("gridWidth")
    .addEventListener("change", onChangeGridWidth);
};
