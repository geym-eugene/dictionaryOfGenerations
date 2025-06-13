const BaseMessage = require('./BaseMessage');

module.exports = class AiMessage extends BaseMessage {
  constructor(content) {
    super(content);
    this.role = 'assistant';
  }
};