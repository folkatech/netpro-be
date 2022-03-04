module.exports = (sequelize, Sequelize, DataTypes) => {
  const Sto = sequelize.define(
    "sto", // Model name
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
        witel_id: {
               type: DataTypes.INTEGER,
                allowNull: true,  
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
            tableName: 'sto',
            createdAt: "created_at",
            updatedAt: "updated_at"
    }
  );

  return Sto;
};
