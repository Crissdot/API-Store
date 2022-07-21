require('dotenv').config();

const config = {
	env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
	port: process.env.PORT || 3000,
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbHost: process.env.DB_HOST,
	dbName: process.env.DB_NAME,
	dbPort: process.env.DB_PORT,
  dbURL: process.env.DATABASE_URL || null,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  senderUserMail: process.env.SENDER_USER_MAIL,
  senderUserPassword: process.env.SENDER_USER_PASSWORD,
  receiverUserMailTest: process.env.RECIEVER_USER_MAIL_TEST,
};

module.exports = { config };
