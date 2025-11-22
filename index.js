const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid')
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
let port = 9080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")))

let posts = [
    {
        username: 'teja', content: "i love coding", id: uuidv4()
    },
    {
        username: 'raj', content: "hardwork will pay off", id: uuidv4()
    },
    {
        username: 'bob', content: "consistency is the key", id: uuidv4()
    },
    {
        username: 'chick', content: "sunday is the funday", id: uuidv4()
    },
]

app.get('/', (req, res) => {
    res.send("Working well");
})

app.get('/posts', (req, res) => {
    // res.send("Working well");
    console.log("check for ")
    console.log(posts.content)
    res.render("index.ejs", { posts })
})
app.get('/posts/new', (req, res) => {
    res.render("new.ejs", { posts })
})

app.post('/posts', (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ username, content, id })
    console.log(req.body);
    // res.send(`welcome ${username} and your content is ${content}`)
    res.redirect('/posts')
})

app.get('/posts/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id)
    if (post) {
        res.render("show.ejs", { post })
        // console.log(id);
        // res.send("requestworking")
    } else {
        res.send("please send proper id")
    }

})
app.patch('/posts/:id', (req, res) => {
    let { id } = req.params;
    console.dir(req.body)
    let { content } = req.body
    let post = posts.find((p) => id === p.id);
    post.content = content;
    res.redirect('/posts')

})
app.get('/posts/:id/edit', (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    // post.content = newContent;
    res.render("edit.ejs", { post })
})

app.delete('/posts/:id', (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect('/posts')
})
app.listen(port, () => {
    console.log("port number")
});

