const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

//Adding to local-storage transactions
//parsing to convert into array of strings
const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
)

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : []

//Add Transactions to DOM list:

function addTransactionDOM(transaction) {
  // Getting Sign
  const sign = transaction.amount < 0 ? '-' : '+'
  //creating a element
  const item = document.createElement('li')

  //Add Class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

  item.innerHTML = `${transaction.text}<span> ${sign}${Math.abs(
    transaction.amount
  )}</span>
  <button class="delete-btn" 
  onClick= "removeTransaction(${transaction.id})"
  >X</button>`

  list.appendChild(item)
}

//Function Add Transaction

function addTransaction(e) {
  e.preventDefault()

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount please')
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      //  + changes it from string to a number
      amount: +amount.value,
    }

    transactions.push(transaction)

    addTransactionDOM(transaction)

    updateValues()

    updateLocalStorage()

    text.value = ''
    amount.value = ''
  }
}

//Generate random Id

function generateID() {
  return Math.floor(Math.random() * 100_000_000)
}

// update the balance, income and expense

function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount)

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2)

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2)

  balance.innerText = `$${total}`
  money_plus.innerText = `$${income}`
  money_minus.innerText = `$${expense}`
}

// remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id != id)

  updateLocalStorage()

  init()
}

// update local storage transactions

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

// Init App

function init() {
  //clearing list
  list.innerHTML = ''

  transactions.forEach(addTransactionDOM)
  updateValues()
}

init()

form.addEventListener('submit', addTransaction)
