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
exports.swipe = swipe;
const db_1 = require("../db");
const User_1 = require("../db/User");
const Clothing_1 = require("../db/Clothing");
const helpful_helpers_1 = require("./helpful_helpers");
function postUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
        console.log("New User Added!");
    });
}
function swipe(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, clotheId } = req.params;
        let { like } = req.query;
        console.log(userId);
        console.log(clotheId);
        if (!userId || !clotheId) {
            res.status(400).json('Missing userId or clotheId');
            return;
        }
        const userRepository = (0, db_1.getConnection)().getRepository(User_1.User);
        let user = yield userRepository.findOne({ where: { userId } });
        if (!user) {
            res.status(404).json('No user found');
            return;
        }
        const clothingRepository = (0, db_1.getConnection)().getRepository(Clothing_1.Clothing);
        const clothe = yield clothingRepository.findOne({ where: { clothingId: clotheId } });
        if (!clothe) {
            res.status(404).json('No Clothing item found');
            return;
        }
        const userId2 = clothe.userId;
        let user2 = yield userRepository.findOne({ where: { userId: userId2 } });
        if (!user2) {
            res.status(500).json('Clothing item does not match an alive user');
            return;
        }
        // Some of the best code ever writtern!!!
        // I would like to thank my dad and my cat for this one!!!
        if (like !== false) {
            like = true;
        }
        // Like/Dislike the clothing item in user 1
        if (like) {
            user.liked.push(clotheId);
        }
        else {
            user.disliked.push(clotheId);
            res.status(200).json('Clothing Item Disliked');
        }
        // Only liked clothes from here on
        // Has user 2 already liked something from user 1
        // Get all clothing items from user 1
        const userClothes = yield clothingRepository.find({ where: { userId } });
        // Is one of their id's within user.liked?
        let matches = userClothes.filter(clothe => user2.liked.includes(clothe.clothingId));
        // Return the clothes
        res.status(200).json(matches);
    });
}
