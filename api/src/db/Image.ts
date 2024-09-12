import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Image {
    @PrimaryColumn()
    id: number;

    @Column({ type: 'bytea' })
    data: Buffer;
}
