(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-module"],{

/***/ "./src/app/admin/admin-routing.module.ts":
/*!***********************************************!*\
  !*** ./src/app/admin/admin-routing.module.ts ***!
  \***********************************************/
/*! exports provided: AdminRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminRoutingModule", function() { return AdminRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _helper_admin_auth_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helper/admin-auth-guard */ "./src/app/helper/admin-auth-guard.ts");




const routes = [
    {
        path: 'student-management',
        canActivate: [_helper_admin_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AdminAuthGuard"]],
        loadChildren: () => Promise.all(/*! import() | student-student-module */[__webpack_require__.e("common"), __webpack_require__.e("student-student-module")]).then(__webpack_require__.bind(null, /*! ../student/student.module */ "./src/app/student/student.module.ts")).then(module => module.StudentModule)
    },
    {
        path: 'coach-management',
        loadChildren: () => Promise.all(/*! import() | coach-coach-module */[__webpack_require__.e("common"), __webpack_require__.e("coach-coach-module")]).then(__webpack_require__.bind(null, /*! ../coach/coach.module */ "./src/app/coach/coach.module.ts")).then(module => module.CoachModule)
    },
    {
        path: 'program-management',
        loadChildren: () => Promise.all(/*! import() | program-program-module */[__webpack_require__.e("common"), __webpack_require__.e("program-program-module")]).then(__webpack_require__.bind(null, /*! ../program/program.module */ "./src/app/program/program.module.ts")).then(module => module.ProgramModule)
    },
    {
        path: 'classes-management',
        loadChildren: () => Promise.all(/*! import() | classes-classes-module */[__webpack_require__.e("common"), __webpack_require__.e("classes-classes-module")]).then(__webpack_require__.bind(null, /*! ../classes/classes.module */ "./src/app/classes/classes.module.ts")).then(module => module.ClassesModule)
    },
    {
        path: 'template-management',
        loadChildren: () => Promise.all(/*! import() | template-template-module */[__webpack_require__.e("common"), __webpack_require__.e("template-template-module")]).then(__webpack_require__.bind(null, /*! ../template/template.module */ "./src/app/template/template.module.ts")).then(module => module.TemplateModule)
    },
    {
        path: 'outcome-management',
        loadChildren: () => Promise.all(/*! import() | outcome-outcome-module */[__webpack_require__.e("common"), __webpack_require__.e("outcome-outcome-module")]).then(__webpack_require__.bind(null, /*! ../outcome/outcome.module */ "./src/app/outcome/outcome.module.ts")).then(module => module.OutcomeModule)
    },
    {
        path: 'category-management',
        loadChildren: () => Promise.all(/*! import() | category-category-module */[__webpack_require__.e("common"), __webpack_require__.e("category-category-module")]).then(__webpack_require__.bind(null, /*! ../category/category.module */ "./src/app/category/category.module.ts")).then(module => module.CategoryModule)
    },
    {
        path: 'skill-management',
        loadChildren: () => Promise.all(/*! import() | skill-skill-module */[__webpack_require__.e("common"), __webpack_require__.e("skill-skill-module")]).then(__webpack_require__.bind(null, /*! ../skill/skill.module */ "./src/app/skill/skill.module.ts")).then(module => module.SkillModule)
    }
];
let AdminRoutingModule = class AdminRoutingModule {
};
AdminRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], AdminRoutingModule);



/***/ }),

/***/ "./src/app/admin/admin.module.ts":
/*!***************************************!*\
  !*** ./src/app/admin/admin.module.ts ***!
  \***************************************/
/*! exports provided: AdminModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminModule", function() { return AdminModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _admin_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./admin-routing.module */ "./src/app/admin/admin-routing.module.ts");




let AdminModule = class AdminModule {
};
AdminModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _admin_routing_module__WEBPACK_IMPORTED_MODULE_3__["AdminRoutingModule"]
        ]
    })
], AdminModule);



/***/ })

}]);
//# sourceMappingURL=admin-admin-module-es2015.js.map