"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var rating_1 = require('./rating');
var log_decorator_1 = require('../decorators/log-decorator');
var Book = (function () {
    function Book(title, publisher) {
        this.ratings = [];
        this.title = title;
        this.publisher = publisher;
    }
    Book.prototype.addRating = function (username, rating, comment) {
        // console.log(`addRating method called with args: ${JSON.stringify(arguments)}`);
        var ratingObj = new rating_1.default(username, rating, comment);
        this.ratings.push(ratingObj);
        // console.log(`addRating method return value: ${JSON.stringify(ratingObj)}`);
        return ratingObj;
    };
    __decorate([
        log_decorator_1.default
    ], Book.prototype, "addRating", null);
    return Book;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Book;
