module.exports = (sequelize, Sequelize, DataTypes) => {
  const Asset = sequelize.define(
    "asset", // Model name
    {
      // Model attributes
        id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
        name: {
                type: DataTypes.STRING,  
            },
        code: {
                type: DataTypes.STRING,  
        },
        witel: {
                type: DataTypes.STRING,  
        },
        address: {
                type: DataTypes.STRING,  
        },
        region: {
                type: DataTypes.STRING,  
        },
        rule: {
                type: DataTypes.JSON,  
        },
        active: {
                type: DataTypes.ENUM,
                values: ['1', '0'],
                default: '1'
        },
        created_at: {
                allowNull: false,
                type: DataTypes.DATE
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
            tableName: 'asset',
            createdAt: "created_at",
            updatedAt: "updated_at"
    }
  );

  return Asset;
};
