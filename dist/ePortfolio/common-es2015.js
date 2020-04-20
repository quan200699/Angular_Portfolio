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
/* harmony import */ var _service_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../service/authentication.service */ "./src/app/service/authentication.service.ts");




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
    { type: _service_authentication_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"] }
];
AdminAuthGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
        providedIn: 'root'
    })
], AdminAuthGuard);



/***/ })

}]);
//# sourceMappingURL=common-es2015.js.map