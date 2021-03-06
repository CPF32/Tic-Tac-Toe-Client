'use strict'
const getFormFields = require('./../../../lib/get-form-fields')
const ui = require('./ui')
const api = require('./api')
const store = require('../store')

const onPlayGame = function (event) {
  event.preventDefault()

  $('.box').text('')
  api.playGame()
    // handle successul response
    .then(ui.onPlayGameSuccess)
    // handle failed response
    .catch(ui.onSignOutFailure)
}

const onBoxClick = function (event) {
  event.preventDefault()

  const box = $(event.target)

  const cellIndex = box.data('cell-index')

  const boxValue = box.text()

  if (boxValue === '') {
    box.data('value', store.currentPlayer)
    box.css('background', 'transparent').text(store.currentPlayer)

    api.updateGame(cellIndex)
      .then(ui.onUpdateGameSuccess)
      .then(onWinCondition)
      .catch(ui.onUpdateGameFailure)
  } else {
    ui.onUpdateGameFailure()
  }
}

const onWinCondition = function () {
  if (store.game.cells[0] !== '' && store.game.cells[0] === store.game.cells[1] && store.game.cells[0] === store.game.cells[2]) {
    ui.onWinGameSuccess()
  } else if (store.game.cells[3] !== '' && store.game.cells[3] === store.game.cells[4] && store.game.cells[3] === store.game.cells[5]) {
    ui.onWinGameSuccess()
  } else if (store.game.cells[6] !== '' && store.game.cells[6] === store.game.cells[7] && store.game.cells[6] === store.game.cells[8]) {
    ui.onWinGameSuccess()
  } else if (store.game.cells[0] !== '' && store.game.cells[0] === store.game.cells[3] && store.game.cells[0] === store.game.cells[6]) {
    ui.onWinGameSuccess()
  } else if (store.game.cells[1] !== '' && store.game.cells[1] === store.game.cells[4] && store.game.cells[1] === store.game.cells[7]) {
    ui.onWinGameSuccess()
  } else if (store.game.cells[2] !== '' && store.game.cells[2] === store.game.cells[5] && store.game.cells[2] === store.game.cells[8]) {
    ui.onWinGameSuccess()
  } else if (store.game.cells[0] !== '' && store.game.cells[0] === store.game.cells[4] && store.game.cells[0] === store.game.cells[8]) {
    ui.onWinGameSuccess()
  } else if (store.game.cells[2] !== '' && store.game.cells[2] === store.game.cells[4] && store.game.cells[2] === store.game.cells[6]) {
    ui.onWinGameSuccess()
  } else {
    if (store.game.cells.every(element => element !== '')) {
      $('#winner').text('Tie Game!')
      $('#message3').text('')
      $('.container2').hide()
      $('.sign-up').show()
    } else {
      ui.onWinGameFailure()
    }
  }
}

const onGameCount = function (event) {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)

  api.gameCount(data)
    .then(ui.onGameCountSuccess)
    .catch(ui.onGameCountFailure)
}

module.exports = {
  onPlayGame,
  onBoxClick,
  onWinCondition,
  onGameCount
}
