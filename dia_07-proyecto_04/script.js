let steps = []
const pieces = document.querySelectorAll('.piece')

let turn = null
let counter = 0

function addStep() {
  const randomNumber = parseInt(Math.random()*4) // 0, 1, 2, 3
  steps.push(randomNumber)
}


async function sleep(ms) {
  return await new Promise(resolve => setTimeout(resolve, ms))
}

async function playSteps() {
  for (const index of steps) {
    pieces[index].classList.add('active')
    await sleep(800)
    pieces[index].classList.remove('active')
    await sleep(200)
  }
  turn = false
}

function renderMessage(msg) {
  document.querySelector('#start').textContent = msg
}

function renderCounter(n) {
  document.querySelector('#counter').textContent = n
}

const $btnStart = document.querySelector('#start')

$btnStart.addEventListener('click', async ()=> {
  if (turn === null){
    renderMessage("¡Atento!")
    addStep()
    await playSteps()
    renderMessage("Tu turno")
  }
})


const $gameTable = document.querySelector('#game')

let mySteps = []

$gameTable.addEventListener('click', async (event)=> {
  console.log({turn});
  const indexStep = [...pieces].indexOf(event.target)
  if (turn === false && indexStep >= 0)
  {
    // comprobar que los pasos sean iguales al steps
    mySteps.push(indexStep)

    const isItGoingGreate = mySteps
    .every((myIndexStep, index) => myIndexStep === steps[index])

    if (isItGoingGreate && mySteps.length === steps.length)
    {
      renderMessage("¡Atento!")
      counter++
      renderCounter(counter)
      turn = true
      mySteps = []
      addStep()
      await playSteps()
      renderMessage("Tu turno")

    }

    if ( !isItGoingGreate) {
      alert('Tu puntaje es: ' + counter)
      turn = null
      counter = 0
      steps = []
      mySteps = []
      renderMessage("Jugar")
      renderCounter(counter)
    }
  }
})
