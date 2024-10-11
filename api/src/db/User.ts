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
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryColumn()
    // Primary Key, retrieved from Auth0.
    userId: string;

    @Column()
    name: string;

    @Column({ nullable: false })
    // The user's lat, encrypted
    lat: string;

    @Column({ nullable: false })
    // The user's lon, encrypted
    lon: string;

    @Column()
    // The user's bio
    bio: string;

    // TODO: Meow
    // Most likely to remove, if not make it a reference to an id from the image table?
    @Column({ nullable: false })
    picture: string;

    @Column({ type: 'int', array: true, default: [0] })
    // An array of the clothing ids this user has liked
    // Default is set with 0 so that there is less logic later, clothing ids start at 1 so this is not an issue
    liked: number[];

    @Column({ type: 'int', array: true, default: [0] })
    // An array of the clothing ids this user has disliked
    // Default is set with 0 so that there is less logic later, clothing ids start at 1 so this is not an issue
    disliked: number[];

    @Column({
        nullable: false,
        default: [],
        type: "simple-array"
    })
    // An array of the clothing ids this user has matched with
    matched: number[];

    @Column({
        nullable: false,
        default: [],
        type: "simple-array"
    })
    // An array of the user ids this user has blocked
    blocked: string[];
}
