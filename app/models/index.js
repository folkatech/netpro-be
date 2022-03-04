const config = require("../config/config");
const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASS,
  {
    host: config.DB_HOST,
    dialect: 'mysql',
    operatorsAliases: 0,
    poll: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

db.board = require("./Board")(sequelize, Sequelize, DataTypes);
db.expand = require("./Expand")(sequelize, Sequelize, DataTypes);
db.mitra = require('./Mitra')(sequelize, Sequelize, DataTypes);
db.witel = require('./Witel')(sequelize, Sequelize, DataTypes);
db.sto = require('./Sto')(sequelize, Sequelize, DataTypes);
db.projects = require('./Projects')(sequelize, Sequelize, DataTypes);
db.reports = require('./Reports')(sequelize, Sequelize, DataTypes);
db.asset = require('./Asset')(sequelize, Sequelize, DataTypes);

db.users = require('./Users')(sequelize, Sequelize, DataTypes);
db.projectsBoard = require('./ProjectBoard')(sequelize, Sequelize, DataTypes);

db.board.belongsTo(db.users, {
      foreignKey: "user_id",
      targetKey: "id"
});

db.board.hasMany(db.projectsBoard, {
  foreignKey: "board_id",
  targetKey: "id"
});

db.projectsBoard.belongsTo(db.board, {
  foreignKey: "board_id",
  targetKey: "id"
});

db.projectsBoard.belongsTo(db.projects, {
  foreignKey: "project_id",
  targetKey: "id"
});


db.projects.belongsTo(db.sto, {
  foreignKey: "sto_id",
  targetKey: "id"
});

db.projects.belongsTo(db.witel, {
  foreignKey: "witel_id",
  targetKey: "id"
});

db.projects.belongsTo(db.expand, {
  foreignKey: "expand_id",
  targetKey: "id"
});

db.projects.belongsTo(db.asset, {
  foreignKey: "asset_id",
  targetKey: "id"
});

db.projects.hasMany(db.projectsBoard, {
  foreignKey: "project_id",
  targetKey: "id"
});

db.projects.hasMany(db.reports, {
    foreignKey: "project_id",
    targetKey: "id"
});

db.reports.belongsTo(db.projects, {
  foreignKey: "project_id",
  targetKey: "id"
});

db.reports.belongsTo(db.users, {
  foreignKey: "user_id",
  targetKey: "id"
});

db.users.belongsTo(db.mitra, {
  foreignKey: "mitra_id",
  targetKey: "id"
});

// db.users.hasOne(db.mitra, {
//     foreignKey : "mitra_id",
//     targetKey  : "id",
// });

module.exports = db;
