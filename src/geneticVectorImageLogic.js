function getRandomHexColor() {
  let hexColor = "#"
  hexColor += Math.floor((Math.random() * 100) + 1)
  hexColor += Math.floor((Math.random() * 100) + 1)
  hexColor += Math.floor((Math.random() * 100) + 1)
  return hexColor
}


function getRandomNumber(range) {
  return Math.floor((Math.random() * range) + 1)
}
class Shape {
  constructor(context, x1 = getRandomNumber(100), y1 = getRandomNumber(100), fillColor = getRandomHexColor()) {
    this.context = context;
    this.fillColor = fillColor
    this.x1 = x1
    this.y1 = y1
    draw()

  }
}

class Circle extends Shape {
  constructor(context, x1, y1, radius = getRandomNumber(20), fillColor) {
    super(context, x1, y1, fillColor)
    this.radius = radius;
  }

  draw() {
    drawCircle(this.context, this.x1, this.y1, this.radius, this.fillColor);
  }
}


class Rectangle extends Shape {
  constructor(context, x1, y1, x2 = getRandomNumber(100), y2 = getRandomNumber(100), fillColor) {
    super(context, x1, y1, fillColor)
    this.x2 = x2
    this.y2 = y2
  }
  draw() {
    drawRectangle(this.context, this.x1, this.y1, this.x2, this.y2, this.fillColor);
  }
}

class Specimen {
  constructor() {
    this.canvas = []
    this.shapes = []
    this.aptitude = 0
  }
}



function CrearPoblaciónInicial() {
  // crear todos los Specimens
  const specimenQty = 15
  let population = []

  for (let index = 0; index < specimenQty; index++) {
    const specimen = new Specimen()
    const nCircles = getRandomNumber(25)
    const nRectangles = getRandomNumber(25)

    for (let circle = 0; circle < nCircles; circle++) {
      specimen.shapes.push(new Circle())
    }

    population.push(specimen)
  }

  // Crear las figuras para llenar los especimenes

  var individuo = new Array();
  for (var i = 0; i < 5; i++) {
    var tipo = 'círculo';
    var x = Math.random() * 100;
    var y = Math.random() * 100;

    // individuo[i] = new Shape(tipo, x, y);
  }

  console.log(individuo[1].toString());
}

function Crossover(individual1, individual2) {
  var newInvididual = new Array();
  for (var i = 0; i < individual1.length; i++) {
    if (i % 2 == 0) {
      newInvididual[i] = individual1[i];
    }
    else {
      newInvididual[i] = individual2[i];
    }
  }
  return newInvididual;
}

var img = new Image;
var src = "https://picsum.photos/200/300";
var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');
img.crossOrigin = "Anonymous";
canvas = [];
context = [];
var imgData;
var nImages = 15;
var imageData = [];
img.onload = function() {
  // CrearPoblaciónInicial();
  ctx.drawImage(img, 0, 0);
  imgData = ctx.getImageData(0, 0, 100, 100);
  table = document.getElementById('table');
  for (var i = 0; i < nImages; i++) {
    if (i % 5 == 0) {
      row = table.insertRow(table.rows.length);
    }
    canvas[i] = document.createElement("canvas");
    canvas[i].width = canvas[i].height = "100";
    context[i] = canvas[i].getContext('2d');
    getImage(context[i]);
    //context[i].putImageData(imgData,0,0) ;
    imageData[i] = context[i].getImageData(0, 0, 100, 100);
    context[i].font = 'italic 10pt Calibri';
    context[i].fillText(similarity(imgData, imageData[i]), 10, 95);
    row.appendChild(canvas[i]);
  }
}

img.src = src;

function getImage(context) {
  nCircles = Math.floor((Math.random() * 3) + 1);
  nLines = Math.floor((Math.random() * 3) + 1);
  nRectangles = Math.floor((Math.random() * 3) + 1);

  for (var i = 0; i < nCircles; i++) {
  }

  for (var i = 0; i < nLines; i++) {
    x1 = Math.floor((Math.random() * 100) + 1);
    x2 = Math.floor((Math.random() * 100) + 1);
    y1 = Math.floor((Math.random() * 100) + 1);
    y2 = Math.floor((Math.random() * 100) + 1);
    stroke = "#" + Math.floor((Math.random() * 100) + 1) + Math.floor((Math.random() * 100) + 1) + Math.floor((Math.random() * 100) + 1);
    lineWidth = Math.floor((Math.random() * 5) + 1);

    // Guardarlos
    drawLine(context, x1, y1, x2, y2, lineWidth, stroke);
  }

  for (var i = 0; i < nRectangles; i++) {
    x1 = Math.floor((Math.random() * 100) + 1);
    x2 = Math.floor((Math.random() * 100) + 1);
    y1 = Math.floor((Math.random() * 100) + 1);
    y2 = Math.floor((Math.random() * 100) + 1);
    fill = "#" + Math.floor((Math.random() * 100) + 1) + Math.floor((Math.random() * 100) + 1) + Math.floor((Math.random() * 100) + 1);
    stroke = "#" + Math.floor((Math.random() * 100) + 1) + Math.floor((Math.random() * 100) + 1) + Math.floor((Math.random() * 100) + 1);
    lineWidth = Math.floor((Math.random() * 5) + 1);

    drawRectangle(context, x1, y1, x2, y2, fill);
  }
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
  data1 = imageData1.data;
  data2 = imageData2.data;
  suma = 0;
  for (var i = 0; i < data1.length; i += 4) {
    suma += Math.pow((data1[i] - data2[i]), 2);
    suma += Math.pow((data1[i + 1] - data2[i + 1]), 2);
    suma += Math.pow((data1[i + 2] - data2[i + 2]), 2);

  }
  return Math.pow(suma, 1 / 2);
}
