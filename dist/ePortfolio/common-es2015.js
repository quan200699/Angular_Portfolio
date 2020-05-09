(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/helper/admin-auth-guard.ts":
/*!********************************************!*\
  !*** ./src/app/helper/admin-auth-guard.ts ***!
  \********************************************/
/*! exports provided: AdminAuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminAuthGuard", function() { return AdminAuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _service_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../service/authentication/authentication.service */ "./src/app/service/authentication/authentication.service.ts");




let AdminAuthGuard = class AdminAuthGuard {
    constructor(router, authService) {
        this.router = router;
        this.authService = authService;
        this.authService.currentUser.subscribe(next => {
            this.currentUser = next;
        });
    }
    canActivate(next, state) {
        let hasRoleAdmin = false;
        if (this.currentUser) {
            const roleList = this.currentUser.roles;
            for (const role of roleList) {
                if (role.authority === 'ADMIN') {
                    hasRoleAdmin = true;
                    break;
                }
            }
            if (hasRoleAdmin) {
                return true;
            }
            else {
                this.authService.logout();
                this.router.navigate(['/', 'admin', 'dashboard'], { queryParams: { login: true }, queryParamsHandling: 'merge' });
                return false;
            }
        }
        else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/', 'admin', 'login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
    canActivateChild(next, state) {
        if (this.currentUser) {
            const roleList = this.currentUser.roles;
            let hasRoleAdmin = false;
            for (const role of roleList) {
                if (role.authority === 'ADMIN') {
                    hasRoleAdmin = true;
                    break;
                }
            }
            return hasRoleAdmin;
        }
        else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/', 'admin', 'login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
    canLoad(route, segments) {
        return true;
    }
};
AdminAuthGuard.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
    { type: _service_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"] }
];
AdminAuthGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
        providedIn: 'root'
    })
], AdminAuthGuard);



/***/ }),

/***/ "./src/app/helper/auth-guard.ts":
/*!**************************************!*\
  !*** ./src/app/helper/auth-guard.ts ***!
  \**************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _service_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../service/authentication/authentication.service */ "./src/app/service/authentication/authentication.service.ts");




let AuthGuard = class AuthGuard {
    constructor(router, authService) {
        this.router = router;
        this.authService = authService;
        this.authService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }
    canActivate(next, state) {
        if (this.currentUser) {
            return true;
        }
        else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/', 'login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
    canActivateChild(next, state) {
        if (this.currentUser) {
            return true;
        }
        else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/', 'coach', 'login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
    canLoad(route, segments) {
        return true;
    }
};
AuthGuard.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _service_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"] }
];
AuthGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], AuthGuard);



/***/ }),

/***/ "./src/app/service/category/category.service.ts":
/*!******************************************************!*\
  !*** ./src/app/service/category/category.service.ts ***!
  \******************************************************/
/*! exports provided: CategoryService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryService", function() { return CategoryService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");




const API_URL = `${_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl}`;
let CategoryService = class CategoryService {
    constructor(http) {
        this.http = http;
    }
    getAllCategory() {
        return this.http.get(API_URL + '/categories');
    }
    createNewCategory(category) {
        return this.http.post(API_URL + '/categories', category);
    }
    getCategory(id) {
        return this.http.get(API_URL + `/categories/${id}`);
    }
    editCategory(id, category) {
        return this.http.put(API_URL + `/categories/${id}`, category);
    }
    deleteCategory(id) {
        return this.http.delete(API_URL + `/categories/${id}`);
    }
    findByCategoryName(name) {
        return this.http.get(API_URL + '/categories/name?name=' + name);
    }
    getAllSkillByCategory(id) {
        return this.http.get(API_URL + `/categories/${id}/skills`);
    }
};
CategoryService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
];
CategoryService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], CategoryService);



/***/ }),

/***/ "./src/app/service/classes/classes.service.ts":
/*!****************************************************!*\
  !*** ./src/app/service/classes/classes.service.ts ***!
  \****************************************************/
/*! exports provided: ClassesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClassesService", function() { return ClassesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");




const API_URL = `${_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiUrl}`;
let ClassesService = class ClassesService {
    constructor(http) {
        this.http = http;
    }
    getAllClasses() {
        return this.http.get(API_URL + '/classes');
    }
    getClasses(id) {
        return this.http.get(API_URL + `/classes/${id}`);
    }
    createNewClasses(classes) {
        return this.http.post(API_URL + `/classes`, classes);
    }
    updateClassesInfo(id, classes) {
        return this.http.put(API_URL + `/classes/${id}`, classes);
    }
    deleteClasses(id) {
        return this.http.delete(API_URL + `/classes/${id}`);
    }
    getAllStudentByClass(id) {
        return this.http.get(API_URL + `/classes/${id}/students`);
    }
};
ClassesService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
ClassesService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], ClassesService);



/***/ }),

/***/ "./src/app/service/coach/coach.service.ts":
/*!************************************************!*\
  !*** ./src/app/service/coach/coach.service.ts ***!
  \************************************************/
/*! exports provided: CoachService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoachService", function() { return CoachService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");




const API_URL = `${_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl}`;
let CoachService = class CoachService {
    constructor(http) {
        this.http = http;
    }
    getAllCoach() {
        return this.http.get(API_URL + '/coaches');
    }
    getCoach(id) {
        return this.http.get(API_URL + `/coaches/${id}`);
    }
    createNewCoach(coach) {
        return this.http.post(API_URL + '/coaches', coach);
    }
    updateCoachInfo(id, coach) {
        return this.http.put(API_URL + `/coaches/${id}`, coach);
    }
    deleteCoach(id) {
        return this.http.delete(API_URL + `/coaches/${id}`);
    }
    getAllClassByCoach(id) {
        return this.http.get(API_URL + `/coaches/${id}/classes`);
    }
    changePassword(id, coach) {
        return this.http.put(API_URL + `/coaches/change-password/${id}`, coach);
    }
};
CoachService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
];
CoachService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], CoachService);



/***/ }),

/***/ "./src/app/service/evaluation-detail/evaluation-detail.service.ts":
/*!************************************************************************!*\
  !*** ./src/app/service/evaluation-detail/evaluation-detail.service.ts ***!
  \************************************************************************/
/*! exports provided: EvaluationDetailService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EvaluationDetailService", function() { return EvaluationDetailService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");




const API_URL = `${_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl}`;
let EvaluationDetailService = class EvaluationDetailService {
    constructor(http) {
        this.http = http;
    }
    getAllEvaluationDetail() {
        return this.http.get(API_URL + '/evaluationDetails');
    }
    getEvaluationDetail(id) {
        return this.http.get(API_URL + `/evaluationDetails/${id}`);
    }
    createNewEvaluationDetail(evaluationDetail) {
        return this.http.post(API_URL + '/evaluationDetails', evaluationDetail);
    }
    editEvaluationDetail(id, evaluationDetail) {
        return this.http.put(API_URL + `/evaluationDetails/${id}`, evaluationDetail);
    }
    deleteEvaluationDetail(id) {
        return this.http.delete(API_URL + `/evaluationDetails/${id}`);
    }
};
EvaluationDetailService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
];
EvaluationDetailService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], EvaluationDetailService);



/***/ }),

/***/ "./src/app/service/evaluation/evaluation.service.ts":
/*!**********************************************************!*\
  !*** ./src/app/service/evaluation/evaluation.service.ts ***!
  \**********************************************************/
/*! exports provided: EvaluationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EvaluationService", function() { return EvaluationService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");




const API_URL = `${_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl}`;
let EvaluationService = class EvaluationService {
    constructor(http) {
        this.http = http;
    }
    getAllEvaluation() {
        return this.http.get(API_URL + '/evaluations');
    }
    getEvaluation(id) {
        return this.http.get(API_URL + `/evaluations/${id}`);
    }
    createNewEvaluation(evaluations) {
        return this.http.post(API_URL + '/evaluations', evaluations);
    }
    updateEvaluationInfo(id, evaluations) {
        return this.http.put(API_URL + `/evaluations/${id}`, evaluations);
    }
    deleteEvaluation(id) {
        return this.http.delete(API_URL + `/evaluations/${id}`);
    }
};
EvaluationService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
];
EvaluationService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], EvaluationService);



/***/ }),

/***/ "./src/app/service/outcome/outcome.service.ts":
/*!****************************************************!*\
  !*** ./src/app/service/outcome/outcome.service.ts ***!
  \****************************************************/
/*! exports provided: OutcomeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OutcomeService", function() { return OutcomeService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");




const API_URL = `${_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl}`;
let OutcomeService = class OutcomeService {
    constructor(http) {
        this.http = http;
    }
    getAllOutcome() {
        return this.http.get(API_URL + '/outcomes');
    }
    createNewOutcome(outcome) {
        return this.http.post(API_URL + '/outcomes', outcome);
    }
    getOutcome(id) {
        return this.http.get(API_URL + `/outcomes/${id}`);
    }
    editOutcome(id, outcome) {
        return this.http.put(API_URL + `/outcomes/${id}`, outcome);
    }
    deleteOutcome(id) {
        return this.http.delete(API_URL + `/outcomes/${id}`);
    }
    findByTitle(name) {
        return this.http.get(API_URL + '/outcomes/name?name=' + name);
    }
    getAllCategoryByOutcome(id) {
        return this.http.get(API_URL + `/outcomes/${id}/categories`);
    }
};
OutcomeService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
];
OutcomeService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], OutcomeService);



/***/ }),

/***/ "./src/app/service/program/program.service.ts":
/*!****************************************************!*\
  !*** ./src/app/service/program/program.service.ts ***!
  \****************************************************/
/*! exports provided: ProgramService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgramService", function() { return ProgramService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");




const API_URL = `${_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl}`;
let ProgramService = class ProgramService {
    constructor(http) {
        this.http = http;
    }
    getAllProgram() {
        return this.http.get(API_URL + '/programs');
    }
    getProgram(id) {
        return this.http.get(API_URL + `/programs/${id}`);
    }
    createNewProgram(program) {
        return this.http.post(API_URL + '/programs', program);
    }
    updateProgram(id, program) {
        return this.http.put(API_URL + `/programs/${id}`, program);
    }
    deleteProgram(id) {
        return this.http.delete(API_URL + `/programs/${id}`);
    }
    getProgramByName(name) {
        return this.http.get(API_URL + '/programs/name?name=' + name);
    }
    getAllClassByProgram(id) {
        return this.http.get(API_URL + `/programs/${id}/classes`);
    }
};
ProgramService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
];
ProgramService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], ProgramService);



/***/ }),

/***/ "./src/app/service/skill/skill.service.ts":
/*!************************************************!*\
  !*** ./src/app/service/skill/skill.service.ts ***!
  \************************************************/
/*! exports provided: SkillService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkillService", function() { return SkillService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");




const API_URL = `${_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl}`;
let SkillService = class SkillService {
    constructor(http) {
        this.http = http;
    }
    getAllSkill() {
        return this.http.get(API_URL + '/skills');
    }
    createNewSkill(skill) {
        return this.http.post(API_URL + '/skills', skill);
    }
    getSkill(id) {
        return this.http.get(API_URL + `/skills/${id}`);
    }
    editSkill(id, skill) {
        return this.http.put(API_URL + `/skills/${id}`, skill);
    }
    deleteSkill(id) {
        return this.http.delete(API_URL + `/skills/${id}`);
    }
};
SkillService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
];
SkillService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], SkillService);



/***/ }),

/***/ "./src/app/service/student/student.service.ts":
/*!****************************************************!*\
  !*** ./src/app/service/student/student.service.ts ***!
  \****************************************************/
/*! exports provided: StudentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudentService", function() { return StudentService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");




const API_URL = `${_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl}`;
let StudentService = class StudentService {
    constructor(http) {
        this.http = http;
    }
    getAllStudents() {
        return this.http.get(API_URL + '/students');
    }
    createStudent(student) {
        return this.http.post(API_URL + '/students', student);
    }
    getStudent(id) {
        return this.http.get(API_URL + `/students/${id}`);
    }
    updateStudent(id, student) {
        return this.http.put(API_URL + `/students/${id}`, student);
    }
    deleteStudent(id) {
        return this.http.delete(API_URL + `/students/${id}`);
    }
};
StudentService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
];
StudentService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], StudentService);



/***/ }),

/***/ "./src/app/service/template/template.service.ts":
/*!******************************************************!*\
  !*** ./src/app/service/template/template.service.ts ***!
  \******************************************************/
/*! exports provided: TemplateService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateService", function() { return TemplateService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");




const API_URL = `${_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl}`;
let TemplateService = class TemplateService {
    constructor(http) {
        this.http = http;
    }
    getAllTemplate() {
        return this.http.get(API_URL + '/templates');
    }
    createNewTemplate(template) {
        return this.http.post(API_URL + '/templates', template);
    }
    getTemplate(id) {
        return this.http.get(API_URL + `/templates/${id}`);
    }
    updateTemplate(id, template) {
        return this.http.put(API_URL + `/templates/${id}`, template);
    }
    deleteTemplate(id) {
        return this.http.delete(API_URL + `/templates/${id}`);
    }
};
TemplateService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
];
TemplateService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], TemplateService);



/***/ })

}]);
//# sourceMappingURL=common-es2015.js.map