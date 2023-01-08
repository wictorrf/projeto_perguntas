const express = require("express");
const app = express();
const bodyparser = require("body-parser")
const connection = require("./database/database");
const questionModel = require("./database/question");

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
  questionModel.findAll({ raw: true, order: [ ['id', 'DESC'] ] }).then(questions => {
    res.render("index", {
      questions: questions
    });
  })
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

// Para salvas os dados no banco de dados, é preciso antes de tudo importar o model da tabela que tem que ser salva aqui;
app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao

  questionModel.create({
    title: titulo,
    description: descricao
  }).then(() => {
    res.redirect("/");
  })

});

app.listen(8080, ()=>{
  console.log("App rodando");
}); 