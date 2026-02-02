const PDFMerger = require('pdf-merger-js').default

const path = require('path')
const fs = require('fs')
const Mergepdf = async (pdf1, pdf2) => {
  try {
    const merger = new PDFMerger()

    // Ensure absolute paths
    await merger.add(path.resolve(pdf1))
    await merger.add(path.resolve(pdf2))



const outputDir = path.join(__dirname, '..', 'public')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir)
}

    const outputPath = path.join(outputDir, 'merged.pdf')
    await merger.save(outputPath)

    console.log('Merged PDF created successfully')
  } catch (err) {
    console.error('Merge failed:', err.message)
    throw err
  }
}

module.exports = { Mergepdf }
