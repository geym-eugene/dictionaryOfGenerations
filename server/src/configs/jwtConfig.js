const jwtConfig = {
  access: {
    expiresIn: `${1000 * 5 * 60 * 100}`, // 30000 секунд
  },
  refresh: {
    expiresIn: `${1000 * 60 * 60 * 24}`, // 24 часа
  },
};

module.exports = jwtConfig;