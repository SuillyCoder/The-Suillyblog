const express = require('express');
const methodOverride = require('method-override')
const mongoose = require("mongoose");
const path = require('path')
const Articles = require('./models/articleBank')
const articleRouter = require('./routes/articles')
const app = express();

mongoose.connect('mongodb://localhost/blog')

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res)=>{
    const articles = await Articles.find().sort({
        createdAt: 'desc'
    })

    res.render('articles/index', { articles: articles });
})

app.use('/articles',articleRouter)

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(
        `Server is running on 
            http://localhost:${PORT}`
    );
});