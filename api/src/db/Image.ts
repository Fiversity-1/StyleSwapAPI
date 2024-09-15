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

src/db/Image.ts

Defines the Image table within the database

*/
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Image {
    @PrimaryColumn()
    // The id of the image, used to retrieve it when needed
    id: number;

    @Column({ type: 'bytea' })
    // The image itself
    data: Buffer;
}
