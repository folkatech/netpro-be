let moment = require('moment');
module.exports = (sequelize, Sequelize, DataTypes) =>  {
    const ProjectBoards = sequelize.define(
        "projectBoard",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            project_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            board_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            label: {
                type : DataTypes.JSON  
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

            tableName: 'project_board',
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );

      return ProjectBoards;
}
