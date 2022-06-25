function getRandomHexColor() {
    let hexColor = '#';
    hexColor += Math.floor((Math.random() * 100) + 1);
    hexColor += Math.floor((Math.random() * 100) + 1);
    hexColor += Math.floor((Math.random() * 100) + 1);
    return hexColor;
}
function getRandomNumber(range) {
    return Math.floor((Math.random() * range) + 1);
}
class Shape {
    constructor(x1 = getRandomNumber(100), y1 = getRandomNumber(100), fillColor = getRandomHexColor()) {
        this.draw = function (context) { };
        this.fillColor = fillColor;
        this.x1 = x1;
        this.y1 = y1;
    }
}
class Circle extends Shape {
    constructor(x1, y1, radius = getRandomNumber(20), fillColor) {
        super(x1, y1, fillColor);
        this.draw = function (context) {
            drawCircle(context, this.x1, this.y1, this.radius, this.fillColor);
        };
        this.radius = radius;
    }
}
class Rectangle extends Shape {
    constructor(x1, y1, x2 = getRandomNumber(100), y2 = getRandomNumber(100), fillColor) {
        super(x1, y1, fillColor);
        this.draw = function (context) {
            drawRectangle(context, this.x1, this.y1, this.x2, this.y2, this.fillColor);
        };
        this.x2 = x2;
        this.y2 = y2;
    }
}
class Specimen {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.canvas.height = 100;
        this.context = this.canvas.getContext('2d');
        this.context.font = 'italic 10pt Calibri';
        this.shapes = [];
        this.aptitude = 0;
    }
}
// Adapted from https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
function FischerYatesAlgorithm(shapes) {
    for (let i = shapes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shapes[i];
        shapes[i] = shapes[j];
        shapes[j] = temp;
    }
}
// Choose random amount of shapes that would be propagated in crossover from each parent specimen.
// Propagate first 50 (if there are as many) shapes to child specimen.
function Crossover(specimenAlpha, specimenBeta) {
    const newSpecimen = new Specimen();
    const newSpecimenShapes = specimenAlpha.shapes;
    newSpecimenShapes.concat(specimenBeta.shapes);
    FischerYatesAlgorithm(newSpecimenShapes);
    newSpecimen.shapes = newSpecimenShapes.slice(0, Math.min(newSpecimenShapes.length, 50));
    return newSpecimen;
}
function generatePopulation(specimenQty) {
    // crear todos los Specimens
    const population = [];
    for (let index = 0; index < specimenQty; index++) {
        const specimen = new Specimen();
        const nCircles = getRandomNumber(25);
        const nRectangles = getRandomNumber(25);
        for (let circle = 0; circle < nCircles; circle++) {
            specimen.shapes.push(new Circle());
        }
        for (let rectangle = 0; rectangle < nRectangles; rectangle++) {
            specimen.shapes.push(new Rectangle());
        }
        population.push(specimen);
    }
    return population;
}
function main() {
    const specimenQty = 15;
    const table = document.getElementById('table');
    const src = 'https://picsum.photos/200/300';
    const img = document.createElement('img');
    const originalImageCanvas = document.getElementById('canvas');
    const originalImageContext = originalImageCanvas.getContext('2d');
    img.src = src;
    img.crossOrigin = 'Anonymous';
    let originalImageData;
    img.onload = function () {
        originalImageContext.drawImage(img, 0, 0);
        originalImageData = originalImageContext.getImageData(0, 0, 100, 100);
        const population = generatePopulation(specimenQty);
        renderAllShapes(population, originalImageData, table);
        console.log(population);
    };
}
main();
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
function renderAllShapes(specimens, imgData, table) {
    console.log();
    let specimenRendered = 0;
    let row;
    specimens.forEach(specimen => {
        if (specimenRendered % 5 === 0) {
            row = table.insertRow(table.rows.length);
        }
        specimen.shapes.forEach(shape => {
            console.log(specimenRendered);
            shape.draw(specimen.context);
        });
        const specimenImageData = specimen.context.getImageData(0, 0, 100, 100);
        specimen.aptitude = similarity(imgData, specimenImageData);
        specimen.context.fillText(specimen.aptitude.toString(), 10, 95);
        row.appendChild(specimen.canvas);
        specimenRendered++;
    });
}
function drawRectangle(context, x1, y1, x2, y2, fill) {
    context.beginPath();
    context.rect(x1, y1, x2, y2);
    context.fillStyle = fill;
    context.fill();
}
function drawLine(context, x1, y1, x2, y2, lineWidth, stroke) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineWidth = lineWidth;
    context.strokeStyle = stroke;
    context.stroke();
}
function drawCircle(context, x, y, radius, fill) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = fill;
    context.fill();
}
function similarity(imageData1, imageData2) {
    const data2 = imageData2.data;
    const data1 = imageData1.data;
    let suma = 0;
    for (let i = 0; i < data1.length; i += 4) {
        suma += Math.pow((data1[i] - data2[i]), 2);
        suma += Math.pow((data1[i + 1] - data2[i + 1]), 2);
        suma += Math.pow((data1[i + 2] - data2[i + 2]), 2);
    }
    return Math.pow(suma, 1 / 2);
}
//# sourceMappingURL=geneticVectorImageLogic.js.map