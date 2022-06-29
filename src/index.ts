import { generateNextGeneration, generatePopulation, selectSpecimenForCrossing, similarity, Specimen } from "./Specimen";



function main() {
  const specimenQty = 100
 
  const src = 'https://picsum.photos/200/300'
  // const src = '../resources/black.png'
  const img = document.createElement('img') as HTMLImageElement
  const originalImageCanvas = document.getElementById('canvas') as HTMLCanvasElement
  console.log('probando')
  let population:Specimen[]

  const originalImageContext = originalImageCanvas.getContext('2d')
  img.src = src
  img.crossOrigin = 'Anonymous'
  let originalImageData: ImageData

  img.onload = function() {
    if (originalImageContext != null) {
      originalImageContext.drawImage(img, 0, 0)

      originalImageData = originalImageContext.getImageData(0, 0, 100, 100)
      population = generatePopulation(specimenQty)

      renderAllShapes(population, originalImageData, table)
      
    }

    else {
      console.log('Original Image is null');

    }

  }

  

  function evolve(): void {
    population.sort((specimenAlpha, specimenBeta) => (specimenAlpha.aptitude > specimenBeta.aptitude) ? 1 : -1)
    const selectedSpecimens = selectSpecimenForCrossing(population)
    population = generateNextGeneration(selectedSpecimens, specimenQty)
    console.log(selectSpecimenForCrossing(population))
    console.log(population)
    console.log("se escogen estos")
    renderAllShapes(population, originalImageData)
    
  }
  let evolveButton: HTMLButtonElement | null
  evolveButton = document.getElementById("evolveButton") as HTMLButtonElement
  evolveButton? evolveButton.onclick = evolve : null
}

main()



function renderAllShapes(specimens: Specimen[], imgData: ImageData) {
  let table = document.getElementById('table') as HTMLTableElement
  
  let specimenRendered = 0
  let row: HTMLTableRowElement
  specimens.forEach(specimen => {
    if (specimenRendered % 5 === 0) {
      row = table.insertRow(table.rows.length)
    }
    specimen.shapes.forEach(shape => {
      if (specimen.context != null && specimen.canvas != null) {
        shape.draw(specimen.context)
        const specimenImageData = specimen.context.getImageData(0, 0, 100, 100)
        specimen.aptitude = similarity(imgData, specimenImageData)
        specimen.context.fillText(specimen.aptitude.toString(), 10, 95)
        row.appendChild(specimen.canvas)
      } else {
        console.log('Specimen Canvas is null');
        console.log(specimen);
      }
    })
    specimenRendered++
  })
}
