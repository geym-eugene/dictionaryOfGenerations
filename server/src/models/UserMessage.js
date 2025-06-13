const BaseMessage = require('./BaseMessage');

module.exports = class UserMessage extends BaseMessage {
  constructor(content) {
    super(content);
    this.role = 'user';
  }
};