let canvas, context, savedImageData,

dragging = false,
strokeColor = '#3388ff',
fillColor = '#3388ff',
lineWidth = 12,
polygonSides = 6,

currentTool = 'brush',
canvasWidth = 600,
canvasHeight = 600,

usingBrush = false,

brushXPoints = new Array(),
brushYPoints = new Array(),

brushDownPos = new Array()

class ShapeBoundingBox {
	constructor(left, top, width, height) {
		this.left = left
		this.top = top
		this.width = width
		this.height = height
	}
}

class MouseDownPos {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
}

class Location {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
}

class PolygonPoint {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
}

let shapeBoundingBox = new ShapeBoundingBox(0, 0, 0, 0)
let mouseDown = new MouseDownPos(0, 0)
let loc = new Location(0, 0)

const setupCanvas = () => {
	canvas = document.querySelector('#my-canvas')
	context = canvas.getContext('2d')
	context.strokeStyle = strokeColor
	context.lineWidth = lineWidth
	canvas.addEventListener('mousedown', MouseDownHandler)
	canvas.addEventListener('mousemove', MouseMoveHandler)
	canvas.addEventListener('mouseup', MouseUpHandler)
}
document.addEventListener('DOMContentLoaded', setupCanvas)

const ChangeTool = tool => {
	document.getElementById('open').className = ''
	document.getElementById('save').className = ''
	document.getElementById('brush').className = ''
	document.getElementById('line').className = ''
	document.getElementById('rectangle').className = ''
	document.getElementById('circle').className = ''
	document.getElementById('ellipse').className = ''
	document.getElementById('polygon').className = ''
	document.getElementById(tool).className='selected'
	currentTool = tool
}

const GetMousePosition = (x, y) => {
	let canvasSizeData = canvas.getBoundingClientRect()
	return {
		x: (x - canvasSizeData.left) * (canvas.width / canvasSizeData.width),
		y: (y - canvasSizeData.top) * (canvas.height / canvasSizeData.height)
	}
}

const SaveCanvasImage = () => {
	savedImageData = context.getImageData(0, 0, canvas.width, canvas.height)
}
const RedrawCanvasImage = () => {
	context.putImageData(savedImageData, 0, 0)
}

const UpdateRubberbandSizeData = loc => {
	shapeBoundingBox.width = Math.abs(loc.x - mouseDown.x)
	shapeBoundingBox.height = Math.abs(loc.y - mouseDown.y)

	if (loc.x > mouseDown.x) {
		shapeBoundingBox.left = mouseDown.x
	} else {
		shapeBoundingBox.left = loc.x
	}

	if (loc.y > mouseDown.y) {
		shapeBoundingBox.top = mouseDown.y
	} else {
		shapeBoundingBox.top = loc.y
	}
}

const getAngleUsingXAndY = (mouseLocX, mouseLocY) => {
	let adjacent = mouseDown.x - mouseLocX
	let opposite = mouseDown.y - mouseLocY
	return radiansToDegrees(Math.atan2(opposite, adjacent))
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

const GetPolygonPoints = () => {
	let angle = degreesToRadians(getAngleUsingXAndY(loc.x, loc.y))
	let radiusX = shapeBoundingBox.width
	let radiusY = radiusX
	let polygonPoints = []
	for (let i = 0; i < polygonSides; i++) {
		polygonPoints.push(new PolygonPoint(loc.x + radiusX * Math.sin(angle), loc.y - radiusY * Math.cos(angle)))
		angle += 2 * Math.PI / polygonSides
	}
	return polygonPoints
}

const GetPolygon = () => {
	let polygonPoints = GetPolygonPoints()
	context.beginPath()
	context.moveTo(polygonPoints[0].x, polygonPoints[0].y)
	for (let i = 1; i < polygonSides; i++) {
		context.lineTo(polygonPoints[i].x, polygonPoints[i].y)
	}
	context.closePath()
}

const DrawRubberbandShape = loc => {
	context.strokeStyle = strokeColor
	context.fillStyle = fillColor

	if (currentTool === 'brush') {
		DrawBrush()
	} else if (currentTool === 'line') {
		context.beginPath()
		context.moveTo(mouseDown.x, mouseDown.y)
		context.lineTo(loc.x, loc.y)
		context.stroke()
	} else if (currentTool === 'rectangle') {
		context.strokeRect(shapeBoundingBox.left, shapeBoundingBox.top, shapeBoundingBox.width, shapeBoundingBox.height)
	} else if (currentTool === 'circle') {
		let radius = shapeBoundingBox.width
		context.beginPath()
		context.arc(mouseDown.x, mouseDown.y, radius, 0, Math.PI * 2)
		context.stroke()
	} else if (currentTool === 'ellipse') {
		let radiusX = shapeBoundingBox.width / 2
		let radiusY = shapeBoundingBox.height / 2
		context.beginPath()
		context.ellipse(mouseDown.x, mouseDown.y, radiusX, radiusY, Math.PI / 4, 0, Math.PI * 2)
		context.stroke()
	} else if (currentTool === 'polygon') {
		GetPolygon()
		context.stroke()
	}
}

const UpdateRubberbandOnMove = loc => {
	UpdateRubberbandSizeData(loc)
	DrawRubberbandShape(loc)
}

const AddBrushPoint = (x, y, mouseDown) => {
	brushXPoints.push(x)
	brushYPoints.push(y)
	brushDownPos.push(mouseDown)
}

const DrawBrush = () => {
	for (let i =1; i < brushXPoints.length; i++) {
		context.beginPath()
		if (brushDownPos[i]) {
			context.moveTo(brushXPoints[i-1], brushYPoints[i-1])
		} else {
			context.moveTo(brushXPoints[i]-1, brushYPoints[i])
		}
		context.lineTo(brushXPoints[i], brushYPoints[i])
		context.closePath()
		context.stroke()
	}
}

const MouseDownHandler = e => {
	canvas.style.cursor = "crosshair"
	loc = GetMousePosition(e.clientX, e.clientY)
	SaveCanvasImage()
	mouseDown.x = loc.x
	mouseDown.y = loc.y
	dragging = true

	if (currentTool === 'brush') {
		usingBrush = true
		AddBrushPoint(loc.x, loc.y)
	}
}
const MouseMoveHandler = e => {
	canvas.style.cursor = "crosshair"
	loc = GetMousePosition(e.clientX, e.clientY)

	if (currentTool === 'brush' && dragging && usingBrush) {
		if (loc.x > 0 && loc.x < canvasWidth && loc.y > 0 && loc.y < canvasHeight) {
			AddBrushPoint(loc.x, loc.y, true)
		}
		RedrawCanvasImage()
		DrawBrush()
	} else {
		if (dragging) {
			RedrawCanvasImage()
			UpdateRubberbandOnMove(loc)
		}
	}
}
const MouseUpHandler = e => {
	canvas.style.cursor = "default"
	loc = GetMousePosition(e.clientX, e.clientY)
	RedrawCanvasImage()
	UpdateRubberbandOnMove(loc)
	dragging = false
	usingBrush = false
}


const SaveImage = () => {
	const imageFile = document.querySelector('#img-data-file')
	imageFile.setAttribute('download', 'image.png')
	imageFile.setAttribute('href', canvas.toDataURL())
}

const OpenImage = () => {
	const image = new Image()
	image.onload = () => {
		context.clearRect(0, 0, canvas.width, canvas.height)
		context.drawImage(image, 0, 0)
	}
	image.src = 'image.png'
}
