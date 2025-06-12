const { User } = require('../../db/models');
const bcrypt = require('bcrypt');

class AuthService {
  static async createAccount({ username, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return User.findOrCreate({
      where: {
        email,
      },
      defaults: {
        username,
        hashedPassword,
      },
    });
  }

  static async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Пользователь не найден');
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) throw new Error('Неверный пароль');
    return user;
  }
}

module.exports = AuthService;