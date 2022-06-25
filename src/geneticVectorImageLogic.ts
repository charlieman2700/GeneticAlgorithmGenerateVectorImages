function getRandomHexColor(): string {
  let hexColor = '#'
  hexColor += Math.floor((Math.random() * 100) + 1)
  hexColor += Math.floor((Math.random() * 100) + 1)
  hexColor += Math.floor((Math.random() * 100) + 1)
  return hexColor
}

function getRandomNumber(range: number) {
  return Math.floor((Math.random() * range) + 1)
}

class Shape {
  fillColor: string
  x1: number
  y1: number

  constructor(x1 = getRandomNumber(100), y1 = getRandomNumber(100), fillColor = getRandomHexColor()) {
    this.fillColor = fillColor
    this.x1 = x1
    this.y1 = y1
  }
  draw = function(context: CanvasRenderingContext2D) { }
}

class Circle extends Shape {
  radius: number
  constructor(x1?: number, y1?: number, radius = getRandomNumber(20), fillColor?: string) {
    super(x1, y1, fillColor)
    this.radius = radius
  }

  draw = function(context: CanvasRenderingContext2D) {
    drawCircle(context, this.x1, this.y1, this.radius, this.fillColor)
  }
}

class Rectangle extends Shape {
  x2: number
  y2: number
  constructor(x1?: number, y1?: number, x2: number = getRandomNumber(100), y2 = getRandomNumber(100), fillColor?: string) {
    super(x1, y1, fillColor)
    this.x2 = x2
    this.y2 = y2
  }

  draw = function(context: CanvasRenderingContext2D) {
    drawRectangle(context, this.x1, this.y1, this.x2, this.y2, this.fillColor)
  }
}

class Specimen {
  canvas: HTMLCanvasElement
  shapes: Shape[]
  aptitude: number
  context: CanvasRenderingContext2D

  constructor() {
    this.canvas = document.createElement('canvas')
    this.canvas.width = this.canvas.height = 100
    this.context = this.canvas.getContext('2d')
    this.context.font = 'italic 10pt Calibri'
    this.shapes = []
    this.aptitude = 0
  }
}

// Adapted from https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
function FischerYatesAlgorithm(shapes: Shape[]) {
  for (let i = shapes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = shapes[i]
    shapes[i] = shapes[j]
    shapes[j] = temp
  }
}

// Choose random amount of shapes that would be propagated in crossover from each parent specimen.
// Propagate first 50 (if there are as many) shapes to child specimen.
function Crossover(specimenAlpha: Specimen, specimenBeta: Specimen) {
  const newSpecimen = new Specimen()
  const newSpecimenShapes = specimenAlpha.shapes
  newSpecimenShapes.concat(specimenBeta.shapes)
  FischerYatesAlgorithm(newSpecimenShapes)
  newSpecimen.shapes = newSpecimenShapes.slice(0, Math.min(newSpecimenShapes.length, 50))

  return newSpecimen
}

function generatePopulation(specimenQty: number): Specimen[] {
  const population = []

  for (let index = 0; index < specimenQty; index++) {
    const specimen = new Specimen()
    const nCircles = getRandomNumber(25)
    const nRectangles = getRandomNumber(25)

    for (let circle = 0; circle < nCircles; circle++) {
      specimen.shapes.push(new Circle())
    }

    for (let rectangle = 0; rectangle < nRectangles; rectangle++) {
      specimen.shapes.push(new Rectangle())
    }

    population.push(specimen)
  }
  return population
}

function selectSpecimenForMixing(population: Specimen[]) {
  let selectedSpecimens: Specimen[] = []
  // 80 de los mejores    10 peores 
  const bestLastIndex = Math.round(population.length * 0.8)
  const worstBeginIndex = Math.round(population.length * 0.9)

  selectedSpecimens = population.slice(0, bestLastIndex)
  selectedSpecimens = selectedSpecimens.concat(population.slice(worstBeginIndex, population.length))

  return selectedSpecimens

}

function main() {
  const specimenQty = 100
  const table = document.getElementById('table') as HTMLTableElement
  const src = 'https://picsum.photos/200/300'
  const img = document.createElement('img') as HTMLImageElement
  const originalImageCanvas = document.getElementById('canvas') as HTMLCanvasElement


  const originalImageContext = originalImageCanvas.getContext('2d')
  img.src = src
  img.crossOrigin = 'Anonymous'
  let originalImageData: ImageData

  img.onload = function() {
    originalImageContext.drawImage(img, 0, 0)
    originalImageData = originalImageContext.getImageData(0, 0, 100, 100)
    const population = generatePopulation(specimenQty)




    renderAllShapes(population, originalImageData, table)
    population.sort((specimenAlpha, specimenBeta) => (specimenAlpha.aptitude > specimenBeta.aptitude) ? 1 : -1)
    console.log(population)
    console.log("se escogen estos")
    console.log(selectSpecimenForMixing(population))
  }


}

main()



function renderAllShapes(specimens: Specimen[], imgData: ImageData, table: HTMLTableElement) {
  console.log()
  let specimenRendered = 0
  let row: HTMLTableRowElement
  specimens.forEach(specimen => {
    if (specimenRendered % 5 === 0) {
      row = table.insertRow(table.rows.length)
    }
    specimen.shapes.forEach(shape => {
      console.log(specimenRendered)
      shape.draw(specimen.context)
    })
    const specimenImageData = specimen.context.getImageData(0, 0, 100, 100)
    specimen.aptitude = similarity(imgData, specimenImageData)
    specimen.context.fillText(specimen.aptitude.toString(), 10, 95)
    row.appendChild(specimen.canvas)
    specimenRendered++
  })
}

function drawRectangle(context: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, fill: string) {
  context.beginPath()
  context.rect(x1, y1, x2, y2)
  context.fillStyle = fill
  context.fill()
}

function drawLine(context: any, x1, y1, x2, y2, lineWidth, stroke) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineTo(x2, y2)
  context.lineWidth = lineWidth
  context.strokeStyle = stroke
  context.stroke()
}

function drawCircle(context, x, y, radius, fill) {
  context.beginPath()
  context.arc(x, y, radius, 0, 2 * Math.PI, false)
  context.fillStyle = fill
  context.fill()
}

function similarity(imageData1: ImageData, imageData2: ImageData): number {
  const data2 = imageData2.data
  const data1 = imageData1.data
  let suma = 0
  for (let i = 0; i < data1.length; i += 4) {
    suma += Math.pow((data1[i] - data2[i]), 2)
    suma += Math.pow((data1[i + 1] - data2[i + 1]), 2)
    suma += Math.pow((data1[i + 2] - data2[i + 2]), 2)
  }
  return Math.pow(suma, 1 / 2)
}
