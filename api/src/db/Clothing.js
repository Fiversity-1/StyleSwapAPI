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
exports.Clothing = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const enums_1 = require("../enums");
let Clothing = class Clothing {
};
exports.Clothing = Clothing;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Clothing.prototype, "clothingId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: false }),
    (0, typeorm_1.JoinColumn)({
        name: 'userId',
        referencedColumnName: 'userId',
    }),
    __metadata("design:type", User_1.User)
], Clothing.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], Clothing.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], Clothing.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Clothing.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        array: true,
        enum: enums_1.Colour,
        nullable: false
    }),
    __metadata("design:type", Array)
], Clothing.prototype, "colour", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Object)
], Clothing.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.Gender,
        default: enums_1.Gender.UNISEX
    }),
    __metadata("design:type", String)
], Clothing.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.Condition,
        nullable: false
    }),
    __metadata("design:type", String)
], Clothing.prototype, "condition", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.Style,
        nullable: true
    }),
    __metadata("design:type", Object)
], Clothing.prototype, "style", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.Type,
        nullable: false
    }),
    __metadata("design:type", String)
], Clothing.prototype, "type", void 0);
exports.Clothing = Clothing = __decorate([
    (0, typeorm_1.Entity)()
], Clothing);
