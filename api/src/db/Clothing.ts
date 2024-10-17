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

Defines the Clothing table within the database.

*/
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

// Since there is references to other tables
import { User } from './User';

// Enums that are used to limit acceptable values within the database
import {
    Gender,
    Size,
    Condition,
    Type,
    Style,
    Colour
} from '../enums'

@Entity()
export class Clothing {
    @PrimaryGeneratedColumn()
    // auto generated coloumn, i.e. 1 ... infinite
    clothingId: number;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({
        name: 'userId',
        referencedColumnName: 'userId',
    })
    // A reference to the user who posted this item
    user: User;

    @Column()
    // The user's id
    userId: User['userId'];

    @Column({ nullable: false })
    // The bio / description of the clothing piece
    bio: string;

    // Tags / Information on the clothing item it self
    @Column({
        type: 'enum',
        array: true,
        enum: Colour,
        nullable: false
    })
    colour:  Colour[];

    @Column({
        type: 'enum',
        enum: Size,
        nullable: false
    })
    size:  Size;

    @Column({
        type: 'enum',
        enum: Gender,
        default: Gender.UNISEX
    })
    gender: Gender

    @Column({
        type: 'enum',
        enum: Condition,
        nullable: false
    })
    condition: Condition

    @Column({
        type: 'enum',
        enum: Style,
        nullable: true
    })
    style: Style | null

    @Column({
        type: 'enum',
        enum: Type,
        nullable: false
    })
    type: Type

    @Column("bytea", { array: true })
    images: Buffer[];
}
