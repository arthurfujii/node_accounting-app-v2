const { generateId } = require('../utils/generateId');
// eslint-disable-next-line prefer-const
let expenses = [];

const resetExpenses = function () {
  expenses = [];
};

const getAllExpenses = function (filterParams = {}) {
  const filteringMethods = {
    userId: (userId, expense) => +userId === +expense.userId,
    from: (from, expense) => new Date(expense.spentAt) > new Date(from),
    to: (to, expense) => new Date(expense.spentAt) < new Date(to),
    categories: (category, expense) => category === expense.category,
    default: () => true,
  };

  return expenses.filter(
    (expense) =>
      Object.entries(filterParams).every(([key, value]) => {
        const method = filteringMethods[key] ?? filteringMethods.default;

        return method(value, expense);
      }),
    // eslint-disable-next-line function-paren-newline
  );
};

const getExpenseById = function (id) {
  return expenses.find((expense) => +expense.id === +id) || null;
};
const createExpense = function (
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) {
  const expense = {
    id: generateId(expenses),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
};

const removeExpense = function (id) {
  expenses = expenses.filter((entry) => +entry.id !== +id);
};

const updateExpense = function (id, param = {}) {
  const expense = getExpenseById(id);

  Object.assign(expense, param);

  return expense;
};

module.exports = {
  resetExpenses,
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
