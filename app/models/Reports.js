const moment = require('moment');

module.exports = (sequelize, Sequelize, DataTypes) => {
    const Reports = sequelize.define(
        "report",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            project_id: {
                type: DataTypes.INTEGER,
            },
            detail: {
                type: DataTypes.JSON,
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE,
                get() {
                        return moment(this.getDataValue('created_at')).format('YYYY-MM-DD h:mm:ss');
                }
            },
            updated_at: {
                allowNull: false,
                type: DataTypes.DATE
            }
        },
        {
            // Options
            timestamps: true,
            underscrored: true,
            freezeTableName: true,

            // define the table's name

            tableName: 'report',
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );

      return Reports;
}