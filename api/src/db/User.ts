import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryColumn()
    userId: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    location: string;

    @Column({ nullable: true })
    picture: string;
    
    // Does the default value seem ok to yous?
    // Without it I need like 2-3 extras ifs
    @Column("integer", { array: true, default: [0] })
    liked: number[];

    @Column("integer", { array: true, default: [0] })
    disliked: number[];
    
    @Column({ 
        nullable: false,
        default: [],
        type: "simple-array" 
    })
    matched: string[];
}

