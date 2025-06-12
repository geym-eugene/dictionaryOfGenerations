function isIdValid(key) {
  return function (req, res, next) {
    const id = req.params[key];
    if (Number.isNaN(+id)) {
      return res.status(400).send('id должен быть числом');
    }
    return next();
  };
}

module.exports = isIdValid;
