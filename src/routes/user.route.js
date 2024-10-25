const express = require('express');
const { validateFields } = require('./../middlewares/validateFields');
const {
  getUsers,
  postUser,
  getOneUser,
  deleteUser,
  patchUser,
} = require('./../controllers/user.controller');
const router = express.Router();

router.get('/', getUsers);

router.post('/', validateFields(['name']), postUser);

router.get('/:id', getOneUser);

router.delete('/:id', deleteUser);

router.patch('/:id', patchUser);

module.exports = { router };
