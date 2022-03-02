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

app.get('/tip/:total/:tipPercentage', (req, res) => {
  res.render('template', { title: 'Tip', message: 'Your tip should be:', content: req.params.total * (req.params.tipPercentage)/100 }) 
})

const answer = ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely","You may rely on it", "As I see it yes", "Most likely", "Outlook good","Yes", "Signs point to yes", "Reply hazy try again", "Ask again later","Better not tell you now", "Cannot predict now", "Concentrate and ask again","Don't count on it", "My reply is no", "My sources say no","Outlook not so good", "Very doubtful"]

app.get('/magic/:question', (req, res) => {
  const rando = answer[Math.floor(Math.random()*answer.length)]
  res.render('template', { title: 'Magic 8 Ball', message: req.params.question , content: '<h1>' + rando + '<h1>' })
})


app.listen(port,() => {
    console.log('I am listening on port' , port);
}); 