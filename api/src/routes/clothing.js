"use strict";
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

src/routes/clothing.ts

Defines all of the clothing related functions that are used for routes

There are some helper functions used here, those are defined within ./helpful_helpers

*/
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
exports.postClothing = postClothing;
exports.getClothing = getClothing;
exports.getUserClothing = getUserClothing;
exports.deleteClothing = deleteClothing;
exports.getLikedClothing = getLikedClothing;
exports.patchClothing = patchClothing;
const typeorm_1 = require("typeorm");
const db_1 = require("../db");
const Clothing_1 = require("../db/Clothing");
const User_1 = require("../db/User");
const helpful_helpers_1 = require("./helpful_helpers");
/*

postClothing
========
Inputs:
req: Request<UserRouteParams, any, ClothingBodyParams>
res: Response

Second type in Request is never used, so any is fine. UserRouteParams and ClothingBodyParams is defined in ../types.ts

Outputs:
void

Response is handled by the input res

Purpose:

Creates a new clothing piece in the database given the params

*/
function postClothing(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.params;
        const { colour, size, condition, gender, style, bio, type } = req.body; // The inputs / tags / information about the clothing piece to add
        // Basic error checking to make sure needed information is here
        if (!userId) {
            res.status(400).json('Missing userId');
            return;
        }
        if (!colour || !size || !condition || !type || !bio) {
            res.status(400).json('Missing information');
            return;
        }
        const userRepository = (0, db_1.getConnection)().getRepository(User_1.User);
        const user = yield userRepository.findOne({ where: { userId } });
        if (!user) {
            res.status(404).json("User not found");
            return;
        }
        const clothingRepository = (0, db_1.getConnection)().getRepository(Clothing_1.Clothing);
        // Makes a new clothing item and puts the information in it.
        const newItem = new Clothing_1.Clothing();
        newItem.size = size;
        newItem.gender = gender;
        newItem.colour = colour;
        newItem.condition = condition;
        newItem.style = style;
        newItem.type = type;
        newItem.bio = bio;
        newItem.userId = userId;
        const savedItem = yield clothingRepository.save(newItem);
        res.status(201).json({ itemId: savedItem.clothingId });
    });
}
/*

getClothing
========
Inputs:
req: Request<UserRouteParams, any, ClothingGetBodyParams>
res: Response

Second type in Request is never used, so any is fine. UserRouteParams and ClothingGetBodyParams is defined in ../types.ts

Outputs:
void

Response is handled by the input res

Purpose:

Retrieves all clothing items given a set of filters

*/
function getClothing(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { userId } = req.params;
        let amount = (_a = req.query.amount) !== null && _a !== void 0 ? _a : 20;
        let { colour, size, condition, gender, style, type, distance, search } = req.body; // The filters that will limit the search
        // Get the user and make sure they are legit
        const userRepository = (0, db_1.getConnection)().getRepository(User_1.User);
        const user = yield userRepository.findOne({ where: { userId } });
        if (!user) {
            res.status(404).json("User not found");
            return;
        }
        // Get the previous liked and disliked items from that user so we can't give dups
        const liked = user.liked;
        const disliked = user.liked;
        const lat = user.lat;
        const lon = user.lon;
        const clothingRepository = (0, db_1.getConnection)().getRepository(Clothing_1.Clothing);
        // TODO: Meow
        // This maybe no longer needed
        // Adds onto the arrays passed in or makes a new array to further limit the search based on the text input
        if (search) {
            const extracted = (0, helpful_helpers_1.operationExtraction)(search);
            // Add onto each of the arrays or make a new
            if (extracted.size) {
                if (!size) {
                    size = [];
                }
                size.push(...extracted.size);
            }
            if (extracted.condition) {
                if (!condition) {
                    condition = [];
                }
                condition.push(...extracted.condition);
            }
            if (extracted.gender) {
                if (!gender) {
                    gender = [];
                }
                gender.push(...extracted.gender);
            }
            if (extracted.style) {
                if (!style) {
                    style = [];
                }
                style.push(...extracted.style);
            }
            if (extracted.type) {
                if (!type) {
                    type = [];
                }
                type.push(...extracted.type);
            }
            if (extracted.colour) {
                if (!colour) {
                    colour = [];
                }
                colour.push(...extracted.colour);
            }
        }
        // Make a dynamic query builder
        const queryBuilder = clothingRepository.createQueryBuilder('item');
        queryBuilder.leftJoinAndSelect("clothing.user", "user");
        queryBuilder.select(["clothing.clothingId", "user.lat", "user.long"]);
        // If the search should be limited by this, enter the if statement and add on to the query
        if (colour) {
            queryBuilder.andWhere('ARRAY[:...colour]::text[] && item.colour::text[]', { colour });
        }
        if (size) {
            queryBuilder.andWhere('item.size IN (:...size)', { size });
        }
        if (condition) {
            queryBuilder.andWhere('item.condition IN (:...condition)', { condition });
        }
        if (gender) {
            queryBuilder.andWhere('item.gender IN (:...gender)', { gender });
        }
        if (style) {
            queryBuilder.andWhere('item.style IN (:...style)', { style });
        }
        if (type) {
            queryBuilder.andWhere('item.type IN (:...type)', { type });
        }
        // It has not been liked / disliked before
        queryBuilder.andWhere(new typeorm_1.NotBrackets((qb) => {
            qb.where('item.clothingId IN (:...liked)', { liked })
                .orWhere('item.clothingId IN (:...disliked)', { disliked });
        }));
        // Not the user's own clothes        
        queryBuilder.andWhere('item.userId != :userId', { userId });
        // And where the clothes' user has not been blocked by the user who is searching
        const blocked = user.blocked;
        queryBuilder.andWhere('item.userId IN (:...userId)', { blocked });
        // Max amount items returned
        queryBuilder.limit(Number(amount));
        // Return
        const items = yield queryBuilder.getMany();
        // Needs to be after TypeORM query
        items.filter(item => (0, helpful_helpers_1.calculateDistance)(item.user.lat, item.user.lon, user.lat, user.lon) <= distance);
        res.status(200).json(items);
        return;
    });
}
/*

getUserClothing
========
Inputs:
req: Request<UserRouteParams>
res: Response

Outputs:
void

Response is handled by the input res

Purpose:

Retrieves all clothing items from a user

*/
function getUserClothing(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.params;
        const userRepository = (0, db_1.getConnection)().getRepository(User_1.User);
        const user = yield userRepository.findOne({ where: { userId } });
        if (!user) {
            res.status(404).json("User not found");
            return;
        }
        const clothingRepository = (0, db_1.getConnection)().getRepository(Clothing_1.Clothing);
        const items = yield clothingRepository.find({ where: { userId } });
        res.status(200).json(items);
    });
}
/*

deleteClothing
========
Inputs:
req: Request<ClothingRouteParams>
res: Response

Outputs:
void

Response is handled by the input res

Purpose:

Deletes a clothing item

*/
function deleteClothing(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, clothingId } = req.params;
        const userRepository = (0, db_1.getConnection)().getRepository(User_1.User);
        const user = yield userRepository.findOne({ where: { userId } });
        if (!user) {
            res.status(404).json("User not found");
            return;
        }
        const clothingRepository = (0, db_1.getConnection)().getRepository(Clothing_1.Clothing);
        const item = yield clothingRepository.findOne({ where: { clothingId: clothingId } });
        if (!item) {
            res.status(404).json("Item not found");
            return;
        }
        // Users should not be allowed to delete items that are not their own
        if (item.userId !== userId) {
            res.status(403).json("Not allowed to delete this item");
            return;
        }
        yield clothingRepository.remove(item);
        res.status(200).json("Item deleted");
    });
}
/*

getLikedClothing
========
Inputs:
req: Request<UserRouteParams>
res: Response

Outputs:
void

Response is handled by the input res

Purpose:

Retrieves all clothing items that a user has liked

*/
function getLikedClothing(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.params;
        const userRepository = (0, db_1.getConnection)().getRepository(User_1.User);
        const user = yield userRepository.findOne({ where: { userId } });
        if (!user) {
            res.status(404).json("User not found");
            return;
        }
        const clothingRepository = (0, db_1.getConnection)().getRepository(Clothing_1.Clothing);
        const items = yield clothingRepository.find({ where: { clothingId: (0, typeorm_1.In)(user.liked) } });
        res.status(200).json(items);
    });
}
/*

patchClothing
========
Inputs:
req: Request<ClothingRouteParams, any, ClothingBodyParams>
res: Response

Outputs:
void

Response is handled by the input res

Purpose:

Edits a clothing item's tags / images TODO: images

*/
function patchClothing(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, clothingId } = req.params;
        const { colour, size, condition, gender, style, bio, type } = req.body;
        // Validate userId
        const userRepository = (0, db_1.getConnection)().getRepository(User_1.User);
        const user = yield userRepository.findOne({ where: { userId } });
        if (!userId) {
            res.status(404).json('User not found');
            return;
        }
        // Validate clothingId
        const clothingRepository = (0, db_1.getConnection)().getRepository(Clothing_1.Clothing);
        const item = yield clothingRepository.findOne({ where: { clothingId } });
        if (!item) {
            res.status(404).json('Item not found');
            return;
        }
        // Checking user owns the clothes
        if (item.userId !== userId) {
            res.status(403).json('Unauthorised to edit this item');
            return;
        }
        // Update the item
        if (colour) {
            item.colour = colour;
        }
        if (size) {
            item.size = size;
        }
        if (condition) {
            item.condition = condition;
        }
        if (gender) {
            item.gender = gender;
        }
        if (style) {
            item.style = style;
        }
        if (bio) {
            item.bio = bio;
        }
        if (type) {
            item.type = type;
        }
        yield clothingRepository.save(item);
        res.status(200).json('Item updated');
        return;
    });
}
