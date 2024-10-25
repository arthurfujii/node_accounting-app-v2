const {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
} = require('../services/user.service');

// const userController = {
//   getUser(req, res) {
//     res.send(getAllUsers());
//   },
// };

const getUsers = (req, res) => {
  res.send(getAllUsers());
};

const getOneUser = (req, res) => {
  const { id } = req.params;
  const user = getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }
  res.send(user);
};

const postUser = (req, res) => {
  const { name } = req.body;

  const user = createUser(name);

  res.status(201).send(user);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const user = getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  removeUser(id);
  res.sendStatus(204);
};

const patchUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = updateUser({ id, name });

  res.send(updatedUser);
};

module.exports = {
  getUsers,
  postUser,
  getOneUser,
  deleteUser,
  patchUser,
};
