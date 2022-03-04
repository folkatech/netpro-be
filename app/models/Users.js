const moment = require('moment');

module.exports = (sequelize, Sequelize, DataTypes) => {
    const Users = sequelize.define(
        "users",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
            },
            username: {
                type: DataTypes.STRING,
                unique : true,
            },
            email: {
                type: DataTypes.STRING,
                unique : true,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING,
            },
            active: {
                type: DataTypes.ENUM,
                values: ['1', '0'],
                default: '1'
            },
            role: {
                type: DataTypes.ENUM,
                values: ['rno', 'pnd', 'mitra', 'netar'],
                default : 'rno'
            },
            image: {
                type: DataTypes.STRING,
            },
            mitra_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE,
                get() {
                        return moment(this.getDataValue('created_at')).format('YYYY-MM-DD h:mm:ss');
                }
            },
            updated_at: {
                allowNull: true,
                type: DataTypes.DATE
            }
        },
        {
            // Options
            timestamps: true,
            underscrored: true,
            freezeTableName: true,

            // define the table's name

            tableName: 'users',
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );

      return Users;
}