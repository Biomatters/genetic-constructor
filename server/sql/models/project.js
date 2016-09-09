module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define("Project", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // create one to many relationship
      }
    }
  });
  return Project;
};
