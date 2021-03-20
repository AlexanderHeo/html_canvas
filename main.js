const init = () => {
	// grab canvas element from DOM
	const canvas = document.querySelector('#canvas')
	// get canvas context in 2d
	const context = canvas.getContext('2d')
	context.strokeStyle = "dodgerblue"
	context.lineWidth = 10
/*
	// display text
	context.font = "40pt Calibri"
	// fillText - text to display, x position, y position
	context.fillText('Hello World', 150, 100)


	// draw line
	context.beginPath()
	context.moveTo(100, 150)
	context.lineTo(450, 50)
	context.lineCap = "butt" // square, round
	// stroke must be called last to stroke the line

	// draw curved line
	const x = canvas.width /2
	const y = canvas.height /2
	const radius = 75
	const startAngle = Math.PI
	const endAngle = 0
	const counterClockwise = false

	context.beginPath()
	context.arc(x, y, radius, startAngle, endAngle, counterClockwise)

	// draw quadratic curve
	context.beginPath()
	// moveTo is starting point
	context.moveTo(188, 200)
	// x of control point, y of control point, x of end, y of end point,
	context.quadraticCurveTo(288, 0, 400, 200)

	// bezier curve
	context.beginPath()
	context.moveTo(188, 190)
	context.bezierCurveTo(50, 10, 250, 0, 425, 200)

	// path - connect several paths together
	context.beginPath()
	context.moveTo(100, 20)
	context.lineTo(200, 160)
	context.quadraticCurveTo(230, 200, 250, 120)
	context.bezierCurveTo(290, -40, 300, 200, 400, 150)
	context.lineTo(500, 90)

	// line join - miter, round, bevel
	context.beginPath()
	context.moveTo(99, 150)
	context.lineTo(149, 50)
	context.lineTo(199, 150)
	context.lineJoin = 'bevel'

	// rounded corners
	const rectWidth = 200
	const rectHeight = 100
	const rectX = 189
	const rectY = 50
	const cornerRadius = 50
	context.beginPath()
	context.moveTo(rectX, rectY)
	context.lineTo(rectX + rectWidth - cornerRadius, rectY)
	artTo(x first control, y first control, x second control, y second control, radius)
	context.arcTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + cornerRadius, cornerRadius)
	context.lineTo(rectX + rectWidth, rectY + rectHeight)

	// custom shapes
	context.beginPath()
	context.moveTo(170, 80)
	context.bezierCurveTo(130, 100, 130, 150, 230, 150)
	context.bezierCurveTo(250, 180, 320, 180, 340, 150)
	context.bezierCurveTo(420, 150, 420, 120, 390, 100)
	context.bezierCurveTo(430, 40, 370, 30, 340, 50)
	context.bezierCurveTo(320, 5, 250, 20, 250, 50)
	context.bezierCurveTo(200, 5, 150, 20, 170, 80)
	complete custom shape
	context.closePath()

	// rectangle
	context.beginPath()
	context.rect(188, 50, 200, 100)
	context.fillStyle = 'yellow'
	context.fill()

	// circle
	const centerX = canvas.width / 2
	const centerY = canvas.height / 2
	const radius = 70

	context.beginPath()
	arc(x centerpoint, y centerpoint, radius, starting angle, ending angle [, anticlockwise] )
	context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false)
	context.fillStyle = 'green'
	context.fill()

	// semicircle
	const centerX = canvas.width / 2
	const centerY = canvas.height / 2
	const radius = 70

	context.beginPath()
	context.arc(centerX, centerY, radius, 0, Math.PI, false)
	context.fillStyle = 'green'
	context.fill()

	// fill
	context.beginPath()
	context.moveTo(170, 80)
	context.bezierCurveTo(130, 100, 130, 150, 230, 150)
	context.bezierCurveTo(250, 180, 320, 180, 340, 150)
	context.bezierCurveTo(420, 150, 420, 120, 390, 100)
	context.bezierCurveTo(430, 40, 370, 30, 340, 50)
	context.bezierCurveTo(320, 5, 250, 20, 250, 50)
	context.bezierCurveTo(200, 5, 150, 20, 170, 80)
	// complete custom shape
	context.closePath()
	context.lineWidth = 5
	context.fillStyle = "rebeccapurple"
	context.fill()

	// linear gradient
	context.rect(0, 0, canvas.width, canvas.height)
	// add the gradient
	// start x, start y,
	var grad = context.createLinearGradient(0, 0, canvas.width, canvas.height)
	grad.addColorStop(0, '#8ed6ff')
	grad.addColorStop(1, '#004cb3')
	context.fillStyle = grad
	context.fill()

	// radial gradient
	// start circle x, start circle y, start circle size,
	// end circle x, end circle y, end circle size
	context.rect(0, 0, canvas.width, canvas.height)
	const grad = context.createRadialGradient(238, 50, 10, 238, 50, 350)
	grad.addColorStop(0, '#8ed6ff')
	grad.addColorStop(1, '#004cb3')
	context.fillStyle = grad
	context.fill()*/


	context.beginPath();
	context.rect(188, 50, 200, 100);
	context.fillStyle = "yellow";
	context.fill();
	context.stroke()
}
