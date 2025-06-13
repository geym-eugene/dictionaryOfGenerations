const BaseMessage = require('./BaseMessage');

module.exports = class SystemMessage extends BaseMessage {
  constructor(content) {
    super(content);
    this.role = 'system';
  }
};