"use strict";

require("dotenv/config");
var _tsyringe = require("tsyringe");
var _EtherealMailProvider = require("./implementations/EtherealMailProvider");
var _SESMailProvider = require("./implementations/SESMailProvider");
const mailProvider = {
  ethereal: _tsyringe.container.resolve(_EtherealMailProvider.EtherealMailProvider),
  // container.resolve, faz a instancia da classe
  ses: _tsyringe.container.resolve(_SESMailProvider.SESMailProvider)
};
_tsyringe.container.registerInstance("MailProvider", mailProvider[process.env.MAIL_PROVIDER]);