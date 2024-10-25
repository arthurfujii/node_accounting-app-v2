const express = require('express');
const { validateFields } = require('./../middlewares/validateFields');
const {
  getExpenses,
  getOneExpense,
  postExpense,
  deleteExpense,
  patchExpense,
} = require('./../controllers/expense.controller');
const router = express.Router();

router.get('/', getExpenses);

router.get('/:id', getOneExpense);

router.post(
  '/',
  validateFields(['userId', 'spentAt', 'title', 'amount', 'category']),
  postExpense,
);

router.delete('/:id', deleteExpense);

router.patch('/:id', patchExpense);

module.exports = { router };
