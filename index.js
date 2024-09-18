const addWordBtn = document.querySelector(".addWordBtn");
const input = document.querySelector("#inputTxt");

const resultsConteiner = document.querySelector(".resultsConteiner");
const wordBoxRow = resultsConteiner.querySelector(".wordBoxRow");
const deleteEverythink = document.querySelector(".deleteEverythink");
// Left side of box
const wordBoxRowLeft = wordBoxRow.querySelector(".wordBoxRowLeft");
const number = wordBoxRowLeft.querySelector(".number");
const russianWord = wordBoxRowLeft.querySelector(".russianWord");
// Right side of box
const wordBoxRowRight = wordBoxRow.querySelector(".wordBoxRowRight");
const translitWord = wordBoxRowRight.querySelector(".translitWord");
const deleteWordBtn = wordBoxRowRight.querySelector(".deleteWordBtn");

//CLICK
addWordBtn.addEventListener("click", createDiv);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    createDiv();
  }
});

// create left and right Div
function createDiv() {
  const newWordBoxRow = document.createElement("div");
  newWordBoxRow.className = "wordBoxRow";
  newWordBoxRow.style.borderTop = "1px solid #000";

  const newWordBoxRowLeft = document.createElement("div");
  newWordBoxRowLeft.className = "wordBoxRowLeft";
  const newWordBoxRowRight = document.createElement("div");
  newWordBoxRowRight.className = "wordBoxRowRight";

  const newRussianWordDiv = document.createElement("div");
  newRussianWordDiv.style.position = "relative";
  newRussianWordDiv.className = "russianWord";

  const newTranslitWordDiv = document.createElement("div");
  newTranslitWordDiv.className = "translitWord";
  newTranslitWordDiv.style.position = "relative";
  const longWordVersion = input.value[0].toUpperCase() + input.value.slice(1);
  const longTranslitVersion = translit(longWordVersion);
  //length of word
  if (longWordVersion.length > 7) {
    const shortWordVersion = cutInputWord(longWordVersion);
    const shortTranslitVersion = cutInputWord(longTranslitVersion);
    newRussianWordDiv.textContent = shortWordVersion;
    newTranslitWordDiv.textContent = shortTranslitVersion;
    //Russian tooltip
    const tooltipDiv = document.createElement("div");
    tooltipDiv.className = "tooltip";
    tooltipDiv.textContent = longWordVersion;
    newRussianWordDiv.appendChild(tooltipDiv);
    newRussianWordDiv.addEventListener("mouseenter", () => {
      tooltipDiv.style.display = "block";
    });
    newRussianWordDiv.addEventListener("mouseleave", () => {
      tooltipDiv.style.display = "none";
    });
    //Translit tooltip
    const tooltipTranslitDiv = document.createElement("div");
    tooltipTranslitDiv.className = "tooltip";
    tooltipTranslitDiv.textContent = longTranslitVersion;
    newTranslitWordDiv.appendChild(tooltipTranslitDiv);
    newTranslitWordDiv.addEventListener("mouseenter", () => {
      tooltipTranslitDiv.style.display = "block";
    });
    newTranslitWordDiv.addEventListener("mouseleave", () => {
      tooltipTranslitDiv.style.display = "none";
    });
  } else {
    newRussianWordDiv.textContent = longWordVersion;
    newTranslitWordDiv.textContent = longTranslitVersion;
  }

  const newNumberSpan = document.createElement("span");
  newNumberSpan.className = "number";
  const allNumbers = document.querySelectorAll(".number");
  newNumberSpan.textContent = allNumbers.length + 1;

  const newDeleteWordBtn = deleteWordBtn.cloneNode(true);
  newDeleteWordBtn.addEventListener("click", removeRow);

  const allLeftDives = document.querySelectorAll(".wordBoxRowLeft");
  const allRightDives = document.querySelectorAll(".wordBoxRowRight");
  refreshLeftBorderRadius(allLeftDives);
  refreshRightBorderRadius(allRightDives);

  newWordBoxRowLeft.style.cssText = `border-top-left-radius: 0px;
                                    border-bottom-left-radius: 8px;`;

  newWordBoxRowRight.style.cssText = `border-top-right-radius: 0px;
                                    border-bottom-right-radius: 8px;`;

  newWordBoxRowLeft.append(newNumberSpan, newRussianWordDiv);
  newWordBoxRowRight.append(newTranslitWordDiv, newDeleteWordBtn);
  newWordBoxRow.append(newWordBoxRowLeft, newWordBoxRowRight);
  resultsConteiner.appendChild(newWordBoxRow);
  input.value = "";
}

deleteEverythink.addEventListener("click", refreshPage);

function cutInputWord(input) {
  return `${input[0].toUpperCase()}${input.slice(1, 7)}...`;
}

function translit(word) {
  let translitWord = "";
  const converter = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "e",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "c",
    ч: "ch",
    ш: "sh",
    щ: "sch",
    ь: "",
    ы: "y",
    ъ: "",
    э: "e",
    ю: "yu",
    я: "ya",

    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Е: "E",
    Ё: "E",
    Ж: "Zh",
    З: "Z",
    И: "I",
    Й: "Y",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    У: "U",
    Ф: "F",
    Х: "H",
    Ц: "C",
    Ч: "Ch",
    Ш: "Sh",
    Щ: "Sch",
    Ь: "",
    Ы: "Y",
    Ъ: "",
    Э: "E",
    Ю: "Yu",
    Я: "Ya",
  };

  for (let i = 0; i < word.length; i += 1) {
    if (converter[word[i]] != undefined) {
      translitWord += converter[word[i]];
    } else {
      translitWord += word[i];
    }
  }
  return translitWord;
}

function removeRow() {
  this.parentElement.parentElement.remove();
  const allIndexes = document.querySelectorAll(".number");
  allIndexes.forEach((element, index) => (element.textContent = index + 1));
  const allLeftDives = document.querySelectorAll(".wordBoxRowLeft");
  const allRightDives = document.querySelectorAll(".wordBoxRowRight");
  allLeftDives[allLeftDives.length - 1].style.borderBottomLeftRadius = "8px";
  allRightDives[allRightDives.length - 1].style.borderBottomRightRadius = "8px";
}

function refreshLeftBorderRadius(div) {
  for (let i = 0; i < div.length; i += 1) {
    if (i === 0) {
      div[0].style.cssText = `border-top-left-radius: 8px;
                                             border-bottom-left-radius: 0px;`;
    } else {
      div[i].style.cssText = `border-top-left-radius: 0px;
                                             border-bottom-left-radius: 0px;`;
    }
  }
}

function refreshRightBorderRadius(div) {
  for (let i = 0; i < div.length; i += 1) {
    if (i === 0) {
      div[0].style.cssText = `border-top-right-radius: 8px;
                                             border-bottom-right-radius: 0px;`;
    } else {
      div[i].style.cssText = `border-top-right-radius: 0px;
                                             border-bottom-right-radius: 0px;`;
    }
  }
}

function refreshPage() {
  location.reload();
}
