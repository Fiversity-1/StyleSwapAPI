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
exports.block = block;
exports.unmatch_handles = unmatch_handles;
const db_1 = require("../db");
const User_1 = require("../db/User");
const Clothing_1 = require("../db/Clothing");
const helpful_helpers_1 = require("./helpful_helpers");
function postUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("New User Added!");
        const { userId } = req.params;
        let { lat, lon, bio } = req.body;
        if (!lat || !lon) {
            res.status(400).json('Missing location, send the addy');
            return;
        }
        if (!userId) {
            res.status(400).json('Missing userId');
            console.warn("Missing userId when adding a user!");
            return;
        }
        const userRepository = (0, db_1.getConnection)().getRepository(User_1.User);
        const newUser = new User_1.User();
        newUser.lat = (0, helpful_helpers_1.encrypt)(lat);
        newUser.lon = (0, helpful_helpers_1.encrypt)(lon);
        newUser.userId = userId;
        newUser.picture = "help";
        newUser.bio = bio;
        // Add picture logic
        const savedUser = yield userRepository.save(newUser);
        res.status(201).json('Made a user');
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
            return;
        }
        // Only liked clothes from here on
        // Has user 2 already liked something from user 1
        // Get all clothing items from user 1
        const userClothes = yield clothingRepository.find({ where: { userId } });
        // Is one of their id's within user.liked?
        let matches = userClothes.filter(clothe => user2.liked.includes(clothe.clothingId));
        // Return the clothes
        if (!matches) {
            res.status(200).json("Liked but no matches");
            return;
        }
        res.status(200).json(matches);
    });
}
function block(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // User 1 is blocking User 2
        const { userId1, userId2 } = req.params;
        // Make sure the users are legit
        const userRepository = (0, db_1.getConnection)().getRepository(User_1.User);
        const user1 = yield userRepository.findOne({ where: { userId: userId1 } });
        const user2 = yield userRepository.findOne({ where: { userId: userId2 } });
        if (!user2 || !user1) {
            res.status(404).json("User not found");
            return;
        }
        // Remove them from the matched array from each other, good is 201 anything else is bad 
        const eno = yield unmatch(userId1, userId2);
        if (eno !== 201) {
            res.status(eno).json("Error occured when unmatching the users");
        }
        // Add them to the block array, only user1 is blocking user2
        // As such it is a one way block type shit
        user1.blocked.push(userId2);
        yield userRepository.save(user1);
        res.status(200).json("Get Blocked Nerd!");
    });
}
function unmatch_handles(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId1, userId2 } = req.params;
        const eno = yield unmatch(userId1, userId2);
        if (eno !== 201) {
            res.status(eno).json("There was an error unmatching");
            return;
        }
        res.status(eno).json("Unmatched successful");
    });
}
function unmatch(userId1, userId2) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepo = (0, db_1.getConnection)().getRepository(User_1.User);
        const user1 = yield userRepo.findOne({ where: { userId: userId1 } });
        const user2 = yield userRepo.findOne({ where: { userId: userId2 } });
        if (!user2 || !user1) {
            return 404;
        }
        // Remove the userId of one user from the matched array in the other user
        user1.matched = user1.matched.filter(id => id !== userId2);
        user2.matched = user2.matched.filter(id => id !== userId1);
        yield userRepo.save(user1);
        yield userRepo.save(user2);
        return 201;
    });
}
