import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryColumn()
    userId: string;

    @Column({ nullable: true })
    picture: string;

    @Column("simple-array")
    liked: string[];

    @Column("simple-array")
    matched: string[];
}

