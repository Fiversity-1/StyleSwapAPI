import { Gender, Size, Condition, Type, Style, Colour } from './enums';

export type SizeWithNumber = Size | number;

export type UserRouteParams = {
    userId: string
};

export type ClothingRouteParams = {
    clothingId: number,
    userId: string
};

export type ClothingBodyParams = {
    colour: string,
    size: SizeWithNumber,
    condition: Condition,
    gender: Gender,
    style: Style,
    type: Type,
    bio: string
};

export type ClothingParams = {
    size: SizeWithNumber[],
    condition: Condition[],
    gender: Gender[],
    style: Style[],
    type: Type[],
    colour: Colour[]
}
