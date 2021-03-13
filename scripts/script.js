//Main
const slider = document.querySelector(".slider");
const value = document.querySelector(".value");
const displayValue = document.createElement('div');

let drawing = false;

//Disable dragging in window
//This is done to avoid accidently dragging grid cells while drawing.
window.ondragstart = function() { return false; };

//Display the default grid value
displayValue.textContent = "Value: " + slider.value;
value.appendChild(displayValue);

//Render the default grid
const defaultGridSize = slider.value;
createGrid(defaultGridSize);
draw();

//Render the resized grid and updated grid value
slider.addEventListener('input', function() {
  clearGrid();
  createGrid(this.value);
  displayValue.textContent = "Value: " + this.value;
  draw();
});

//clear the grid
const clear = document.querySelector(".clear");
clear.addEventListener('click', clearGridSketch);

/*-------------------------------------------*/

//Functions
function createGrid(gridSize) {
  const grid = document.querySelector(".grid");
  
  for (let i = 0; i < gridSize*gridSize; i++) {
    const gridCell = document.createElement("div");
    gridCell.classList.add("grid-cell");
    grid.appendChild(gridCell);
  }
    
  grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
}
 
function toggleDraw() {
  document.addEventListener('mousedown', function() {drawing = true});
  document.addEventListener('mouseup', function() {drawing = false});
}

function draw() {
  const gridCells = document.querySelectorAll(".grid-cell");
  toggleDraw();
  gridCells.forEach(gridCell => {
    gridCell.addEventListener('mouseover', function(e) {
      if (drawing === true) {
        e.target.classList.add("ink");
      }
    });
  });
}

function clearGridSketch() {
    const gridCells = document.querySelectorAll(".grid-cell")
    gridCells.forEach(function(gridCell) {
      gridCell.classList.remove("ink");
    });
}

function clearGrid() {
  const gridCells = document.querySelectorAll(".grid-cell");
  gridCells.forEach(function(gridCell) {
    gridCell.remove();
  });
}
