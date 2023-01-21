const express = require("express");
const session = require("express-session");
const helpers = require("./utils/helpers");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers })

const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./config/connection");

const routes = require("./routes");

const sess = {
  secret: "shhSecret",
  cookie: {},
  resave: false,
  saveUnitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Now listening on 3001");
  });
});
