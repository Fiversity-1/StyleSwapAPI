import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { User } from './User';

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
    clothingId: number;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({
        name: 'userId',
        referenceColumnName: 'userId',
    })
    user: User;

    @Column()
    userId: User['userId'];

    @Column({ nullable: true })
    picture: string;

    @Column({ nullable: false })
    bio: string;

    // Tags and allat

    @Column({
        type: 'enum',
        array: true,
        enum: Colour,
        nullable: false
    })
    colour:  Colour[]; // Could be an enum or something later

    @Column({ nullable: false })
    size: string

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
    style: Style

    @Column({ 
        type: 'enum',
        enum: Type,
        nullable: false
    })
    type: Type

}


