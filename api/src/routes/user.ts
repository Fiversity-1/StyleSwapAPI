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

src/routes/user.ts

The entire point of this file is to manage the user based routes for the API.

It manages posting a user, swiping, blocking and unmatching other users.

These function are all exported out to the based src/routes/routes.ts where they
are set up with the router so that they can be used in the API.

unmatch() here is not exported as it is used in block as well, as such is taken out
and used in both unmatch_handles (with handles unmatching through the API) and block.

*/

import { Request, Response } from 'express';

import { getConnection } from '../db';
import { User as UserDb } from '../db/User';
import { Clothing as ClothingDb } from '../db/Clothing';

import {
    UserBodyParams,
    UserRouteParams,
    SwipeRouteParams,
    SwipeQueryParams,
    BlockRouteParams
} from '../types';

import { encrypt } from './helpful_helpers';

import { In } from 'typeorm';
/*

postUser
========
Inputs:
req: Request<UserRouteParams, any, UserBodyParams>
res: Response

Second type in Request is never used, so any is fine. UserRouteParams and UserBodyParams is defined in ../types.ts

Outputs:
void

Response is handled by the input res

Purpose:

Creates a new user in the database given the params, i.e. userId (gotten from firebase), lat, lon (location data) and their bio.

*/
export async function postUser(req: Request<UserRouteParams, any, UserBodyParams>, res: Response) {
    const { userId } = req.params;

    let { lat, lon, bio, name, image } = req.body;

    if (!lat || !lon) {
        res.status(400).json('Missing location, send the addy');
        console.log("bad loc");
	return;
    }

    if (!name) {
	    res.status(400).json("Missing name");
        	console.log("bad name");
	    return;
    }

    if (!image) {
	    res.status(400).json("missing image");
        	console.log("bad image");
	    return;
    }

    if (!userId) {
        res.status(400).json('Missing userId');
        console.warn("Missing userId when adding a user!");
        return;
    }

    const userRepository = getConnection().getRepository(UserDb);

    const user = await userRepository.findOne( { where: { userId } });

    if (user) {
	    res.status(400).json("User already in database");
        	console.log("dup user");
	    return;
    }

    const newUser = new UserDb();

    newUser.lat = encrypt(lat);
    newUser.lon = encrypt(lon);

    newUser.userId = userId;
    newUser.image = Buffer.from(image, 'base64');
    newUser.bio = bio;
    newUser.name = name;

    const savedUser = await userRepository.save(newUser);

    res.status(201).json('Made a user');
    console.log("Made a user");
}

/*

getUser
========
Inputs:
req: Request<UserRouteParams>
res: Response

Outputs:
void

Response is handled by the input res

Purpose:

Gets user information in particular the users they have matched with, their bio and their own userId (cause why not?)

*/
export async function getUser(req: Request<UserRouteParams>, res: Response) {
    const { userId } = req.params;
    
    if (!userId) {
        res.status(400).json('Missing userId');
        console.warn("Missing userId when adding a user!");
        return;
    }

    const userRepository = getConnection().getRepository(UserDb);

    let user = await userRepository.findOne({ 
	    select: ["userId", "image","name", "bio", "matched"],
	    where: { userId } });

    if (!user) {
	res.status(404).json('No user found');
	return;
    }

    const returnUser:any = user
    returnUser.image = user.image.toString('base64');

    res.status(200).json(user);
}

/*

swipe
========
Inputs:
req: Request<SwipeRouteParams, any, any, SwipeQueryParams>
res: Response

Second and third type in Request is never used, so any is fine. SwipeRouteParams and SwipeQueryParams is defined in ../types.ts

Outputs:
void

Response is handled by the input res

Purpose:

Takes in a user, and the clothing item the swiped on, and which they did (like / dislike). From there adds them to the correct list, either liked, or dislike and if match, return the match.

*/
export async function swipe(req: Request<SwipeRouteParams, any, any, SwipeQueryParams>, res: Response) {

    const { userId, clotheId } = req.params;

    let { like } = req.query;

    if (!userId || !clotheId) {
        res.status(400).json('Missing userId or clotheId');
	return;
    }

    const userRepository = getConnection().getRepository(UserDb);

    let user = await userRepository.findOne({ where: { userId} });

    if (!user) {
	res.status(404).json('No user found');
	return;
    }

    const clothingRepository = getConnection().getRepository(ClothingDb);

    const clothe = await clothingRepository.findOne({ where: { clothingId: clotheId } });

    if (!clothe) {
	res.status(404).json('No Clothing item found');
	return;
    }

    const userId2 = clothe.userId;

    let user2 = await userRepository.findOne({ where: { userId: userId2 } });

    if (!user2) {
	res.status(500).json('Clothing item does not match an alive user');
	return;
    }

    // Some of the best code ever writtern!!!
    // I would like to thank my dad and my cat for this one!!!
    // 
    // Handles the case where like is not filled in as it is optional
    // and in that case it is assumed to be a like
    if (like !== false) {
	like = true;
    }

    // Like/Dislike the clothing item in user 1
    if (like) {
	user.liked.push(clotheId);
    } else {
	user.disliked.push(clotheId);
    	res.status(201).json('Clothing Item Disliked');
    	await userRepository.save(user)
    	await userRepository.save(user2)
	return;
    }

    // Only liked clothes from here on
    // Has user 2 already liked something from user 1

    // Get all clothing items from user 1
    const userClothes = await clothingRepository.find({ where: { userId } });

    // Is one of their id's within user.liked?
    let matches = userClothes.filter(clothe => user2.liked.includes(clothe.clothingId));


    // Return the clothes
    if (matches.length == 0) {
	   res.status(201).json("Liked but no matches");
    	   await userRepository.save(user)
    	   await userRepository.save(user2)
	   return;
    }

    // Put all of these clothes in the match field
    
    const userClothes2 = await clothingRepository.find({ where: { userId: userId2 } });

    // Is one of their id's within user.liked?
    let matches2 = userClothes2.filter(clothe => user.liked.includes(clothe.clothingId));

    user.matched.push(...matches2.map(item => item.clothingId));
    user.matched.push(clotheId);
    // Put all of these clothes in the match field
    user2.matched.push(...matches.map(item => item.clothingId));

    await userRepository.save(user)
    await userRepository.save(user2)

    const returnItems = matches2.map(obj => ({
	...obj,
	images: obj.images.map(imageBuffer => imageBuffer.toString('base64'))
    }));
    
    res.status(200).json(returnItems);
}


export async function get_match(req: Request<BlockRouteParams>, res: Response) {

    const { userId1, userId2 } = req.params;

    if (!userId1 || !userId2) {
        res.status(400).json('Missing userId or clotheId');
	return;
    }

    const userId = userId1;

    const userRepository = getConnection().getRepository(UserDb);

    let user = await userRepository.findOne({ where: { userId} });

    if (!user) {
	res.status(404).json('No user found');
	return;
    }

    const clothingRepository = getConnection().getRepository(ClothingDb);

    let user2 = await userRepository.findOne({ where: { userId: userId2 } });

    if (!user2) {
	res.status(500).json('Clothing item does not match an alive user');
	return;
    }
    const userClothes = await clothingRepository.find({ where: { userId } });

    // Is one of their id's within user.liked?
    let matches = userClothes.filter(clothe => user2.liked.includes(clothe.clothingId));

    // Return the clothes
    if (matches.length == 0) {
	   res.status(200).json("no matches");
	   return;
    }

    // Put all of these clothes in the match field
    user.matched.push(...matches.map(item => item.clothingId));
    
    const userClothes2 = await clothingRepository.find({ where: { userId: userId2 } });

    // Is one of their id's within user.liked?
    let matches2 = userClothes2.filter(clothe => user.liked.includes(clothe.clothingId));
    
    // Put all of these clothes in the match field
    user2.matched.push(...matches2.map(item => item.clothingId));

    await userRepository.save(user)
    await userRepository.save(user2)

    const matches1org = matches.map(obj => ({
	...obj,
	images: obj.images.map(imageBuffer => imageBuffer.toString('base64'))
    }));
    const matches2org = matches2.map(obj => ({
	...obj,
	images: obj.images.map(imageBuffer => imageBuffer.toString('base64'))
    }));

    const returnItems = {
	    toTrade: matches1org,
	    toRecv: matches2org
    };
    
    res.status(200).json(returnItems);
}

/*

block
========
Inputs:
req: Request<BlockRouteParams>
res: Response

BlockRouteParams is defined in ../types.ts

Outputs:
void

Response is handled by the input res

Purpose:

Takes in two userIds, user1 and user2, where user1 should block user2. First unmatch() is called to have these no longer matched, then user1, adds user2 to the blocked array.
It is a one way block, i.e. user2 can still see user1, but user1 cannot see user2.

This may need to change based on User feedback, but if it is still here, we were told this is what they expect.

*/
export async function block(req: Request<BlockRouteParams>, res: Response) {
	// User 1 is blocking User 2
	const { userId1, userId2 } = req.params;

	// Make sure the users are legit

	const userRepository = getConnection().getRepository(UserDb);

	const user1 = await userRepository.findOne({ where: { userId: userId1 } });
	const user2 = await userRepository.findOne({ where: { userId: userId2 } });

	if (!user2 || !user1) {
		res.status(404).json("User not found");
		return;
	}

	// Remove them from the matched array from each other, good is 201 anything else is bad
	const eno = await unmatch(userId1, userId2);
	if (eno !== 201) {
		res.status(eno).json("Error occured when unmatching the users");
	}

	// Add them to the block array, only user1 is blocking user2
	// As such it is a one way block type shit
	user1.blocked.push(userId2);

	await userRepository.save(user1);

	res.status(200).json("Get Blocked Nerd!");
}

/*

unmatch_handles
========
Inputs:
req: Request<BlockRouteParams>
res: Response

BlockRouteParams is defined in ../types.ts

Outputs:
void

Response is handled by the input res

Purpose:

Is a wrapper so that there is less code dup, pretty much just calls unmatch().

*/
export async function unmatch_handles(req: Request<BlockRouteParams>, res: Response) {
	const { userId1, userId2 } = req.params;

	const eno = await unmatch(userId1, userId2);

	if (eno !== 201) {
		res.status(eno).json("There was an error unmatching");
		return;
	}

	res.status(eno).json("Unmatched successfully");
}

/*

match_handles
========
Inputs:
req: Request<BlockRouteParams>
res: Response

BlockRouteParams is defined in ../types.ts

Outputs:
void

Response is handled by the input res

Purpose:

Is a wrapper so that there is less code dup, pretty much just calls unmatch().

*/
export async function match_handles(req: Request<UserRouteParams>, res: Response) {
	const { userId } = req.params;

	const userRepo = getConnection().getRepository(UserDb);
	const user = await userRepo.findOne({ where: { userId } });

	if (!user ) {
		res.status(404).json("Missing userId")
		return;
	}

	const clothingRepo = getConnection().getRepository(ClothingDb);

	const clothes = await clothingRepo.find({ where: { clothingId: In(user.matched)  }});
	
	res.status(200).json(clothes);
}

/*

unmatch
========
Inputs:
userId1: The first user's id
userId2: The second user's id

Outputs:
number

The code to return i.e. 404 if users were not found.

Purpose:

Removes the users from the others matched list, this is called both in unmatch_handles and block.

*/
async function unmatch(userId1: string, userId2: string): Promise<number> {
	const userRepo = getConnection().getRepository(UserDb);

	const user1 = await userRepo.findOne({ where: { userId: userId1 } });
	const user2 = await userRepo.findOne({ where: { userId: userId2 } });

	if (!user2 || !user1) {
		return 404;
	}

	const clothesRepo = getConnection().getRepository(ClothingDb);
	const user1Clothes = await clothesRepo.find({ where: { userId: userId1 } });
	const user2Clothes = await clothesRepo.find({ where: { userId: userId2 } });

	const remove1 = user1Clothes.map(item => item.clothingId);
	const remove2 = user2Clothes.map(item => item.clothingId);

	// Remove the userId of one user from the matched array in the other user
	user1.matched = user1.matched.filter(id => !remove2.includes(id));
	user2.matched = user2.matched.filter(id => !remove1.includes(id));

	await userRepo.save(user1);
	await userRepo.save(user2);
	return 201;
}

