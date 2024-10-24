function validateItem(array) {
  return function (req, res, next) {
    const { id } = req.params;
    const item = array.find((entry) => entry.id === +id);

    if (!item) {
      res.sendStatus(404);
    } else {
      return next();
    }
  };
}

module.exports = { validateItem };
