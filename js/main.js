import { GAME_STATUS, GAME_TIME, PAIRS_COUNT } from './constants.js'
import {
  getColorElementList,
  getColorElementListUL,
  getInElementActive,
  getPlayAgainButton,
  getTimerElement,
} from './selectors.js'
import { getRandomColorPairs } from './utils.js'

// Global variables
let selections = []
let gameState = GAME_STATUS.PLAYING
// TODOs
// 1. Generating colors using https://github.com/davidmerfield/randomColor
// 2. Attach item click for all li elements
// 3. Check win logic
// 4. Add timer
// 5. Handle replay click
// function addTimer() {
//   const isWin = getInElementActive().length === 0
//   let timer = GAME_TIME
//   const timeout = setInterval(() => {
//     if (isWin || timer === 10) {
//       isWinGame()
//       gameState = GAME_STATUS.FINISHED

//       return clearTimeout(timeout)
//     }
//     const gameTimer = getTimerElement()
//     gameTimer.textContent = timer
//     timer -= 1
//   }, 1000)
// }
function showButtonReplay() {
  const replayButton = getPlayAgainButton()

  replayButton.classList.add('show')
}
function hideButtonReplay() {
  const replayButton = getPlayAgainButton()

  replayButton.textContent = 'Play Again'
  replayButton.classList.remove('show')
}
function setTimerElement(text) {
  const gameTimer = getTimerElement()

  gameTimer.textContent = text
}

function handleColorClick(liElement) {
  const match = [GAME_STATUS.BLOCKING, GAME_STATUS.FINISHED].includes(gameState)
  const isActive = liElement.classList.contains('active')
  if (match || !liElement || liElement.tagName !== 'LI' || isActive) return
  liElement.classList.add('active')
  selections.push(liElement)
  if (selections.length < 2) return

  const first = selections[0].dataset.color
  const second = selections[1].dataset.color
  const isMatch = first === second

  if (isMatch) {
    const isWin = getInElementActive().length === 0
    if (isWin) {
      setTimerElement('YOU WIN')
      hideButtonReplay()
      showButtonReplay()
    }

    selections = []
    return
  }

  gameState = GAME_STATUS.BLOCKING
  setTimeout(() => {
    selections[0].classList.remove('active')
    selections[1].classList.remove('active')
    selections = []
    gameState = GAME_STATUS.PLAYING
  }, 500)
}

function attachEventForColorList() {
  const ulEl = getColorElementListUL()
  if (!ulEl) return
  ulEl.addEventListener('click', (e) => {
    handleColorClick(e.target)
  })
}

function initColors() {
  const colorList = getRandomColorPairs(PAIRS_COUNT)
  const listElements = getColorElementList()
  if (!listElements) return
  listElements.forEach((el, index) => {
    const overlayElement = el.querySelector('.overlay')
    el.dataset.color = colorList[index]
    if (!overlayElement) return
    overlayElement.style.backgroundColor = colorList[index]
  })
}
function handelClickReplay() {
  const listElements = getColorElementList()
  listElements.forEach((el) => el.classList.remove('active'))
  gameState = GAME_STATUS.PLAYING

  hideButtonReplay()
  setTimerElement('')

  initColors()
  addTime(GAME_TIME)
}
function attachEventResetGame() {
  const replayButton = getPlayAgainButton()
  replayButton.addEventListener('click', handelClickReplay)
}
function addTime(time) {
  let currentTime = time
  // setTimerElement(time)

  const iterationTime = setInterval(() => {
    const isWin = getInElementActive().length === 0
    if (isWin || currentTime === 0) {
      console.log(getInElementActive().length)
      clearInterval(iterationTime)
      setTimerElement('YOU WIN')
      showButtonReplay()
      gameState = GAME_STATUS.FINISHED
    } else {
      setTimerElement(currentTime)
      currentTime -= 1
    }
  }, 1000)
}
;(() => {
  attachEventForColorList()
  attachEventResetGame()
})()
