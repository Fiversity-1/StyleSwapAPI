"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
/*
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡶⢶⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⣠⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⠼⠧⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣼⠇⠀⠀⠸⣧⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣀⣴⠞⠋⢀⣠⡴⢦⣄⡀⠙⠳⣦⣀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢀⣠⡴⠟⠉⣀⣤⠾⠛⠁⠀⠀⠈⠛⠷⣦⣀⠉⠻⢦⣄⡀⠀⠀⠀
⢀⣤⠶⠛⣁⣤⠶⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠶⣤⣈⠛⠶⣤⡀
⠸⣧⣶⣿⣯⣤⣴⠶⠶⣦⣤⣤⣤⣤⣤⣤⣤⣤⣴⠶⠶⣦⣤⣽⣿⣶⣼⠇
⠀⠀⠀⠀⠀⠀⠻⠶⠶⠟⠀⠀⠀⠀⠀⠀⠀⠀⠻⠶⠶⠟⠀⠀⠀⠀⠀⠀


StyleSwapAPI
------------

src/db/User.ts

Creates the User table within the database, most information you expect to see here will not be here.

It is mostly managed by Auth0 providers as it provides optimal security.

However, location data is managed here though it is encrypted.

*/
const typeorm_1 = require("typeorm");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryColumn)()
    // Primary Key, retrieved from Auth0.
    ,
    __metadata("design:type", String)
], User.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false })
    // The user's lat, encrypted
    ,
    __metadata("design:type", String)
], User.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false })
    // The user's lon, encrypted
    ,
    __metadata("design:type", String)
], User.prototype, "lon", void 0);
__decorate([
    (0, typeorm_1.Column)()
    // The user's bio
    ,
    __metadata("design:type", String)
], User.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', array: true, default: [0] })
    // An array of the clothing ids this user has liked
    // Default is set with 0 so that there is less logic later, clothing ids start at 1 so this is not an issue
    ,
    __metadata("design:type", Array)
], User.prototype, "liked", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', array: true, default: [0] })
    // An array of the clothing ids this user has disliked
    // Default is set with 0 so that there is less logic later, clothing ids start at 1 so this is not an issue
    ,
    __metadata("design:type", Array)
], User.prototype, "disliked", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        default: [],
        type: "simple-array"
    })
    // An array of the user ids this user has matched with
    ,
    __metadata("design:type", Array)
], User.prototype, "matched", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        default: [],
        type: "simple-array"
    })
    // An array of the user ids this user has blocked
    ,
    __metadata("design:type", Array)
], User.prototype, "blocked", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
