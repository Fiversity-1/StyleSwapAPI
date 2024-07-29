import { Column, Entity, PrimaryColumn } from 'typeorm';

import {
    Size,
    Gender
} from '../enums'

@Entity()
export class Clothing {
    @PrimaryColumn()
    clothingId: string;

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


