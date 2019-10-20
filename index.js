const gameHolder = document.querySelector("#game");
let rows = gameHolder.children;
const relatedElements = [];
const elemsWithTheSameClass = [];

function createGameBoard(numbersOfColumns = 5) {
  for (y = 0; y < numbersOfColumns; y++) {
    gameHolder.appendChild(createRow(6));
  };
};

function createRow(numbersOfElementsInsideRow = 4) {
  const rowHolder = document.createElement("div");
  rowHolder.classList.add("row");
  for (i = 0; i < numbersOfElementsInsideRow; i++) {
    const randomNumber = Math.round(Math.random() * 3) + 1;
    let classToApply;
    if (randomNumber === 1) {
      classToApply = "blue";
    } else if (randomNumber === 2) {
      classToApply = "grey";
    } else if (randomNumber === 3) {
      classToApply = "white";
    } else if (randomNumber === 4) {
      classToApply = "salmon";
    };
    let gameBlock = document.createElement("div");
    gameBlock.classList.add("particularBlock", classToApply);
    gameBlock.addEventListener("click", triggerGame);
    rowHolder.appendChild(gameBlock);
  }
  return rowHolder;
}

function findRelatedBlocks(clickedElem) {
  rows = Array.prototype.slice.call(rows);
  let currentBlockIndex;
  let currentRowIndex;
  let currentRow;

  rows.forEach(r => {
    if (r === clickedElem.parentElement) {
      currentRow = rows[rows.indexOf(r)].children;
      currentRowIndex = rows.indexOf(r);
    }
  });

  currentRow = Array.prototype.slice.call(currentRow);

  currentRow.forEach(b => {
    currentBlockIndex = currentRow.indexOf(b);
    const rowBefore = currentRow[currentRow.indexOf(b) - 1];
    rowAfter = currentRow[currentRow.indexOf(b) + 1];
    blockBefore = rows[currentRowIndex - 1];
    blockAfter = rows[currentRowIndex + 1];

    if (b === clickedElem) {
      checkIfElementAlreadyChecked(currentRow[currentBlockIndex]);
      if (rowBefore) {
        checkIfElementAlreadyChecked(rowBefore);
      }
      if (rowAfter) {
        checkIfElementAlreadyChecked(rowAfter);
      }
      if (blockBefore) {
        checkIfElementAlreadyChecked(blockBefore.children[currentBlockIndex]);
      }
      if (blockAfter) {
        checkIfElementAlreadyChecked(blockAfter.children[currentBlockIndex]);
      }
      pushToArrayIfTheSameClass(currentRow[currentBlockIndex].classList[1]);
    }
  });
};

function pushToArrayIfTheSameClass(color) {
  const temporarySameElems = [];
  for (t = 0; t < relatedElements.length; t++) {
    if (relatedElements[t].classList[1] === color) {
      relatedElements[t].classList.add("checked");
      temporarySameElems.push(relatedElements[t]);
      elemsWithTheSameClass.push(relatedElements[t]);
    };
  };
  relatedElements.splice(0);
  if (temporarySameElems.length != 0) {
    findRelatedBlocks(temporarySameElems[temporarySameElems.length - 1])
    for (y = 0; y < temporarySameElems.length; y++) {
      findRelatedBlocks(temporarySameElems[y]);
    };
  } else {
    for (r = 0; r < elemsWithTheSameClass.length; r++) {
      elemsWithTheSameClass[r].classList.add("red");
    };
    elemsWithTheSameClass.splice(0);
  };
};

function checkIfElementAlreadyChecked(elem) {
  if (!elem.classList.contains("checked")) {
    relatedElements.push(elem);
  } else {
    return;
  }
};

function triggerGame(e) {
  findRelatedBlocks(e.target);
};

createGameBoard(6);
