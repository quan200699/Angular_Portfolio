function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"], {
  /***/
  "./src/app/helper/admin-auth-guard.ts":
  /*!********************************************!*\
    !*** ./src/app/helper/admin-auth-guard.ts ***!
    \********************************************/

  /*! exports provided: AdminAuthGuard */

  /***/
  function srcAppHelperAdminAuthGuardTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AdminAuthGuard", function () {
      return AdminAuthGuard;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _service_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../service/authentication.service */
    "./src/app/service/authentication.service.ts");

    var AdminAuthGuard = /*#__PURE__*/function () {
      function AdminAuthGuard(router, authService) {
        var _this = this;

        _classCallCheck(this, AdminAuthGuard);

        this.router = router;
        this.authService = authService;
        this.authService.currentUser.subscribe(function (next) {
          _this.currentUser = next;
        });
      }

      _createClass(AdminAuthGuard, [{
        key: "canActivate",
        value: function canActivate(next, state) {
          var hasRoleAdmin = false;

          if (this.currentUser) {
            var roleList = this.currentUser.roles;

            var _iterator = _createForOfIteratorHelper(roleList),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var role = _step.value;

                if (role.authority === 'ADMIN') {
                  hasRoleAdmin = true;
                  break;
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            if (hasRoleAdmin) {
              return true;
            } else {
              this.authService.logout();
              this.router.navigate(['/', 'admin', 'dashboard'], {
                queryParams: {
                  login: true
                },
                queryParamsHandling: 'merge'
              });
              return false;
            }
          } else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/', 'admin', 'login'], {
              queryParams: {
                returnUrl: state.url
              }
            });
            return false;
          }
        }
      }, {
        key: "canActivateChild",
        value: function canActivateChild(next, state) {
          if (this.currentUser) {
            var roleList = this.currentUser.roles;
            var hasRoleAdmin = false;

            var _iterator2 = _createForOfIteratorHelper(roleList),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var role = _step2.value;

                if (role.authority === 'ADMIN') {
                  hasRoleAdmin = true;
                  break;
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            return hasRoleAdmin;
          } else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/', 'admin', 'login'], {
              queryParams: {
                returnUrl: state.url
              }
            });
            return false;
          }
        }
      }, {
        key: "canLoad",
        value: function canLoad(route, segments) {
          return true;
        }
      }]);

      return AdminAuthGuard;
    }();

    AdminAuthGuard.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]
      }, {
        type: _service_authentication_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"]
      }];
    };

    AdminAuthGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
      providedIn: 'root'
    })], AdminAuthGuard);
    /***/
  }
}]);
//# sourceMappingURL=common-es5.js.map