let moment = require('moment');
module.exports = (sequelize, Sequelize, DataTypes) =>  {
    const Projects = sequelize.define(
        "projects",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            sto_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            expand_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            witel_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            asset_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            title: {
                type: DataTypes.STRING,
            },
            detail: {
                type: DataTypes.STRING,
            },
            status : {
                type: DataTypes.ENUM,
                values: ['propose', 'final', 'hand', 'close'],
                default : 'propose'
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

            tableName: 'project',
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );

      return Projects;
}
