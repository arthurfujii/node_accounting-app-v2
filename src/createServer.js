'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const { validateFields } = require('./middlewares/validateFields');
const {
  resetUsers,
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
} = require('./services/userService');
const {
  resetExpenses,
  getExpenseById,
  getAllExpenses,
  createExpense,
  removeExpense,
  updateExpense,
} = require('./services/expenseService');

function createServer() {
  resetUsers();
  resetExpenses();
  app.use(cors());
  app.use(express.json());
  app.use(express.static('public'));

  app.get('/users', async (req, res) => {
    res.send(getAllUsers());
  });

  app.post('/users', validateFields(['name']), async (req, res) => {
    const { name } = req.body;

    const user = createUser(name);

    res.status(201).send(user);
  });

  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = getUserById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }
    res.send(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = getUserById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    removeUser(id);
    res.sendStatus(204);
  });

  app.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const user = getUserById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    const updatedUser = updateUser({ id, name });

    res.send(updatedUser);
  });

  app.get('/expenses', async (req, res) => {
    res.send(getAllExpenses(req.query));
  });

  app.get('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const expense = getExpenseById(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }
    res.send(expense);
  });

  app.post('/expenses', async (req, res) => {
    const {
      userId,
      title,
      category,
      amount,
      note,
      spentAt = new Date().toISOString(),
    } = req.body;

    const user = getUserById(userId);

    if (!user) {
      res.sendStatus(400);

      return;
    }

    const expense = createExpense(
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    );

    res.status(201).send(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const expense = getExpenseById(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    removeExpense(id);
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const expense = getExpenseById(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    const updatedExpense = updateExpense(id, req.body);

    res.send(updatedExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
