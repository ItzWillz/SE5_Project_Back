const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.accomodation = require("./accomodation.model.js")(sequelize, Sequelize);
db.approval = require("./accomodationApproval.model.js")(sequelize, Sequelize);
db.request = require("./accomodationRequest.model.js")(sequelize, Sequelize);
db.course = require("./course.model.js")(sequelize, Sequelize);
db.courseSchedule = require("./courseSchedule.model.js")(sequelize, Sequelize);
db.faculty = require("./faculty.model.js")(sequelize, Sequelize);
db.notification = require("./notification.model.js")(sequelize, Sequelize);
db.student = require("./student.model.js")(sequelize, Sequelize);
db.studentAccomodation = require("./studentAccomodation.model.js")(sequelize, Sequelize);
db.studentSchedule = require("./studentCourseSchedule.model.js")(sequelize, Sequelize);
db.admin = require("./admin.model.js")(sequelize, Sequelize);

// Foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// Foreign key for admin
db.user.hasOne(
  db.admin,
  { as: "admin" },
  { foreignKey: { allowNull: false}, onDelete: "CASCADE" }
);
db.admin.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// Foreign key for student
db.user.hasOne(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false}}
);
db.student.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// Foreign key for StudentCourseSchedule
db.student.hasMany(
  db.studentSchedule,
  { as: "studentSchedule" },
  { foreignKey: { allowNull: false}, onDelete: "CASCADE" }
);
db.studentSchedule.belongsTo(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }}
);

// Foreign key for CourseSchedule
db.course.hasMany(
  db.courseSchedule,
  { as: "courseSchedule" },
  { foreignKey: { allowNull: false}, onDelete: "CASCADE" }
);
db.courseSchedule.belongsTo(
  db.course,
  { as: "course" },
  { foreignKey: { allowNull: false }}
);

// Foreign key for StudentSchedule
db.courseSchedule.hasMany(
  db.studentSchedule,
  { as: "studentSchedule" },
  { foreignKey: { allowNull: false}, onDelete: "CASCADE" }
);
db.studentSchedule.belongsTo(
  db.courseSchedule,
  { as: "courseSchedule" },
  { foreignKey: { allowNull: false }}
);

// Foreign key for CourseSchedule
db.faculty.hasMany(
  db.courseSchedule,
  { as: "courseSchedule" },
  { foreignKey: { allowNull: false}}
);
db.courseSchedule.belongsTo(
  db.faculty,
  { as: "faculty" },
  { foreignKey: { allowNull: false }}
);

// Foreign key for Notification
db.faculty.hasMany(
  db.notification,
  { as: "notification" },
  { foreignKey: { allowNull: false}}
);
db.notification.belongsTo(
  db.faculty,
  { as: "faculty" },
  { foreignKey: { allowNull: false }}
);

// Foreign key for StudentAccomodation
db.student.hasMany(
  db.studentAccomodation,
  { as: "studentAccomodation" },
  { foreignKey: { allowNull: false}, onDelete: "CASCADE"}
);
db.studentAccomodation.belongsTo(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }}
);

// Foreign key for StudentAccomodation
db.notification.hasOne(
  db.studentAccomodation,
  { as: "studentAccomodation" },
  { foreignKey: { allowNull: false}}
);
db.studentAccomodation.belongsTo(
  db.notification,
  { as: "notification" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE"}
);

// Foreign key for AccomodationRequest
db.student.hasMany(
  db.request,
  { as: "request" },
  { foreignKey: { allowNull: false}, onDelete: "CASCADE"}
);
db.request.belongsTo(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }}
);

// Foreign key for StudentAccomodation
db.accomodation.hasMany(
  db.studentAccomodation,
  { as: "studentAccomodation" },
  { foreignKey: { allowNull: false}, onDelete: "CASCADE"}
);
db.studentAccomodation.belongsTo(
  db.accomodation,
  { as: "accomodation" },
  { foreignKey: { allowNull: false }}
);

// Foreign key for AccomodationApproval
db.request.hasOne(
  db.approval,
  { as: "approval" },
  { foreignKey: { allowNull: false}, onDelete: "CASCADE"}
);
db.approval.belongsTo(
  db.request,
  { as: "request" },
  { foreignKey: { allowNull: false }}
);



module.exports = db;
