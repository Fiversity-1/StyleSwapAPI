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

src/enums.ts

Defines all of the enums used within any file beneath this, this is pretty much a rehash of the
similar file within the frontend codebase, but due to diff repos it is needed here as well.

Mainly just things for the database, i.e. the Colour enum shows all accepted Colours for the database.

*/

// Colours allowed in the database
export enum Colour {
    RED = 'red',
    ORANGE = 'orange',
    YELLOW = 'yellow',
    GREEN = 'green',
    BLUE = 'blue',
    PURPLE = 'purple',
    PINK = 'pink',
    BROWN = 'brown',
    TAN = 'tan',
    GREY = 'grey',
    BLACK = 'black',
    WHITE = 'white',
    GOLD = 'gold',
    OTHER = 'other'
}

// The 'gender' of the clothes
export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    UNISEX = 'unisex'
}

// Sizes
export enum Size {
    XXS = 'XXS',
    XS = 'XS',
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL',
    XXL = 'XXL',
    XXXL = 'XXXL',
    XXXXL = 'XXXXL',
    XXXXXL = 'XXXXXL'
}

// Condition of the clothes
export enum Condition {
    NEW_TAG = 'new_tag',
    NEW = 'new',
    LIKE_NEW = 'like-new',
    GOOD = 'good',
    FAIR = 'fair'
}

// What is the clothing type?
export enum Type {
    HAT = 'hat',
    SCARF = 'scarf',
    TIE = 'tie',
    SHIRT = 'shirt',
    MIDRIFF = 'midriff',
    BELT = 'belt',
    SHORTS = 'shorts',
    PANTS = 'pants',
    SKIRT = 'skirt',
    DRESS = 'dress',
    SHOES = 'shoes',
    JUMPER = 'jumper'
}

// TODO: See below
// The Style of the clothes (not sure if this is no longer needed)
export enum Style {
    CONTEMP = 'contemporary',
    S2000 = '2000s',
    S90 = '90s',
    S80 = '80s',
    S70 = '70s',
    S60 = '60s',
    S50 = '50s',
    VINTAGE = 'vintage'
}
