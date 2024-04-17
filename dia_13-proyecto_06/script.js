const $input = document.querySelector("#input");
const $startBtn = document.querySelector("#start");
$startBtn.addEventListener("click", startGame);

let startTime;

let quote
async function startGame() {
  const data = await fetch("./data.json").then((res) => res.json());
  quote = data.quotes[parseInt(Math.random() * data.quotes.length)];

  const $text = document.querySelector("#text");
  const htmlQuote = quote.split(" ").map((word) => {
    const letters = word.split("");
    const htmlLetters = letters.map(
      (letter) => `<span class="letter">${letter}</span>`
    );
    return `<span class="word">${htmlLetters.join("")}</span>`;
  });

  $text.innerHTML = htmlQuote.join(" ");

  const $firstWord = $text.firstChild;
  $firstWord.classList.add("active");
  const $firstLetter = $firstWord.firstChild;
  $firstLetter.classList.add("letterActive");

  $input.value = "";
  $input.focus();
  $input.addEventListener("input", handleInputText);

  startTime = new Date().getTime();

  // ui settings
  $input.disabled = false;
  $startBtn.disabled = true;
}

function handleInputText(event) {
  const $text = document.querySelector("#text");
  const $activeWord = $text.querySelector("span.word.active");
  const inputValue = $input.value;

  // colorize
  const $letters = $activeWord.querySelectorAll("span.letter");

  if (inputValue.length <= $letters.length) {
    $letters.forEach(($letter) => {
      $letter.classList.remove("letterCorrect");
      $letter.classList.remove("letterWrong");
      $letter.classList.remove("letterActive");
      $letter.classList.remove("lastLetterActive");
    });

    if (inputValue.length === $letters.length) {
      $activeWord.lastChild.classList.add("lastLetterActive");
    } else {
      $letters[inputValue.length]?.classList.add("letterActive");
    }

    let isWordWrong = true;
    inputValue.split("").forEach((letter, index) => {
      if (letter == $letters[index].textContent && isWordWrong) {
        $letters[index].classList.add("letterCorrect");
      } else {
        $letters[index].classList.add("letterWrong");
        isWordWrong = false;
      }
    });
  }
  // start validar
  const nextWord = $activeWord.nextElementSibling;

  if (inputValue.trim() === $activeWord.textContent) {
    
    if (event.data === " " || !nextWord) {
      // correct word
      $activeWord.classList.add("wordCorrect");
      $input.value = "";
      $activeWord.classList.remove("active");
      $activeWord.lastChild.classList.remove("lastLetterActive");
      if (nextWord) {
        nextWord.classList.add("active");
        nextWord.firstChild.classList.add("letterActive");
      } 
    }
    if (!nextWord) {
      endGame();
    }
    // end validar
  }
}

function endGame() {
  $input.disabled = true;
  $startBtn.disabled = false;

  const time = new Date().getTime() - startTime;

  const seconds = time / 1000;
  const wordsCount = quote.split(" ").length;
  const wpm = (wordsCount / seconds) * 60;

  document.querySelector("#speed").textContent = `${wpm.toFixed(2)} wpm`;
  document.querySelector("#time").textContent = `${seconds.toFixed(2)} s`;
}
