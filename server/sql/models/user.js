module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: function(models) {
        // has many projects that should be deleted when the user is deleted
        User.hasMany(models.Project, { onDelete: 'cascade' });
      }
    }
  });
  return User;
};
