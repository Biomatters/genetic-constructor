module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define("Project", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Project.belongsTo(models.User);
      }
    }
  });
  return Project;
};
