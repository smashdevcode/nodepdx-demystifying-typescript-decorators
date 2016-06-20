"use strict";
var Rating = (function () {
    function Rating(username, rating, comment) {
        this.username = username;
        this.rating = rating;
        this.comment = comment;
    }
    return Rating;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Rating;
