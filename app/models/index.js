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
db.accommodation = require("./accommodation.model.js")(sequelize, Sequelize);
db.approval = require("./accommodationApproval.model.js")(sequelize, Sequelize);
db.request = require("./accommodationRequest.model.js")(sequelize, Sequelize);
db.course = require("./course.model.js")(sequelize, Sequelize);
db.courseSchedule = require("./courseSchedule.model.js")(sequelize, Sequelize);
db.faculty = require("./faculty.model.js")(sequelize, Sequelize);
db.notification = require("./notification.model.js")(sequelize, Sequelize);
db.student = require("./student.model.js")(sequelize, Sequelize);
db.studentAccommodation = require("./studentAccommodation.model.js")(sequelize, Sequelize);
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
db.admin.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// Foreign key for student
db.student.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// Foreign key for faculty
db.faculty.belongsTo(
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
  db.studentAccommodation,
  { as: "studentAccommodation" },
  { foreignKey: { allowNull: false}, onDelete: "CASCADE"}
);
db.studentAccommodation.belongsTo(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }}
);

// Foreign key for StudentAccommodation
db.notification.belongsTo(
  db.studentAccommodation,
  { as: "studentAccommodation" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE"}
);

// Foreign key for AccommodationRequest
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

// Foreign key for StudentAccommodation
db.accommodation.hasMany(
  db.studentAccommodation,
  { as: "studentAccommodation" },
  { foreignKey: { allowNull: false}, onDelete: "CASCADE"}
);
db.studentAccommodation.belongsTo(
  db.accommodation,
  { as: "accommodation" },
  { foreignKey: { allowNull: false }}
);

// Foreign key for AccommodationApproval
db.approval.belongsTo(
  db.request,
  { as: "request" },
  { foreignKey: { allowNull: false }}
);

module.exports = db;