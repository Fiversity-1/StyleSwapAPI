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

src/db/Event.ts

Creates the Event table within the database, most information you expect to see here will not be here.

*/
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Comment } from './Comment';
@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    eventId: number;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    host: string;

    @Column({ nullable: false })
    location: string;

    @Column({ nullable: false })
    when: string;
    
    @Column()
    bio: string;

    @Column({
        nullable: false,
        default: [],
        type: "simple-array"
    })
    attending: string[];

    @OneToMany(() => Comment, comment => comment.event)
    comments: Comment[];

    // TODO: Meow
    // Needs to be 1) an array of images (probs with a max size) and 2) implemented within the routes
//    @ManyToOne(() => Image, { nullable: false })
//    @JoinColumn({
//        name: 'id',
//        referencedColumnName: 'id',
//    })
      // A reference to the image
//    image: Image;
//
//    @Column()
      // The image's id
//    id: Image['id'];
}
