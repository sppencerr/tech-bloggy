const express = require('expresss');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');

const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();