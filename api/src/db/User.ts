import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryColumn()
    userId: string;

    @Column({ nullable: false })
    location: string;

    @Column({ nullable: true })
    picture: string;

    @Column({ 
        nullable: true,
        type: "simple-array" 
    })
    liked: string[];

    @Column({ 
        nullable: true,
        type: "simple-array" 
    })
    matched: string[];
}

