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

src/routes/events.ts



*/

import { Request, Response } from 'express';

import { getConnection } from '../db';
import { User as UserDb } from '../db/User';
import { Event as EventDb } from '../db/Event';
import { Comment as CommentDb } from '../db/Comment';
import { UserComment as UserCommentDb } from '../db/UserComment';

import {
    UserBodyParams,
    UserRouteParams,
    SwipeRouteParams,
    SwipeQueryParams,
    BlockRouteParams,
    CommentBodyParams,
    EventBodyParams,
    CommentRouteParams,
    ReactQueryParams,
    EventRouteParams,
    EventQueryParams
} from '../types';

import { In } from 'typeorm';
/*

postComment
========
Inputs:
req: Request<UserRouteParams, any, CommentBodyParams>
res: Response

Second type in Request is never used, so any is fine. UserRouteParams and CommentBodyParams is defined in ../types.ts

Outputs:
void

Response is handled by the input res

Purpose:

Creates a new comment in the database given the params.

*/
export async function postComment(req: Request<UserRouteParams, any, CommentBodyParams>, res: Response) {
    const { userId } = req.params;
    const {
	eventId,
        commentText
    } = req.body;

    if (!userId || !eventId) {
	    res.status(400).json("Missing userid");
	    return;
    }

    if (!commentText) {
	    res.status(400).json("Missing comment text");
	    return;
    }

    const userRows = getConnection().getRepository(UserDb);
    const user = await userRows.findOne({ where: { userId } });

    if (!user) {
        res.status(400).json('User does not exist');
        return;
    }

    const eventRepo = getConnection().getRepository(EventDb);
    const event = await eventRepo.findOne( { where: { eventId } });

    if (!event) {
	    res.status(404).json('Event does not exist')
	    return;
    }

    const commentRepo = getConnection().getRepository(CommentDb);
    const comment = new CommentDb();

    comment.text = commentText;
    comment.userId = userId;

    const savedComment = await commentRepo.save(comment);

    event.comments.push(savedComment);

    res.status(201).json(savedComment.commentId);
}

/*

postEvent
========
Inputs:
req: Request<any, any, EventBodyParams>
res: Response

First and second type in Request is never used, so any is fine. CommentBodyParams is defined in ../types.ts

Outputs:
void

Response is handled by the input res

Purpose:

Creates a new event in the database given the params.

*/
export async function postEvent(req: Request<any, any, EventBodyParams>, res: Response) {
    const {
        title,
	host,
	location,
	when,
	bio
    } = req.body;

    if (!title || !host || !location || !when || !bio) {
	    res.status(400).json("Missing event info");
	    return;
    }

    const eventRepo = getConnection().getRepository(EventDb);
    const event = new EventDb();

    event.title = title;
    event.host = host;
    event.location = location;
    event.when = when;
    event.bio = bio;

    const savedEvent = await eventRepo.save(event);

    res.status(201).json(savedEvent.eventId);
}


export async function getEvents(req: Request<any, any, any, EventQueryParams>, res: Response) {
    const { amount } = req.query;

    const eventRepo = getConnection().getRepository(EventDb);

    const events = await eventRepo.find({ take: amount });

    res.status(200).json(events);
}

export async function getComments(req: Request<EventRouteParams, any, any, EventQueryParams>, res: Response) {
    const { amount } = req.query;
    const { eventId } = req.params;

    const eventRepo = getConnection().getRepository(EventDb);

    const event = await eventRepo.findOne({ where:  { eventId } });

    if (!event) {
        res.status(404).json("Event not found");
	return;
    }

    const commentRepo = getConnection().getRepository(CommentDb);

    const comments = await commentRepo.find({ where: { commentId: In(event.comments) } });

    res.status(200).json(comments);
}

export async function react(req: Request<CommentRouteParams, any, any, ReactQueryParams>, res: Response) {
    const { userId, commentId } = req.params;
    const { reaction } = req.query;

    const commentRepo = getConnection().getRepository(CommentDb);

    const comments = await commentRepo.findOne({ where: {commentId} });

    if (!comments) {
	res.status(404).json("Comment not found");
	return;
    }

    // See if the user has already reacted to this comment
    const userRepo = getConnection().getRepository(UserDb);

    const user = await userRepo.findOne({ where: {userId} });

    if (!user) {
	res.status(404).json("User not found");
	return;
    }
}
