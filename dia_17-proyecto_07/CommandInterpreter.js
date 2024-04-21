class CommandInterpreter {
  constructor(){
    // atributes
    this.commands = new Map()
    this.commandHistory = []


    // commands
    this.commands.set("echo", (args) => {
      return args.join(' ')
    })
    this.commands.set("whoami", () => {
      return "doneber"
    })

    this.commands.set("pwd", () => {
      return "/home/doneber"
    })

    this.commands.set("history", () => {
      return this.getHistory().map((command, index) => `${index + 1} ${command}`).join('<br>')
    })

    this.commands.set("catsay", () => {
      console.log('test');
      return `<pre>
&nbsp;/&#92;_/&#92;  
( o.o ) 
&nbsp;> ^ <
</pre>
      `
    })

  }

  executeCommand(commandName, args) {
    if (!commandName) return

    this.addToHistory(commandName, args)

    const commandFunction = this.commands.get(commandName)

    if (commandFunction) {
      return commandFunction(args)
    }
    else {
      return `Command not found: ${commandName}`
    }
  }

  addToHistory(commandName, args) {
    if (args) this.commandHistory.push(`${commandName} ${args.join(' ')}`)
    else this.commandHistory.push(commandName)
  }

  getHistory() {
    return this.commandHistory
  }

}