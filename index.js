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

allCells(20);
