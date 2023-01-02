const express = require("express");
const app = express();
const bodyparser = require("body-parser")
const connection = require("./database/database");

//database
connection.authenticate().then(() => {
  console.log("conexao feita com db!")
}).catch((msgErro) => {
  console.log(msgErro);
})

app.set('view engine','ejs');
app.use(express.static('public'));

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
//rotas:
app.get("/", (req, res) => {
  res.render('index.ejs');
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  res.send("formulario recebido com o titulo" + titulo + " " + " e a descricao de " + descricao + ".")
});

app.listen(8080, ()=>{
  console.log("App rodando");
}); 