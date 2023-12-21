require("dotenv").config();

//Authentication for Azure Table Storage
const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

const tableConfig = {
	account: process.env.msTableStorageAccount,
	accountKey: process.env.msTableStorageAccountKey,
	tableName: process.env.msTableStorageTableName
}

const credential = new AzureNamedKeyCredential(tableConfig.account, tableConfig.accountKey);

const tableClient = new TableClient(
  `https://${tableConfig.account}.table.core.windows.net`,
  tableConfig.tableName,
  credential
);

//Authentication for Azure Graph API
const msal = require('@azure/msal-node');

const msalConfig = {
	auth: {
		clientId: process.env.msAdClientId,
		authority: `https://login.microsoftonline.com/${process.env.msAdDirectoryDomain}.onmicrosoft.com`,
		clientSecret: process.env.msAdClientSecret,
	}
};

const tokenRequest = {
	scopes: ['https://graph.microsoft.com/.default'], // e.g. 'https://graph.microsoft.com/.default'
};

const cca = new msal.ConfidentialClientApplication(msalConfig);

async function getToken(tokenRequest) {
	return await cca.acquireTokenByClientCredential(tokenRequest);
}

// Configuration for nodemailer
const nodemailer = require('nodemailer');
const mailClient = nodemailer.createTransport({
	host: process.env.smtpServer, // Mailjet SMTP server
	port: process.env.smtpPort, // TLS port
	secure: false, // TLS requires secureConnection to be false
	auth: {
		user: process.env.smtpUserKey, // Your Mailjet API key
		pass: process.env.smtpSecret, // Your Mailjet API secret key
	},
});


module.exports = {
	smtpSenderEmail: process.env.smtpSenderEmail,
	mailClient: mailClient,
	tableClient: tableClient,
	tokenRequest: tokenRequest,
	getToken: getToken
};
