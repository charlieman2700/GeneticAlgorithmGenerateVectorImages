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
  draw = function(context: any) { }
  mutate = function() {}
}

class Circle extends Shape {
  radius: number
  constructor(x1?: number, y1?: number, radius = getRandomNumber(20), fillColor?: string) {
    super(x1, y1, fillColor)
    this.radius = radius
  }

  draw = function(context: any) {
    drawCircle(context, this.x1, this.y1, this.radius, this.fillColor)
  }

  mutate = function(shapeMutationChance: Number, mutationMagnitude: Number) {
    if (getRandomNumber(100) <= shapeMutationChance) {
      (getRandomNumber(2) < 1) ? this.x1 += mutationMagnitude : this.x1 -= mutationMagnitude
    }
    if (getRandomNumber(100) <= shapeMutationChance) {
      (getRandomNumber(2) < 1) ? this.y1 += mutationMagnitude : this.y1 -= mutationMagnitude
    }
    if (getRandomNumber(100) <= shapeMutationChance) {
      (getRandomNumber(2) < 1) ? this.radius += mutationMagnitude : this.radius -= mutationMagnitude
    }
    if (getRandomNumber(100) <= shapeMutationChance) {
      (getRandomNumber(2) < 1) ? this.fillColor += (mutationMagnitude*5) : this.fillColor -= (mutationMagnitude*5)
    }
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

  draw = function() {
    drawRectangle(this.context, this.x1, this.y1, this.x2, this.y2, this.fillColor)
  }
  
  mutate = function(shapeMutationChance: Number, mutationMagnitude: Number) {
    if (getRandomNumber(100) <= shapeMutationChance) {
      (getRandomNumber(2) < 1) ? this.x1 += mutationMagnitude : this.x1 -= mutationMagnitude
    }
    if (getRandomNumber(100) <= shapeMutationChance) {
      (getRandomNumber(2) < 1) ? this.y1 += mutationMagnitude : this.y1 -= mutationMagnitude
    }
    if (getRandomNumber(100) <= shapeMutationChance) {
      (getRandomNumber(2) < 1) ? this.x2 += mutationMagnitude : this.x2 -= mutationMagnitude
    }
    if (getRandomNumber(100) <= shapeMutationChance) {
      (getRandomNumber(2) < 1) ? this.y2 += mutationMagnitude : this.y2 -= mutationMagnitude
    }
    if (getRandomNumber(100) <= shapeMutationChance) {
      (getRandomNumber(2) < 1) ? this.fillColor += (mutationMagnitude*5) : this.fillColor -= (mutationMagnitude*5)
    }
  } 
}

class Specimen {
  canvas: any
  shapes: Shape[]
  aptitude: number
  context: any

  constructor() {
    this.canvas = document.createElement('canvas')
    this.canvas.width = this.canvas.height = '100'
    this.context = this.canvas.getContext('2d')
    this.context.font = 'italic 10pt Calibri'
    this.shapes = []
    this.aptitude = 0
  }

  mutate = function( shapeMutationChance: Number) {
    this.shapes.forEach(shape => {
      shape.mutate(shapeMutationChance)
    });
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

function MutatePopulation(population: Specimen[], mutationChance: Number, shapeMutationChance: Number) {
  population.forEach(specimen => {
    (getRandomNumber(100) <= mutationChance) ? specimen.mutate(shapeMutationChance) : null
  })
}

function CrearPoblaciónInicial() {
  // crear todos los Specimens
  const specimenQty = 15
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
}










// function main () {
//   const img = new Image()
//   const src = 'https://picsum.photos/200/300'
//   const cvs = document.getElementById('canvas')
//   const ctx = cvs.getContext('2d')
//   img.src = src
//   img.crossOrigin = 'Anonymous'
//   const canvas = []
//   const context = []
//   let imgData:any
//   const nImages = 15
//   const imageData = []
//   img.onload = function () {
//   // CrearPoblaciónInicial();
//     ctx.drawImage(img, 0, 0)
//     imgData = ctx.getImageData(0, 0, 100, 100)
//     const table = document.getElementById('table')
//     for (let i = 0; i < nImages; i++) {
//       if (i % 5 === 0) {
//         const row = table.insertRow(table.rows.length)
//       }
//       canvas[i] = document.createElement('canvas')
//       canvas[i].width = canvas[i].height = '100'
//       context[i] = canvas[i].getContext('2d')
//       getImage(context[i])
//       // context[i].putImageData(imgData,0,0) ;
//       imageData[i] = context[i].getImageData(0, 0, 100, 100)
//       context[i].font = 'italic 10pt Calibri'
//       context[i].fillText(similarity(imgData, imageData[i]), 10, 95)
//       row.appendChild(canvas[i])
//     }
//   }
// }
//
// main()

function renderAllShapes(specimens: Specimen[], imgData: any, table: any) {
  let specimenRendered = 0
  specimens.forEach(specimen => {
    specimen.shapes.forEach(shape => {
      let row: any
      if (specimenRendered % 5 === 0) {
        row = table.insertRow(table.rows.length)
      }
      shape.draw(specimen.context)
      const specimenImageData = specimen.context.getImageData(0, 0, 100, 100)
      specimenRendered++
      specimen.aptitude = similarity(imgData, specimenImageData)
      specimen.context.fillText(specimen.aptitude, 10, 95)
      row.appendChild(specimen.canvas)
    })
  })
}

function drawRectangle(context: any, x1: number, y1: number, x2: number, y2: number, fill: string) {
  context.beginPath()
  context.rect(x1, y1, x2, y2)
  context.fillStyle = fill
  context.fill()
}

function drawLine(context, x1, y1, x2, y2, lineWidth, stroke) {
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

function similarity(imageData1: any, imageData2: any) {
  data1 = imageData1.data
  data2 = imageData2.data
  suma = 0
  for (let i = 0; i < data1.length; i += 4) {
    suma += Math.pow((data1[i] - data2[i]), 2)
    suma += Math.pow((data1[i + 1] - data2[i + 1]), 2)
    suma += Math.pow((data1[i + 2] - data2[i + 2]), 2)
  }
  return Math.pow(suma, 1 / 2)
}