import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Clothing {
    @PrimaryColumn()
    clothingId: string;

    @Column({ nullable: true })
    picture: string;

    // Tags and allat

    @Column({ nullable: false })
    colour:  string; // Could be an enum or something later

    @Column({ nullable: false })
    size: string // Could be an enum or something later

}


