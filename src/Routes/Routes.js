const router = require('express').Router();
const User = require('../Models/User')

//Retornando todos os usuários
router.get('/',async (req, res) => {
  try {
    const users = await User.find()
    if (users) {
      res.status(200).send(users)
    }
  } catch (err) {
    res.status(403).send('Erro ao retornar usuário')
  }
})

//Criando um novo usuário
router.post('/user', async (req, res) => {
  const data = req.body
  console.log('data', data)
  try {
    await User.create(data)
    if (data) {
      res.status(200).send('Usuário criado com sucesso!')
    }
  } catch (err) {
    res.status(403).send('Erro ao criar o usuário')
  }
})

//Editando um usuário
router.put('/:id', async(req, res) => {
  const { id } = req.params
  console.log(id)
  const { name, email, password } = req.body
  const user = {
    name: name,
    email: email,
    password: password
  }
  try {
    const updateUser = await User.updateOne({_id: id}, user)
    if (updateUser) {
      res.status(200).send('Usuário Atualizado com Sucesso')
    }
  } catch (err) {
    res.status(403).send('Erro ao atualizar o usuário')
  }
})

//Deletando um usuário
router.delete('/:id', async(req, res) => {
  const { id } = req.params
  console.log(id)
  try {
    const updateUser = await User.deleteOne({_id: id})
    if (updateUser) {
      res.status(200).send('Usuário Deletado com Sucesso')
    }
  } catch (err) {
    res.status(403).send('Erro ao deletar um usuário')
  }
})

module.exports = router