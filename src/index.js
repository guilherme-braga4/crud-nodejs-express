const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./Routes/Routes')

//Carregando as variáveis de ambiente
require('dotenv').config()

//-->Permitindo a leitura de JSON
app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())
//-->Permitindo a leitura de JSON [FIM]

//Acessando o roteamento
app.use('/user', routes)

//Conexão com o Banco de Dados
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_NAME}:${process.env.MONGODB_PASSWORD}@node-express-guidev.4nillbc.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Mongoose Conected')
  })
  .catch(err => {
    console.log('Algo deu errado com nosso Banco de Dados!')
  })

//Escutando o Servidor
app.listen(3000, () => {
  console.log('Rodando com Sucesso na Porta 3000....')
})
