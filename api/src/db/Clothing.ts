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

import {
    SizeWithNumber
} from '../types'


@Entity()
export class Clothing {
    @PrimaryGeneratedColumn()
    clothingId: number;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({
        name: 'userId',
        referencedColumnName: 'userId',
    })
    user: User;

    @Column()
    userId: User['userId'];

    @Column({ nullable: true })
    picture: string | null;

    @Column({ nullable: false })
    bio: string;

    // Tags and allat

    @Column({
        type: 'enum',
        array: true,
        enum: Colour,
        nullable: false
    })
    colour:  Colour[];

    @Column({ nullable: false })
    size: SizeWithNumber

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

}
