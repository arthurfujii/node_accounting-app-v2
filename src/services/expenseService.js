const { generateId } = require('./../utils/generateId');
// eslint-disable-next-line prefer-const
let expenses = [
  {
    id: '0',
    userId: '0',
    spentAt: '2020-01',
    title: 'test expense',
    amount: '99',
    category: 'food',
    note: 'great product',
  },
  {
    id: '1',
    userId: '1',
    spentAt: '2024-03',
    title: 'test expense 1',
    amount: '100',
    category: 'food',
    note: 'must buy product',
  },
  {
    id: '2',
    userId: '1',
    spentAt: '2022-12-31',
    title: 'test expense 2',
    amount: '100',
    category: 'cleaning',
    note: 'need to buy monthly',
  },
];

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
