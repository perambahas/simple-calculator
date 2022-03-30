const numbers = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const calculatorScreen = document.querySelector(".calculator-screen")
const equal = document.querySelector(".equal")
const clear = document.querySelector(".clear")
const decimal = document.querySelector(".decimal")
const delet = document.querySelector(".delet")
const recent = document.querySelector(".recent-screen")

let prevNumber = ''
let chosenOperator = ''
let currentNumber = '0'
let calculated = false

const updateScreen = (number) => {
  calculatorScreen.value = number
}

const inputNumber = (number) => {
  if (currentNumber === '0' || calculated){
    currentNumber = number
    calculated = false
  }else{
    currentNumber += number
  }
}

const inputOperator = (operator) => {
  prevNumber = currentNumber
  calculationOperator = operator
  currentNumber = ''
}

const calculate = () => {
  let result = ''
  switch(calculationOperator){
    case '/':
      result = parseFloat(prevNumber) / parseFloat(currentNumber)
      break
    case 'x':
      result = parseFloat(prevNumber) * parseFloat(currentNumber)
      break
    case '+':
      result = parseFloat(prevNumber) + parseFloat(currentNumber)
      break
    case '-':
      result = parseFloat(prevNumber) - parseFloat(currentNumber)
      break
    default:
      return
  }
  currentNumber = result
  calculationOperator = ''
  calculated = true
}

const clearAll = () => {
  prevNumber = ''
  calculationOperator = ''
  currentNumber = '0'
}

const inputDecimal = (dot) => {
  if(currentNumber.includes('.')){
    return
  }
  currentNumber += dot
}

const recentScreen = (char) => {
  if(recent.value === '' && char === '='){
    return
  }
  
  if(recent.value.includes('=')){
    recent.value = ''
  }

  if('x+/-='.includes(char)){
    recent.value += " "+char+" "
  }else{
    recent.value += char
  }

  // recentScreen nya masih kurang
}
 

numbers.forEach((number) => {
  number.addEventListener('click', () => {
    inputNumber(number.textContent)
    updateScreen(currentNumber)
    recentScreen(number.textContent)
  })
})

operators.forEach((operator) => {
  operator.addEventListener('click', () =>{
     inputOperator(operator.textContent)
     recentScreen(operator.textContent)
  })
})

equal.addEventListener('click', () => {
  calculate()
  updateScreen(currentNumber)
  recentScreen(equal.textContent)
})

clear.addEventListener('click', () => {
  clearAll()
  updateScreen(currentNumber)
  recent.value = ''
})

decimal.addEventListener('click', () => {
  inputDecimal(decimal.textContent)
  updateScreen(currentNumber)
})

delet.addEventListener('click', () => {
  if(calculated){
    return
  }
  if(currentNumber != ''){
    recent.value = recent.value.slice(0,recent.value.length-1)
  }
  currentNumber = currentNumber.slice(0,currentNumber.length-1)  
  updateScreen(currentNumber)
})