const $terminal = document.querySelector('#terminal')
const $history = $terminal.querySelector('.history')
const $input = $terminal.querySelector('.input')

const terminalView = new TerminalView($history, $input, { username: "doneber", servername: "pc"})
terminalView.render()
const commandInterpreter = new CommandInterpreter()

$terminal.addEventListener('submit', (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)
  const text = formData.get('text')

  const [textCommand, ...args] = text.trim().split(' ')

  terminalView.addToHistory(text)
  const res = commandInterpreter.executeCommand(textCommand, args)

  if (res) terminalView.addToOutputWithHTMLString(res)

  event.target.reset()

})

let historyIndex = null
let inputSaved = null

$terminal.addEventListener('keyup', (event) => {
  const $inputText = $terminal.querySelector('input')
  let history = commandInterpreter.getHistory()

  if (event.key !== "ArrowUp" && event.key !== "ArrowDown") {
    historyIndex = history.length
    inputSaved = $inputText.value
    return
  }

  if (event.key === "ArrowUp")
    historyIndex = Math.max(historyIndex - 1, 0)
  if (event.key === "ArrowDown")
    historyIndex = Math.min(historyIndex + 1, history.length)

  if (historyIndex === history.length) {
    $inputText.value = inputSaved
  } else {
    $inputText.value = history[historyIndex]
  }
})

// only to UX
$terminal.addEventListener('click', () => {
  const $inputText = $terminal.querySelector('input')
  $inputText.focus()
})