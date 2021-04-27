const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
app.use(express.static(path.join(__dirname, 'public')))

const port = 3000
let comments = []

app.get('/', (req, res) => {
    if (req.query.comment)
        comments.push(req.query.comment)
    let concat_comments = comments.map(r =>
        `<article class="media">
        <figure class="media-left">
            <p class="image is-64x64">
                <img src="https://bulma.io/images/placeholders/128x128.png">
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <p>
                    <strong>User</strong>
                    <br>
                    ${r}
                    <br>
                    <small><a>Like</a> · <a>Reply</a> · 3 hrs</small>
                </p>
            </div>
        </div>
    </article>`
    ).join('\n\n')
    let index = fs.readFileSync('./vulnerable-site/index.html', 'utf8');
    index = index.replace('$comments$', concat_comments);
    res.send(index)
})

app.get('/reset', (req, res) => {
    comments = []
    let index = fs.readFileSync('./vulnerable-site/index.html', 'utf8');
    index = index.replace('$comments$', '');
    res.send(index)
})

app.listen(port, () => console.log(`The vulnerable-site server is listening at http://localhost:${port}`))