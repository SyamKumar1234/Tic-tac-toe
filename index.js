let welcomeContainer = document.querySelector(".welcome-container");
let mainContainer = document.querySelector("#main-container");
let gridContainer = document.querySelector(".grid-container");
let startWithFriendButton = document.getElementsByClassName("button-start")[0];
let startWithComputerButton =
  document.getElementsByClassName("button-start")[1];
let fireworks;
document.querySelector("#main-container h3").innerText = "Player X turn";
let playerOne = true;
let step = 0;
let playerOneSelected = "";
let playerTwoSelected = "";
let computerSelected = "";
let isPlayerOneWon = false;
let isPlayerTwoWon = false;
let isComputerwon = false;
let isDraw = false;
let isPlayWithComputer = false;
let winConditions = ["123", "456", "789", "147", "258", "369", "159", "357"];

document.querySelector(".card-container").style.display = "none";
document.querySelector("#restart-button").style.visibility = "hidden";
mainContainer.style.display = "none";

[startWithFriendButton, startWithComputerButton].forEach((button) => {
  button.addEventListener("click", () => {
    if (button == startWithComputerButton) {
      isPlayWithComputer = true;
    }

    console.log(welcomeContainer);
    welcomeContainer.style.display = "none";
    mainContainer.style.display = "flex";
    document.body.style.background =
      "url('./assets/kids2.jpg') no-repeat center fixed";
    document.body.style.backgroundSize = "100% 100%";
    // document.body.style.transition = 'background ease-in 1s'

    appendGridItemsToGridContainer();
    handleGridItemClick();
  });
});

function appendGridItemsToGridContainer() {
  for (let i = 0; i < 9; i++) {
    let gridElem = document.createElement("div");
    let p = document.createElement("p");
    gridElem.appendChild(p);
    gridElem.className = "grid-item";
    gridElem.id = `cell-${i + 1}`;
    gridContainer.appendChild(gridElem);
  }
}

function handleGridItemClick() {
  let nodes = gridContainer.querySelectorAll(".grid-item");
  nodes.forEach((node, index) => {
    node.addEventListener("click", () => {
      placemarker(node, index + 1);
      processClick();
      showPlayerStatus();
      //in computer mode next move will be by the computer.
      if (isPlayWithComputer && !isPlayerOneWon && !isPlayerTwoWon && step !=9) {
        disableCells();
        setTimeout(() => {
          makeComputerMove();
          enableCells();
          processClick();
          showPlayerStatus();
        }, 500);
      }
    });
  });
  console.log(nodes);
}

function placemarker(node, index) {
  if (
    !node.children[0].innerHTML &&
    !isPlayerOneWon &&
    !isPlayerTwoWon &&
    !isDraw
  ) {
    if (step % 2 == 0) {
      node.children[0].innerHTML = "x";
      step = step + 1;
      playerOneSelected = playerOneSelected.concat(index);
      console.log(playerOneSelected);
    } else {
      node.children[0].innerHTML = "o";
      step = step + 1;
      playerTwoSelected = playerTwoSelected.concat(index);
      console.log(playerTwoSelected);
    }
  }
}

function makeComputerMove() {
  const cells = Array.from(document.querySelectorAll(".grid-item"));
  const randomPosition = findRandomCellPosition();
  console.log("randomPosition", randomPosition);

  cells[randomPosition].children[0].innerHTML = "o";
  step = step + 1;

  computerSelected = computerSelected.concat(randomPosition + 1);
  console.log("computerSelected",computerSelected);
  
}

function findRandomCellPosition() {
  const cells = Array.from(document.querySelectorAll(".grid-item"));
  const emptyCells = cells.filter(cell => cell.children[0].innerHTML == "")
  const randomPosition = Math.floor(Math.random() * (emptyCells.length - 1));
  return cells.indexOf(emptyCells[randomPosition]);
}
//1,3,4
function processClick() {
  if (step <= 4) {
    return;
  }
  if (step % 2 == 0) {
    if(isPlayWithComputer) {
      isComputerwon = winConditions.some(win => {
        return win.split("").every(letter => computerSelected.includes(letter))
      }) 
    }
    else {
      isPlayerTwoWon = winConditions.some(win => {
        return win.split("").every(letter => playerTwoSelected.includes(letter))
      }) 
    }
    
  } else {
    isPlayerOneWon = winConditions.some(win => {
      return win.split("").every(letter => playerOneSelected.includes(letter))
    }) 

  }

  if (isPlayerOneWon || isPlayerTwoWon || isComputerwon || step == 9) {
    const resultCard = document.getElementsByClassName("card")[0];
    resultCard.style.background = "green";
    document.querySelector(".card-container").style.display = "block";
    document.querySelector("#restart-button").style.visibility = "visible";
    if (isPlayerOneWon) {
      document.querySelector(".card p").innerHTML = "Player X Won";
      showFireworks();
    } else if (isPlayerTwoWon) {
      document.querySelector(".card p").innerHTML = "Player O Won";
      showFireworks();
    } else if(isComputerwon) {
      document.querySelector(".card p").innerHTML = "Computer Won😥";
      resultCard.style.background = "orangered";
    }
    else if (!isPlayerOneWon && !isPlayerTwoWon && step == 9) {
      isDraw = true;
      document.querySelector(".card p").innerHTML = "It's a Draw";
      resultCard.style.background = "blue";
    }
  }
}

function showPlayerStatus() {
  let status = "";
  let statusHeading = document.querySelector("#main-container h3");
  if (step % 2 == 0) {
    status = "Player X turn";
  } else {
    status = "Player O turn";
  }
  statusHeading.innerText = status;
}

document.querySelector("#restart-button").addEventListener("click", () => {
  document.querySelector(".card-container").style.display = "none";
  document.querySelector("#restart-button").style.visibility = "hidden";
  document.querySelector("#main-container h3").innerText = "Player X turn";

  if (fireworks) {
    fireworks.stop();
    // fireworks.clear();
  }
  let nodes = gridContainer.querySelectorAll(".grid-item");
  nodes.forEach((node, index) => {
    node.children[0].innerHTML = "";
  });
  playerOne = true;
  step = 0;
  playerOneSelected = "";
  playerTwoSelected = "";
  isPlayerOneWon = false;
  isPlayerTwoWon = false;
  isDraw = false;
});

function showFireworks() {
  // const sound = { enabled: true}
  if (!fireworks) {
    const container = document.querySelector(".fireworks");
    fireworks = new Fireworks.default(container, {
      autoresize: true,
      opacity: 0.5,
      acceleration: 1.05,
      friction: 0.97,
      gravity: 1.5,
      particles: 50,
      traceLength: 3,
      traceSpeed: 10,
      explosion: 5,
      intensity: 30,
      flickering: 50,
      lineStyle: "round",
      hue: {
        min: 0,
        max: 360,
      },
      delay: {
        min: 30,
        max: 60,
      },
      rocketsPoint: {
        min: 50,
        max: 50,
      },
      lineWidth: {
        explosion: {
          min: 1,
          max: 3,
        },
        trace: {
          min: 1,
          max: 2,
        },
      },
      brightness: {
        min: 50,
        max: 80,
      },
      decay: {
        min: 0.015,
        max: 0.03,
      },
      mouse: {
        click: false,
        move: false,
        max: 1,
      },
    });
    fireworks.start();
  } else {
    fireworks.start();
  }
}

function enableCells() {
  document.querySelectorAll(".grid-item").forEach((cell) => {
    cell.classList.remove("disabled");
  });
}
function disableCells() {
  document.querySelectorAll(".grid-item").forEach((cell) => {
    cell.classList.add("disabled");
  });
}
