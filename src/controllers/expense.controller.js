const {
  getExpenseById,
  getAllExpenses,
  createExpense,
  removeExpense,
  updateExpense,
} = require('../services/expense.service');
const { getUserById } = require('../services/user.service');

const getExpenses = (req, res) => {
  res.send(getAllExpenses(req.query));
};

const getOneExpense = (req, res) => {
  const { id } = req.params;
  const expense = getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }
  res.send(expense);
};

const postExpense = (req, res) => {
  const {
    userId,
    spentAt = new Date(),
    title,
    amount,
    category,
    note,
  } = req.body;

  const user = getUserById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const expense = createExpense(userId, spentAt, title, amount, category, note);

  res.status(201).send(expense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;
  const expense = getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  removeExpense(id);
  res.sendStatus(204);
};

const patchExpense = (req, res) => {
  const { id } = req.params;
  const expense = getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = updateExpense(id, req.body);

  res.send(updatedExpense);
};

module.exports = {
  getOneExpense,
  getExpenses,
  postExpense,
  deleteExpense,
  patchExpense,
};
