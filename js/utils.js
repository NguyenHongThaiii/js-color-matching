function shufflerColor(colorList) {
  if (!Array.isArray(colorList) || colorList.length < 2) return

  for (let i = colorList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = colorList[i]
    colorList[i] = colorList[j]
    colorList[j] = temp
  }
  return colorList
}
export const getRandomColorPairs = (count) => {
  // receive count --> return count * 2 random colors
  // using lib: https://github.com/davidmerfield/randomColor
  const colorList = []
  const hue = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink ', 'monochrome']

  for (let index = 0; index < count; index++) {
    const color = window.randomColor({
      luminosity: 'dark',
      hue: hue[index % count],
    })

    colorList.push(color)
  }
  const newColorList = [...colorList, ...colorList]
  shufflerColor(newColorList)
  return newColorList
}
