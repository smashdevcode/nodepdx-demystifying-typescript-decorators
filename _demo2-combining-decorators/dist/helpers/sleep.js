"use strict";
function sleep(s) {
    var e = new Date().getTime() + (s * 1000);
    while (new Date().getTime() <= e) { }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sleep;
