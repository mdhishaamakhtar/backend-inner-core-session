const router = require("express").Router()
const UserController = require("../controllers/user")

router.post('/register', async (req, res) => {
  const response = await UserController.register(req.body.username, req.body.password)
  res.status(response.code).send(response)
})

router.post('/login', async (req, res) => {
  const response = await UserController.login(req.body.username, req.body.password)
  res.status(response.code).send(response)
})

module.exports = router