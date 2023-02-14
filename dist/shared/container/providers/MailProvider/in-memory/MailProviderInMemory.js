"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailProviderInMemory = void 0;
class MailProviderInMemory {
  constructor() {
    this.message = [];
  }
  async sendMail(to, subject, variables, path) {
    this.message.push({
      to,
      subject,
      variables,
      path
    });
  }
}
exports.MailProviderInMemory = MailProviderInMemory;