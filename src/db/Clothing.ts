import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { User } from './User';

import {
    Size,
    Gender
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

    // Tags and allat

    @Column({ nullable: false })
    colour:  string; // Could be an enum or something later

    @Column({ 
        type: 'enum',
        enum: Size,
        default: Size.M
    })
    size: Size

    @Column({ 
        type: 'enum',
        enum: Gender,
        default: Gender.UNISEX
    })
    size: Gender
}


