const Sequelize = require("sequelize");
                                //database username   password
const sequelize = new Sequelize("gamedb", "postgres", "ghastb0i", {
    host: "localhost",
    dialect: "postgres",
    port: 5433,
});

sequelize
    .authenticate()
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(`Error: ${err}`));

module.exports = sequelize;
