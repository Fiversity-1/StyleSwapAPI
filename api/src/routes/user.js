"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUser = postUser;
const db_1 = require("../db");
const User_1 = require("../db/User");
const helpful_helpers_1 = require("./helpful_helpers");
function postUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("New User Added!");
        const { userId } = req.params;
        let { loc } = req.body;
        if (!loc) {
            loc = "help";
        }
        if (!userId) {
            res.status(400).json('Missing userId');
            console.warn("Missing userId when adding a user!");
            return;
        }
        const userRepository = (0, db_1.getConnection)().getRepository(User_1.User);
        const newUser = new User_1.User();
        const encryptedLocation = (0, helpful_helpers_1.encrypt)(loc);
        newUser.location = encryptedLocation;
        newUser.userId = userId;
        newUser.picture = "help";
        // Add picture logic
        const savedUser = yield userRepository.save(newUser);
        res.status(201).json('Made a user');
    });
}
