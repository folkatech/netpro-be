module.exports = (sequelize, Sequelize, DataTypes) => {
  const Board = sequelize.define(
    "board", // Model name
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
        number: {
                type: DataTypes.INTEGER
        },
        active: {
             type: DataTypes.ENUM,
             values: ['1', '0'],
             default: '1'
        },
        type: {
             type: DataTypes.ENUM,
             values: ['netar', 'nonneter'],
             default: 'netar'
        },
        user_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
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
            tableName: 'board',
            createdAt: "created_at",
            updatedAt: "updated_at"
    }
  );

  return Board;
};
