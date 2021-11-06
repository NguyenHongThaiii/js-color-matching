export function getColorElementListUL() {
  return document.getElementById('colorList')
}
export function getColorElementList() {
  return document.querySelectorAll('#colorList > li')
}
export function getInElementActive() {
  return document.querySelectorAll('#colorList > li:not(.active)')
}
export function getTimerElement() {
  return document.querySelector('.game .game__timer')
}

export function getPlayAgainButton() {
  return document.querySelector('.game .game__button')
}

export function getColorBackground() {
  return document.querySelector('.color-background')
}
