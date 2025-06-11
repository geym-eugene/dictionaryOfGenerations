const jwtConfig = {
  access: {
    expiresIn: `${1000 * 5}`, // 5 секунд
  },
  refresh: {
    expiresIn: `${1000 * 60 * 60 * 24}`, // 24 часа
  },
};

module.exports = jwtConfig;