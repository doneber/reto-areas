class TerminalView {
  constructor ($history, $input, indicator = {
    username: "doneber",
    servername: "pc",
  }){
    this.$history = $history
    this.$input = $input

    // analize the indicator
    this.indicatorTerminal = `
    <div class="indicator">
      <span class="username">${indicator.username}</span>
      <span class="at-symbol">@</span>
      <span class="hostname">${indicator.servername}</span>
      <span class="colon">:</span>
      <span class="current-directory">~</span>
      <span class="prompt-symbol">$</span>
    </div>
    `
  }

  render() {
    // new line
    const $divContainer = document.createElement('div')
    $divContainer.classList.add('line')

    $divContainer.innerHTML = this.indicatorTerminal

    const $inputFormElement = document.createElement('input')
    $inputFormElement.name = "text"
    $inputFormElement.autocapitalize = "off"
    $inputFormElement.autocomplete = "off"
    $inputFormElement.autofocus = "true"

    $divContainer.appendChild($inputFormElement)

    $input.appendChild($divContainer)
  }

  addToHistory(textCommand) {
    // new line
    const $divContainer = document.createElement('div')
    $divContainer.classList.add('line')
    $divContainer.innerHTML = this.indicatorTerminal
    
    // add textCommand
    const $spanCommand = document.createElement('span')
    $spanCommand.textContent = textCommand

    $divContainer.appendChild($spanCommand)

    this.$history.append($divContainer)

    this.moveScrollToBottom()
  }

  addToOutput(res){
    // new line
    const $divContainer = document.createElement('div')
    $divContainer.classList.add('line')
    
    // add textCommand
    const $spanCommand = document.createElement('span')
    $spanCommand.textContent = res

    $divContainer.appendChild($spanCommand)

    this.$history.append($divContainer)
    this.moveScrollToBottom()
  }

  addToOutputWithHTMLString(htmlString) {
    // new line
    const $divContainer = document.createElement('div')
    $divContainer.classList.add('line')
    
    $divContainer.innerHTML = htmlString

    this.$history.append($divContainer)

    this.moveScrollToBottom()
  }

  moveScrollToBottom() {
    this.$history.parentElement.scrollTop = this.$history.scrollHeight
  }
}