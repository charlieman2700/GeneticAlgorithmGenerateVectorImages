
function getRandomHexColor(): string {
  let hexColor = '#'
  hexColor += Math.floor((Math.random() * 100) + 1)
  hexColor += Math.floor((Math.random() * 100) + 1)
  hexColor += Math.floor((Math.random() * 100) + 1)
  return hexColor
}

export function getRandomNumber(range: number) {
  return Math.floor((Math.random() * range) + 1)
}

export class Shape {
  fillColor: string
  x1: number
  y1: number

  constructor(x1 = getRandomNumber(100), y1 = getRandomNumber(100), fillColor = getRandomHexColor()) {
    this.fillColor = fillColor
    this.x1 = x1
    this.y1 = y1
  }
  draw = (context: CanvasRenderingContext2D) => { }
}

export class Circle extends Shape {
  radius: number
  constructor(x1?: number, y1?: number, radius = getRandomNumber(20), fillColor?: string) {
    super(x1, y1, fillColor)
    this.radius = radius
  }

  draw = (context: CanvasRenderingContext2D) => {
    drawCircle(context, this.x1, this.y1, this.radius, this.fillColor)
  }
}

export class Rectangle extends Shape {
  x2: number
  y2: number

  constructor(x1?: number, y1?: number, x2: number = getRandomNumber(100), y2 = getRandomNumber(100), fillColor?: string) {
    super(x1, y1, fillColor)
    this.x2 = x2
    this.y2 = y2
  }

  draw = (context: CanvasRenderingContext2D) => {
    drawRectangle(context, this.x1, this.y1, this.x2, this.y2, this.fillColor)
  }
}



function drawRectangle(context: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, fill: string) {
  context.beginPath()
  context.rect(x1, y1, x2, y2)
  context.fillStyle = fill
  context.fill()
}

function drawLine(context: any, x1: number, y1: number, x2: number, y2: number, lineWidth: number, stroke: any) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineTo(x2, y2)
  context.lineWidth = lineWidth
  context.strokeStyle = stroke
  context.stroke()
}

function drawCircle(context: CanvasRenderingContext2D, x: number, y: number, radius: number, fill: any) {
  context.beginPath()
  context.arc(x, y, radius, 0, 2 * Math.PI, false)
  context.fillStyle = fill
  context.fill()
}
