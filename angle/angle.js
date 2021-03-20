const RADIUS = 200
const X_CIRCLE_CENTER = 300
const Y_CIRCLE_CENTER = 300
let canvas, context
class MousePosition {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
}

let mousePos = new MousePosition(0, 0)
document.addEventListener('DOMContentLoaded', setupCanvas)

// initial drawing of canvas
function setupCanvas() {
	canvas = document.querySelector('#canvas')
	context = canvas.getContext('2d')
	drawCanvas()
	canvas.addEventListener('mousemove', redrawCanvas)
}
const drawCanvas = () => {
	drawRectangle('#849192', 5, 0, 0, 600, 600)
	drawCircle('#849192', 1, X_CIRCLE_CENTER, Y_CIRCLE_CENTER, RADIUS, 0, 2 * Math.PI)
	drawLine('#849192', 1, X_CIRCLE_CENTER, 0, X_CIRCLE_CENTER, 600)
	drawLine('#849192', 1, 0, Y_CIRCLE_CENTER, 600, X_CIRCLE_CENTER)
}
const drawRectangle = (strokeColor, lineWidth, startX, startY, endX, endY) => {
	context.strokeStyle = strokeColor
	context.lineWidth = lineWidth
	context.strokeRect(startX, startY, endX, endY)
}
const drawCircle = (strokeColor, lineWidth, xCircCenter, yCircCenter, radius, arcStart, arcEnd) => {
	context.strokeStyle = strokeColor
	context.lineWidth = lineWidth
	context.beginPath()
	context.arc(xCircCenter, yCircCenter, radius, arcStart, arcEnd)
	context.stroke()
}
const drawLine = (strokeColor, lineWidth, xStart, yStart, xEnd, yEnd) => {
	context.moveTo(xStart, yStart)
	context.lineTo(xEnd, yEnd)
	context.stroke()
}


const drawTextAtPoint = (text, x, y) => {
	context.font = '15px Arial'
	context.fillText(text, x, y)
}
const redrawCanvas = event => {
	context.clearRect(0, 0, canvas.width, canvas.height)
	drawCanvas()
	getMousePosition(event)
	drawTextAtPoint('X : ' + mousePos.x, 15, 25)
	drawTextAtPoint('Y : ' + mousePos.y, 15, 45)
	let angleOfMouseDegrees = getAngleUsingXAndY(mousePos.x, mousePos.y)
	drawTextAtPoint("Degrees : " + angleOfMouseDegrees, 15, 65)
	drawTriangle(angleOfMouseDegrees)
}
const getMousePosition = event => {
	let canvasDimensions = canvas.getBoundingClientRect()
	mousePos.x = Math.floor(event.clientX - canvasDimensions.left)
	mousePos.y = Math.floor(event.clientY - canvasDimensions.top)
	mousePos.x -= 300
	mousePos.y = -1 * (mousePos.y - 300)
	return mousePos
}


const radiansToDegrees = rad => {
	if (rad < 0) {
		return (360 + (rad * (180 / Math.PI))).toFixed(2)
	} else {
		return (rad * (180 / Math.PI)).toFixed(2)
	}
}
const degreesToRadians = deg => {
	return deg * (Math.PI / 180)
}
// X = Adjacent Y = Opposite
const getAngleUsingXAndY = (x, y) => {
	return radiansToDegrees(Math.atan2(y, x))
}

const drawTriangle = (angleDegrees) => {
	context.moveTo(X_CIRCLE_CENTER, Y_CIRCLE_CENTER)
	// COS = adj / hyp
	let xEndPoint = X_CIRCLE_CENTER + RADIUS * Math.cos(degreesToRadians(angleDegrees))
	let yEndPoint = Y_CIRCLE_CENTER + RADIUS * -(Math.sin(degreesToRadians(angleDegrees)))
	drawTextAtPoint('Radians : ' + degreesToRadians(angleDegrees).toFixed(2), 15, 85)
	context.lineTo(xEndPoint, yEndPoint)
	context.stroke()
	context.moveTo(xEndPoint, yEndPoint)
	context.lineTo(xEndPoint, 300)
	context.stroke()
	drawTextAtPoint('(' + xEndPoint.toFixed(2) + ', ' + yEndPoint.toFixed(2) + ')', xEndPoint + 10, yEndPoint - 10)

	let hypotenuseLength = getLineLength(X_CIRCLE_CENTER, Y_CIRCLE_CENTER, xEndPoint, yEndPoint)
	drawTextAtPoint('Hypot L : ' + hypotenuseLength.toFixed(2), 15, 105)

	let oppositeLength = getLineLength(xEndPoint, yEndPoint, xEndPoint, 300)
	drawTextAtPoint('Opp L : ' + oppositeLength.toFixed(2), 15, 125)
}

// Distance = sqrt( (x2 - x1)^2 + (y2 - y1)^2)
const getLineLength = (x1, y1, x2, y2) => {
	let xs = x2 - x1
	let ys = y2 - y1
	xs = xs * xs
	ys = ys * ys
	return Math.sqrt(xs + ys)
}
