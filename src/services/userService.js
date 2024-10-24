const { generateId } = require('./../utils/generateId');
// eslint-disable-next-line prefer-const
let users = [
  {
    id: '0',
    name: 'jane',
  },
  {
    id: '1',
    name: 'john',
  },
];

const resetUsers = function () {
  users = [];
};

const getAllUsers = function () {
  return users;
};

const getUserById = function (id) {
  return users.find((person) => person.id === +id) || null;
};

const createUser = function (name) {
  const user = {
    id: generateId(users),
    name,
  };

  users.push(user);

  return user;
};

const removeUser = function (id) {
  users = users.filter((person) => person.id !== +id);
};

const updateUser = function ({ id, name }) {
  const user = getUserById(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  resetUsers,
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
