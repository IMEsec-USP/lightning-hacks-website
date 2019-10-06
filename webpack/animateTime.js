import anime from 'animejs'

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const capAtByte = (num) => Math.max(0, Math.min(0xff, num))
const padHexNumber = hexNumber => ('0' + hexNumber).slice(-2)

const BASE_PINK = [0xf7, 0x0d, 0x88]
const generateTargetColor = () => {
    const newPink = BASE_PINK.map(color => capAtByte(color + randInt(-100, 30)))
    return newPink.reduce((acc, el) => acc + padHexNumber(el.toString(16)), '#')
}

const randomColors = () => {
    const targetColor = generateTargetColor()
    
    anime({
        targets: '.animate-time',
        fill: targetColor,
        easing: 'easeInOutQuad',
        complete: randomColors,
    })
}

randomColors()
