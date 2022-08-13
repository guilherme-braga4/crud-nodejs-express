const express = require('express')
const app = express()
const mongoose = require('mongoose')
//Carregando as variáveis de ambiente
require('dotenv').config()
//Importante um Model
const User = require('./Models/User')

//-->Permitindo a leitura de JSON
app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())
//-->Permitindo a leitura de JSON [FIM]

//Endpoint Teste
app.get('/Home', (req, res) => {
  res.status(200).send({ message: 'Seja bem vindo!' })
})

app.post('/Login', async (req, res) => {
  const data = req.body
  console.log('data', data)
  try {
    await User.create(data)
    if (data) {
      res.status(200).send('Usuário criado com sucesso!')
    }
  } catch (err) {
    console.log('Erro ao criar o usuário')
  }
})

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
