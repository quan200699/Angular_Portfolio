function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["student-student-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/student/list-student/list-student.component.html":
  /*!********************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/student/list-student/list-student.component.html ***!
    \********************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppStudentListStudentListStudentComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<section class=\"content\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"card\">\r\n      <div class=\"card-header\">\r\n        <h3 class=\"card-title\">Bordered Table</h3>\r\n      </div>\r\n      <div class=\"card-body\">\r\n        <table class=\"table table-bordered\">\r\n          <thead>\r\n          <tr>\r\n            <th style=\"width: 10px\">#</th>\r\n            <th>Mã học viên</th>\r\n            <th>Họ tên học viên</th>\r\n          </tr>\r\n          </thead>\r\n          <tbody>\r\n          <tr *ngFor=\"let student of studentList; index as i\">\r\n            <td>{{i + 1}}</td>\r\n            <td>{{student.studentId}}</td>\r\n            <td>{{student.name}}</td>\r\n          </tr>\r\n          <tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n      <div class=\"card-footer clearfix\">\r\n        <ul class=\"pagination pagination-sm m-0 float-right\">\r\n          <li class=\"page-item\"><a class=\"page-link\" href=\"#\">&laquo;</a></li>\r\n          <li class=\"page-item\"><a class=\"page-link\" href=\"#\">1</a></li>\r\n          <li class=\"page-item\"><a class=\"page-link\" href=\"#\">2</a></li>\r\n          <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\r\n          <li class=\"page-item\"><a class=\"page-link\" href=\"#\">&raquo;</a></li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</section>\r\n";
    /***/
  },

  /***/
  "./src/app/service/student.service.ts":
  /*!********************************************!*\
    !*** ./src/app/service/student.service.ts ***!
    \********************************************/

  /*! exports provided: StudentService */

  /***/
  function srcAppServiceStudentServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "StudentService", function () {
      return StudentService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../environments/environment */
    "./src/environments/environment.ts");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/fesm2015/http.js");

    var API_URL = "".concat(_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl);

    var StudentService = /*#__PURE__*/function () {
      function StudentService(http) {
        _classCallCheck(this, StudentService);

        this.http = http;
      }

      _createClass(StudentService, [{
        key: "getAllStudents",
        value: function getAllStudents() {
          return this.http.get(API_URL + '/students');
        }
      }]);

      return StudentService;
    }();

    StudentService.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]
      }];
    };

    StudentService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    })], StudentService);
    /***/
  },

  /***/
  "./src/app/student/list-student/list-student.component.css":
  /*!*****************************************************************!*\
    !*** ./src/app/student/list-student/list-student.component.css ***!
    \*****************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppStudentListStudentListStudentComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3N0dWRlbnQvbGlzdC1zdHVkZW50L2xpc3Qtc3R1ZGVudC5jb21wb25lbnQuY3NzIn0= */";
    /***/
  },

  /***/
  "./src/app/student/list-student/list-student.component.ts":
  /*!****************************************************************!*\
    !*** ./src/app/student/list-student/list-student.component.ts ***!
    \****************************************************************/

  /*! exports provided: ListStudentComponent */

  /***/
  function srcAppStudentListStudentListStudentComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ListStudentComponent", function () {
      return ListStudentComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _service_student_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../../service/student.service */
    "./src/app/service/student.service.ts");

    var ListStudentComponent = /*#__PURE__*/function () {
      function ListStudentComponent(studentService) {
        _classCallCheck(this, ListStudentComponent);

        this.studentService = studentService;
      }

      _createClass(ListStudentComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.getStudentList();
        }
      }, {
        key: "getStudentList",
        value: function getStudentList() {
          var _this = this;

          this.studentService.getAllStudents().subscribe(function (students) {
            _this.studentList = students;
          });
        }
      }]);

      return ListStudentComponent;
    }();

    ListStudentComponent.ctorParameters = function () {
      return [{
        type: _service_student_service__WEBPACK_IMPORTED_MODULE_2__["StudentService"]
      }];
    };

    ListStudentComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-list-student',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./list-student.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/student/list-student/list-student.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./list-student.component.css */
      "./src/app/student/list-student/list-student.component.css"))["default"]]
    })], ListStudentComponent);
    /***/
  },

  /***/
  "./src/app/student/student-routing.module.ts":
  /*!***************************************************!*\
    !*** ./src/app/student/student-routing.module.ts ***!
    \***************************************************/

  /*! exports provided: StudentRoutingModule */

  /***/
  function srcAppStudentStudentRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "StudentRoutingModule", function () {
      return StudentRoutingModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _list_student_list_student_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./list-student/list-student.component */
    "./src/app/student/list-student/list-student.component.ts");

    var routes = [{
      path: '',
      component: _list_student_list_student_component__WEBPACK_IMPORTED_MODULE_3__["ListStudentComponent"]
    }];

    var StudentRoutingModule = function StudentRoutingModule() {
      _classCallCheck(this, StudentRoutingModule);
    };

    StudentRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], StudentRoutingModule);
    /***/
  },

  /***/
  "./src/app/student/student.module.ts":
  /*!*******************************************!*\
    !*** ./src/app/student/student.module.ts ***!
    \*******************************************/

  /*! exports provided: StudentModule */

  /***/
  function srcAppStudentStudentModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "StudentModule", function () {
      return StudentModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _student_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./student-routing.module */
    "./src/app/student/student-routing.module.ts");
    /* harmony import */


    var _list_student_list_student_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./list-student/list-student.component */
    "./src/app/student/list-student/list-student.component.ts");

    var StudentModule = function StudentModule() {
      _classCallCheck(this, StudentModule);
    };

    StudentModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      declarations: [_list_student_list_student_component__WEBPACK_IMPORTED_MODULE_4__["ListStudentComponent"]],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _student_routing_module__WEBPACK_IMPORTED_MODULE_3__["StudentRoutingModule"]]
    })], StudentModule);
    /***/
  }
}]);
//# sourceMappingURL=student-student-module-es5.js.map