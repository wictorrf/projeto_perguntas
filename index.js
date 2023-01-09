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
  res.render("index")
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.get("/home", (req, res) => {
  questionModel.findAll({ raw: true, order: [ ['id', 'DESC'] ] }).then(questions => {
    res.render("home", {
      questions: questions
    });
  })
})

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

app.get("/pergunta/:id", (req, res) => {
  var id = req.params.id;
  questionModel.findOne({
    where: {id: id}                                                                        
  }).then(question => {
    if(question != undefined){
      res.render("question", {
        question: question
      });
    }else { // question not found
      res.redirect("/");
    }
  })
})

app.listen(8080, ()=>{
  console.log("App rodando");
}); 