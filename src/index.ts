import { generateNextGeneration, generatePopulation, selectSpecimenForMixing, similarity, Specimen } from "./Specimen";

function main() {
  const specimenQty = 100
  const table = document.getElementById('table') as HTMLTableElement
  const src = 'https://picsum.photos/200/300'
  // const src = '../resources/black.png'
  const img = document.createElement('img') as HTMLImageElement
  const originalImageCanvas = document.getElementById('canvas') as HTMLCanvasElement
  console.log('probando')


  const originalImageContext = originalImageCanvas.getContext('2d')
  img.src = src
  img.crossOrigin = 'Anonymous'
  let originalImageData: ImageData

  img.onload = function() {
    if (originalImageContext != null) {
      originalImageContext.drawImage(img, 0, 0)

      originalImageData = originalImageContext.getImageData(0, 0, 100, 100)
      let population = generatePopulation(specimenQty)

      renderAllShapes(population, originalImageData, table)
      population.sort((specimenAlpha, specimenBeta) => (specimenAlpha.aptitude > specimenBeta.aptitude) ? 1 : -1)

      console.log(population)
      console.log("se escogen estos")

      const selectedSpecimens = selectSpecimenForMixing(population)
      population = generateNextGeneration(selectedSpecimens, specimenQty)
      console.log(selectSpecimenForMixing(population))
    }

    else {
      console.log('Original Image is null');

    }

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
