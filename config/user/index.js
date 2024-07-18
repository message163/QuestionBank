"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLevalList = exports.UserLeval = void 0;
var UserLeval;
(function (UserLeval) {
    UserLeval[UserLeval["admin"] = 1] = "admin";
    UserLeval[UserLeval["director"] = 2] = "director";
    UserLeval[UserLeval["teacher"] = 3] = "teacher";
    UserLeval[UserLeval["student"] = 4] = "student";
    UserLeval[UserLeval["guest"] = 5] = "guest"; //游客 客人
})(UserLeval || (exports.UserLeval = UserLeval = {}));
exports.userLevalList = [
    { id: UserLeval.admin, name: '管理员' },
    { id: UserLeval.director, name: '主任' },
    { id: UserLeval.teacher, name: '教师' },
    { id: UserLeval.student, name: '学生' },
    { id: UserLeval.guest, name: '游客' }
];
