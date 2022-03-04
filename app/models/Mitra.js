module.exports = (sequelize, Sequelize, DataTypes) => {
  const Mitra = sequelize.define(
    "mitra", // Model name
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
            tableName: 'mitra',
            createdAt: "created_at",
            updatedAt: "updated_at"
    }
  );

  return Mitra;
};
