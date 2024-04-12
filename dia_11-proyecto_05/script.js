const $form = document.querySelector('#passGeneratorForm')

$form.addEventListener('submit', (event) => {
  event.preventDefault()
  const formData = new FormData(event.target)

  const lenght = Number(formData.get('length'))
  const numbers = Boolean(formData.get('numbers'))
  const lowercase = Boolean(formData.get('lowercase'))
  const uppercase = Boolean(formData.get('uppercase'))
  const symbols = Boolean(formData.get('symbols'))

  if (!numbers && !lowercase && !uppercase && !symbols) {
    alert("Seleccione almenos un campo")
    return
  }
  
  const $passField = document.querySelector('#passwordGenerated')

  const newPass = genPassword({lenght, numbers, lowercase, uppercase, symbols})
  $passField.innerText = newPass
})

const randomLetterLowcase = () =>{
  const nRandom = 97 + (parseInt(Math.random()*26))
  return String.fromCharCode(nRandom)
}
const randomLetterUppercase = () =>{
  const nRandom = 65 + (parseInt(Math.random()*26))
  return String.fromCharCode(nRandom)
}

const randomSymbol = () =>{
  const nRandom = 35 + (parseInt(Math.random()*4))
  return String.fromCharCode(nRandom)
}

const randomNumber = () =>{
  return String(parseInt(Math.random()*10))
}

function genPassword({lenght, numbers, lowercase, uppercase, symbols }) {

  const generators = []

  if (numbers) generators.push(randomNumber)
  if (lowercase) generators.push(randomLetterLowcase)
  if (uppercase) generators.push(randomLetterUppercase)
  if (symbols) generators.push(randomSymbol)

  const newArr = new Array(lenght).fill(null).map(() => {
    const n = parseInt(Math.random()*generators.length)
    return generators[n]()
  })  
  return newArr.join('')

}

const $range = document.querySelector('#length')

$range.addEventListener('input', (event) => {
  const value = event.target.value
  document.querySelector('#lengthValue').innerText = value
})

const $btnCopy = document.querySelector('#copyBtn')
$btnCopy.addEventListener('click', (event) => {
  const $passField = document.querySelector('#passwordGenerated')
  const pass = $passField.innerText
  window.navigator.clipboard.writeText(pass)
  const $messageCopy = document.querySelector('#messageCopy')
  $messageCopy.innerHTML = "Copiado!"
  setTimeout(()=>{
    $messageCopy.innerHTML = ""
  }, 1000)
})


