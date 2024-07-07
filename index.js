let welcomeSection = document.querySelector('.welcome-section');
let mainContainer = document.querySelector('#main-container');
let gridContainer = document.querySelector('.grid-container');
let startButton = document.querySelector('#button-start');
let playerOne = true;
let step = 0;
let playerOneSelected = '';
let playerTwoSelected = '';
let isPlayerOneWon = false;
let isPlayerTwoWon = false;
let isDraw = false;
let winConditions = ['123', '456', '789', '147', '258', '369', '159', '357'];

document.querySelector('.card-container').style.display = 'none'
document.querySelector('#restart-button').style.display = 'none'
mainContainer.style.display = 'none'
startButton.addEventListener('click', () => {
    console.log(welcomeSection);
    welcomeSection.style.display = 'none'
    mainContainer.style.display = 'flex'
    document.body.style.background = "url('./assets/kids2.jpg') no-repeat center fixed"
    document.body.style.backgroundSize = "100% 100%";
    document.body.style.transition = 'background ease-in 1s'

    appendGridItemsToGridContainer();
    handleGridItemClick();

})

function appendGridItemsToGridContainer() {
    for (let i = 0; i < 9; i++) {
        let gridElem = document.createElement('div');
        let p = document.createElement('p');
        gridElem.appendChild(p)
        gridElem.className = 'grid-item';
        gridContainer.appendChild(gridElem);
    }
}

function handleGridItemClick() {
    let nodes = gridContainer.querySelectorAll('.grid-item');
    nodes.forEach((node, index) => {
        node.addEventListener('click', () => {
            placemarker(node, index + 1);
            processClick(nodes, node, index);
        })
    })
    console.log(nodes);
}

function placemarker(node, index) {
    if (!node.children[0].innerHTML && !isPlayerOneWon && !isPlayerTwoWon && !isDraw) {
        if (step % 2 == 0) {
            node.children[0].innerHTML = 'x'
            step = step + 1
            playerOneSelected = playerOneSelected.concat(index);
            console.log(playerOneSelected);
        }
        else {
            node.children[0].innerHTML = 'o'
            step = step + 1;
            playerTwoSelected = playerTwoSelected.concat(index);
            console.log(playerTwoSelected);
        }
    }
}
//1,3,4
function processClick(nodes, node, index) {

    if (step <= 4) {
        return;
    }
    if (step % 2 == 0) {
        let selected = playerTwoSelected.split('').sort().join('');
        let check = winConditions.includes(selected);
        if (!check) {

            for (let win of winConditions) {
                let winArray = win.split('');
                let flag = 0;

                for (let elem of winArray) {
                    if (!selected.includes(elem)) {
                        flag = 0;
                        break;
                    }
                    else {
                        flag = 1;
                    }
                }
                if (flag == 1) {
                    isPlayerTwoWon = true
                    break;
                }
            }
        }
        else {
            isPlayerTwoWon = true;
        }
    }
    else {
        let selected = playerOneSelected.split('').sort().join('');
        let check = winConditions.includes(selected);
        if (!check) {

            for (let win of winConditions) {
                let winArray = win.split('');
                let flag = 0;

                for (let elem of winArray) {
                    if (!selected.includes(elem)) {
                        flag = 0;
                        break;
                    }
                    else {
                        flag = 1;
                    }
                }
                if (flag == 1) {
                    isPlayerOneWon = true
                    break;
                }
            }
            console.log(isPlayerOneWon);
        }
        else {
            isPlayerOneWon = true
        }
        console.log(playerOneSelected.split('').sort().join(''));
    }

    if(isPlayerOneWon || isPlayerTwoWon || step ==9) {
        document.querySelector('.card-container').style.display = 'block'
        document.querySelector('#restart-button').style.display = 'block'
        if (isPlayerOneWon) {
            document.querySelector('.card p').innerHTML = 'Player 1 Won';
        }
        else if (isPlayerTwoWon) {
            document.querySelector('.card p').innerHTML = 'Player 2 Won';
        }
        else if(!isPlayerOneWon && !isPlayerTwoWon && step ==9) {
            isDraw = true;
            document.querySelector('.card p').innerHTML = "It's a Draw";
        }
    }
  


}

document.querySelector('#restart-button').addEventListener('click', () => {
    document.querySelector('.card-container').style.display = 'none';
    document.querySelector('#restart-button').style.display = 'none';

    let nodes = gridContainer.querySelectorAll('.grid-item');
    nodes.forEach((node, index) => {
        node.children[0].innerHTML = ""
    })
    playerOne = true;
    step = 0;
    playerOneSelected = '';
    playerTwoSelected = '';
    isPlayerOneWon = false;
    isPlayerTwoWon = false;
    isDraw = false;

})





