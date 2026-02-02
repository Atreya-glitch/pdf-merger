const express = require('express')
const path = require('path')
const app = express()
const multer  = require('multer')
const {Mergepdf}= require('./templates/pdftest')
const upload = multer({ dest: 'uploads/' })
app.use(express.static('public'))
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"))
})
app.post('/merge', upload.array('pdfs', 2), async (req, res) => {
  try {
    const pdf1 = path.resolve(req.files[0].path)
    const pdf2 = path.resolve(req.files[1].path)

    await Mergepdf(pdf1, pdf2)

    // Redirect to the merged file served from /public
    res.redirect('/merged.pdf')
  } catch (err) {
    console.error('Merge error:', err)
    res.status(500).send('PDF merge failed')
  }
})


app.post('/', (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"))
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
 