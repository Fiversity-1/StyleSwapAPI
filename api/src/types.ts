import { Gender, Size, Condition, Type, Style, Colour } from './enums';

export type SizeWithNumber = Size | number;

export type UserRouteParams = {
    userId: string
};

export type UserBodyParams = {
    lon: string,
    lat: string,
    bio: string
};

export type ClothingRouteParams = {
    clothingId: number,
    userId: string
};

export type ClothingGetBodyParams = {
    colour: Colour[],
    size: SizeWithNumber[],
    condition: Condition[],
    gender: Gender[],
    style: Style[],
    type: Type[],
    distance: number,
    search: string
};

export type ClothingBodyParams = {
    colour: Colour[],
    size: SizeWithNumber,
    condition: Condition,
    gender: Gender,
    style: Style,
    type: Type,
    bio: string
};

export type ClothingParams = {
    size: SizeWithNumber[] | null,
    condition: Condition[] | null,
    gender: Gender[] | null,
    style: Style[] | null,
    type: Type[] | null,
    colour: Colour[] | null
}

export type SwipeRouteParams = {
    clotheId: number,
    userId: string,
}

export type SwipeQueryParams = {
    like: boolean
}
