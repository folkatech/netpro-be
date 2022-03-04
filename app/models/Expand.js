module.exports = (sequelize, Sequelize, DataTypes) => {
  const Expand = sequelize.define(
    "expand", // Model name
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
        rule: {
                type: DataTypes.JSON,  
        },
        active: {
                type: DataTypes.ENUM,
                values: ['1', '0'],
                default: '1'
        },
        type: {
                type: DataTypes.ENUM,
                values: ['e', 'n', 'u'],
                default: 'e'
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
            tableName: 'expand',
            createdAt: "created_at",
            updatedAt: "updated_at"
    }
  );

  return Expand;
};
