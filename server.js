require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT

const fs = require('fs')
app.engine('hypatia', (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)
    const rendered = content.toString()
      .replace('#title#', '<title>' + options.title + '</title>')
      .replace('#message#', '<h1>' + options.message + '</h1>')
      .replace('#content#','<div>'+ options.content + '</div>' )
      .replace('#image#', '<img src =' + options.image + '>')
    return callback(null, rendered)
  })
})
app.set('views', './views')
app.set('view engine', 'hypatia')


app.get('/greeting/:name', (req, res) => {
    res.render('template', { title: 'Greeting', message: 'Hello, stranger!', content: 'Welcome, ' + req.params.name + ', nice to see you!' })
})


app.listen(port,() => {
    console.log('I am listening on port' , port);
}); 