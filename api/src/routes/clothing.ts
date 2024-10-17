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

import { Request, Response } from 'express';
import { NotBrackets, In } from 'typeorm';

import {
    UserRouteParams,
    ClothingBodyParams,
    ClothingGetBodyParams,
    ClothingRouteParams,
    MatchRouteParams
} from '../types';

import { getConnection } from '../db';
import { Clothing as ClothingDb } from '../db/Clothing';
import { User as UserDb } from '../db/User';
import {
    encrypt,
    decrypt,
    calculateDistance
} from './helpful_helpers';

import { 
    Size
} from '../enums';

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
export async function postClothing(req: Request<UserRouteParams, any, ClothingBodyParams>, res: Response) {
    const { userId } = req.params;
    const {
        colour,
        size,
        condition,
        gender,
        style,
        bio,
        type,
	images
    } = req.body; // The inputs / tags / information about the clothing piece to add

    // Basic error checking to make sure needed information is here
    if (!userId) {
        res.status(400).json('Missing userId');
        return;
    }

    if (!colour || !size || !condition || !type || !bio) {
        res.status(400).json('Missing information');
        return;
    }

    const userRepository = getConnection().getRepository(UserDb);
    const user = await userRepository.findOne({ where: { userId } });

    if (!user) {
        res.status(404).json("User not found");
        return;
    }

    const clothingRepository = getConnection().getRepository(ClothingDb);

    // Makes a new clothing item and puts the information in it.
    const newItem = new ClothingDb();

    newItem.size = size;
    newItem.gender = gender;
    newItem.colour = colour;
    newItem.condition = condition;
    newItem.style = style;
    newItem.type = type;
    newItem.bio = bio;
    newItem.userId = userId;
    newItem.images = images.map(image => Buffer.from(image, 'base64'));


    const savedItem = await clothingRepository.save(newItem)

    res.status(201).json({ itemId: savedItem.clothingId });
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
export async function getClothing(req:Request<UserRouteParams, any, ClothingGetBodyParams>, res: Response) {
    const { userId } = req.params;
    let amount = req.query.amount ?? 20;

    let {
        colour,
        size,
        condition,
        gender,
        type,
        distance,
	search
    } = req.body; // The filters that will limit the search

    // Get the user and make sure they are legit
    const userRepository = getConnection().getRepository(UserDb);
    const user = await userRepository.findOne({ where: {userId} });

    if (!user) {
        res.status(404).json("User not found");
        return;
    }

    // Get the previous liked and disliked items from that user so we can't give dups
    const liked = user.liked;
    const disliked = user.liked;

    const lat = user.lat;
    const lon = user.lon;

    const clothingRepository = getConnection().getRepository(ClothingDb);

    // Make a dynamic query builder
    const queryBuilder = clothingRepository.createQueryBuilder('item');

    queryBuilder.leftJoinAndSelect("item.user", "user");
    queryBuilder.select(["item", "user.userId", "user.name", "user.lat", "user.lon"]);

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

    if (type) {
        queryBuilder.andWhere('item.type IN (:...type)', { type });
    }

    // It has not been liked / disliked before
    queryBuilder.andWhere(
        new NotBrackets((qb) => {
            qb.where('item.clothingId IN (:...liked)', { liked })
            .orWhere('item.clothingId IN (:...disliked)', { disliked })
        }),
    );

    // Not the user's own clothes        
    queryBuilder.andWhere('item.userId != :userId', { userId });

    // And where the clothes' user has not been blocked by the user who is searching
    const blocked = user.blocked;
    queryBuilder.andWhere('item.userId NOT IN (:...userId)', { blocked });

    // Max amount items returned
    queryBuilder.limit(Number(amount));

    // Return
    let items = await queryBuilder.getMany();

    if (distance) {
    	items = items
	  .map(item => ({
	    ...item,
	    distance: calculateDistance(item.user.lat, item.user.lon, user.lat, user.lon),
	  }))
	  .filter(item => item.distance <= distance);
     } else {
     
    	items = items
	  	.map(item => ({
	    	...item,
	    	distance: calculateDistance(item.user.lat, item.user.lon, user.lat, user.lon),
			  }));
     }

    // Remove lat and lon from the user in the result set cause we dont want to return (even tho they are encrypted)
    const sanitizedItems = items.map(item => {
      if (item.user) {
        // Remove the properties
	item.user.lat = "";
    	item.user.lon = "";
      }
      return item;
    });

    const returnItems = sanitizedItems.map(obj => ({
	...obj,
	images: obj.images.map(imageBuffer => imageBuffer.toString('base64'))
    }));

    res.status(200).json(returnItems);
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
export async function getUserClothing(req:Request<UserRouteParams>, res: Response) {
    const { userId } = req.params;

    const userRepository = getConnection().getRepository(UserDb);
    const user = await userRepository.findOne({ where: {userId} });

    if (!user) {
        res.status(404).json("User not found");
        return;
    }

    const clothingRepository = getConnection().getRepository(ClothingDb);
    const items = await clothingRepository.find({ where: { userId } });

    const returnItems = items.map(obj => ({
	...obj,
	images: obj.images.map(imageBuffer => imageBuffer.toString('base64'))
    }));

    res.status(200).json(returnItems);
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
export async function deleteClothing(req:Request<ClothingRouteParams>, res: Response) {
    const { userId, clothingId } = req.params;

    const userRepository = getConnection().getRepository(UserDb);
    const user = await userRepository.findOne({ where: {userId} });

    if (!user) {
        res.status(404).json("User not found");
        return;
    }

    const clothingRepository = getConnection().getRepository(ClothingDb);
    const item = await clothingRepository.findOne({ where: { clothingId: clothingId } });

    if (!item) {
        res.status(404).json("Item not found");
        return;
    }

    // Users should not be allowed to delete items that are not their own
    if (item.userId !== userId) {
        res.status(403).json("Not allowed to delete this item");
        return;
    }

    await clothingRepository.remove(item);

    res.status(203).json("Item deleted");
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
export async function getLikedClothing(req:Request<UserRouteParams>, res: Response) {
    const { userId } = req.params;

    const userRepository = getConnection().getRepository(UserDb);
    const user = await userRepository.findOne({ where: {userId} });

    if (!user) {
        res.status(404).json("User not found");
        return;
    }

    const clothingRepository = getConnection().getRepository(ClothingDb);
    const items = await clothingRepository.find({ where: { clothingId: In(user.liked) } });

    res.status(200).json(items);
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
export async function patchClothing(req:Request<ClothingRouteParams, any, ClothingBodyParams>, res: Response) {
    const { userId, clothingId } = req.params;
    const {
        colour,
        size,
        condition,
        gender,
        style,
        bio,
        type
    } = req.body;

    // Validate userId
    const userRepository = getConnection().getRepository(UserDb);
    const user = await userRepository.findOne({ where: {userId} });

    if (!user) {
        res.status(404).json('User not found');
        return;
    }

    // Validate clothingId
    const clothingRepository = getConnection().getRepository(ClothingDb);
    const item = await clothingRepository.findOne({ where: { clothingId } });

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

    await clothingRepository.save(item);

    res.status(200).json('Item updated');
    return;
}


export async function match_item(req:Request<MatchRouteParams>, res:Response) {
    const { userId, clotheId } = req.params;
    const userRepo = getConnection().getRepository(UserDb);
    const user = await userRepo.findOne({ where: {userId} });

    const clothingId = clotheId;

    if (!user) {
        res.status(404).json('User not found');
        return;
    }

    // Validate clothingId
    const clothingRepository = getConnection().getRepository(ClothingDb);
    const item = await clothingRepository.findOne({ where: { clothingId } });

    if (!item) {
        res.status(404).json('Item not found');
        return;
    }

    user.matched.push(clotheId);
    await userRepo.save(user);
    res.status(200).json("Item matched");
}

export async function unmatch_item(req:Request<MatchRouteParams>, res:Response) {
    const { userId, clotheId } = req.params;
    const userRepo = getConnection().getRepository(UserDb);
    const user = await userRepo.findOne({ where: {userId} });

    const clothingId = clotheId;

    if (!user) {
        res.status(404).json('User not found');
        return;
    }

    // Validate clothingId
    const clothingRepository = getConnection().getRepository(ClothingDb);
    const item = await clothingRepository.findOne({ where: { clothingId } });

    if (!item) {
        res.status(404).json('Item not found');
        return;
    }

    user.matched = user.matched.filter(value=> value !== clothingId);
    await userRepo.save(user);
    res.status(200).json("Item matched");
}

export async function get_matches_user(req:Request<UserRouteParams>, res:Response) {
	const { userId } = req.params;
	const userRepo = getConnection().getRepository(UserDb);
        const user = await userRepo.findOne({ where: {userId} });

        if (!user) {
            res.status(404).json('User not found');
            return;
        }

        // Validate clothingId
        const clothingRepository = getConnection().getRepository(ClothingDb);
	const queryBuilder = clothingRepository.createQueryBuilder('item');
	queryBuilder.leftJoinAndSelect("item.user", "user");

	queryBuilder.select(["user.userId", "user.image", "user.name", "item.clothingId"]);
	const matches = [...new Set(user.matched)];
	queryBuilder.andWhere('item.clothingId IN (:...matches)', { matches });
	const items = await queryBuilder.getMany();
	const users = items.map(item => item.user);
	const nome = users.filter(user => user.userId !== userId);
	const uniqueUsers = Array.from(
  		new Map(nome.map(item => [item.userId, item])).values()
	);

    	const returnItems = uniqueUsers.map(obj => ({
		...obj,
		image: obj.image.toString('base64')
    	}));
	res.status(200).json(returnItems);
}
