const app = require('./app');

require('dotenv').config();

const { PORT } = process.env;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Сервер запущен на ${PORT}`);
});
