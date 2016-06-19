"use strict";
var rating_1 = require('./rating');
var Book = (function () {
    function Book(title, publisher) {
        this.ratings = [];
        this.title = title;
        this.publisher = publisher;
    }
    Book.prototype.addRating = function (username, rating, comment) {
        this.ratings.push(new rating_1.default(username, rating, comment));
    };
    return Book;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Book;
