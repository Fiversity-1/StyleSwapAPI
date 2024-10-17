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

src/types.ts

Defines all the types for every ts file beneath (and ig brothers/sisters) this one.

Mainly used to ensure correct inputs for Requests and to easily extract them.

*/

// Many inputs are enums defined in enums.ts so import those
import { Gender, Size, Condition, Type, Style, Colour } from './enums';

// TODO: Meow
// Sizes can have both a letter or a number so define that
// Route params for adding a user and other related routes
export type UserRouteParams = {
    userId: string
};

// Route params for blocking or unmatching another user
export type BlockRouteParams = {
    userId1: string
    userId2: string
};

// Body params for adding a new user to the database
export type UserBodyParams = {
    lon: string,
    lat: string,
    bio: string,
    name: string,
    image: string
};

// The route params for adding / searching a new clothing item to the database and other related routes
export type ClothingRouteParams = {
    clothingId: number,
    userId: string
};

// The body params for searching for clothing items, similar to the one below but with arrays for multi search
export type ClothingGetBodyParams = {
    colour: Colour[],
    size: Size[],
    condition: Condition[],
    gender: Gender[],
    style: Style[],
    type: Type[],
    distance: number,
    search: string
};

// The body params for adding a new clothing item for a given user
export type ClothingBodyParams = {
    colour: Colour[],
    size: Size,
    condition: Condition,
    gender: Gender,
    style: Style,
    type: Type,
    bio: string,
    images: string[]
};

// Anything a user can search for within the database
export type ClothingParams = {
    size: Size[] | null,
    condition: Condition[] | null,
    gender: Gender[] | null,
    style: Style[] | null,
    type: Type[] | null,
    colour: Colour[] | null
}

// The route params for swipe related routes
export type SwipeRouteParams = {
    clotheId: number,
    userId: string,
}

// The query params for swipe related routes
export type SwipeQueryParams = {
    like: boolean
}

export type CommentBodyParams = {
    eventId: number,
    commentText: string
}

export type EventBodyParams = {
    title: string,
    host: string,
    location: string,
    when: string,
    bio: string
}

export type EventQueryParams = {
	amount: number
}

export type EventRouteParams = {
	eventId: number
}

export type ReactQueryParams = {
	reaction: number
}

export type CommentRouteParams = {
	userId: string,
	commentId: number
}

export type MatchRouteParams = {
	userId: string,
	clotheId: number
}
