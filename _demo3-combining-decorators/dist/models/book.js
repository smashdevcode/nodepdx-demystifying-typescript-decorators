"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var rating_1 = require('./rating');
// import log from '../decorators/log-decorator';
// import perf from '../decorators/perf-decorator';
// import memoize from '../decorators/memoize-decorator';
var decorators_1 = require('../decorators');
var sleep_1 = require('../helpers/sleep');
var Book = (function () {
    function Book(title, publisher) {
        this.ratings = [];
        this.title = title;
        this.publisher = publisher;
    }
    Book.prototype.addRating = function (username, rating, comment) {
        sleep_1.default(1);
        var ratingObj = new rating_1.default(username, rating, comment);
        this.ratings.push(ratingObj);
        return ratingObj;
    };
    Book.prototype.toJSON = function () {
        return {
            title: this.title,
            publisher: this.publisher,
            ratings: this.ratings
        };
    };
    __decorate([
        decorators_1.log
    ], Book.prototype, "title", void 0);
    __decorate([
        decorators_1.log
    ], Book.prototype, "publisher", void 0);
    __decorate([
        decorators_1.log,
        decorators_1.perf,
        decorators_1.memoize
    ], Book.prototype, "addRating", null);
    Book = __decorate([
        decorators_1.log
    ], Book);
    return Book;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Book;
