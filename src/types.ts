import { Gender } from './enums';

export type UserRouteParams = {
    userId: string
};

export type ClothingBodyParams = {
    colour: string,
    size: string,
    condition: string,
    gender: Gender,
    brand: string,
    style: string
};
