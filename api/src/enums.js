"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Style = exports.Type = exports.Condition = exports.Size = exports.Gender = exports.Colour = void 0;
// Colours allowed in the database
var Colour;
(function (Colour) {
    Colour["RED"] = "red";
    Colour["ORANGE"] = "orange";
    Colour["YELLOW"] = "yellow";
    Colour["GREEN"] = "green";
    Colour["BLUE"] = "blue";
    Colour["PURPLE"] = "purple";
    Colour["PINK"] = "pink";
    Colour["BROWN"] = "brown";
    Colour["TAN"] = "tan";
    Colour["GREY"] = "grey";
    Colour["BLACK"] = "black";
    Colour["WHITE"] = "white";
    Colour["GOLD"] = "gold";
    Colour["OTHER"] = "other";
})(Colour || (exports.Colour = Colour = {}));
// The 'gender' of the clothes
var Gender;
(function (Gender) {
    Gender["MALE"] = "male";
    Gender["FEMALE"] = "female";
    Gender["UNISEX"] = "unisex";
})(Gender || (exports.Gender = Gender = {}));
// Sizes
var Size;
(function (Size) {
    Size["XXS"] = "XXS";
    Size["XS"] = "XS";
    Size["S"] = "S";
    Size["M"] = "M";
    Size["L"] = "L";
    Size["XL"] = "XL";
    Size["XXL"] = "XXL";
    Size["XXXL"] = "XXXL";
    Size["XXXXL"] = "XXXXL";
    Size["XXXXXL"] = "XXXXXL";
})(Size || (exports.Size = Size = {}));
// Condition of the clothes
var Condition;
(function (Condition) {
    Condition["NEW_TAG"] = "new_tag";
    Condition["NEW"] = "new";
    Condition["LIKE_NEW"] = "like-new";
    Condition["GOOD"] = "good";
    Condition["FAIR"] = "fair";
})(Condition || (exports.Condition = Condition = {}));
// What is the clothing type?
var Type;
(function (Type) {
    Type["HAT"] = "hat";
    Type["SCARF"] = "scarf";
    Type["TIE"] = "tie";
    Type["SHIRT"] = "shirt";
    Type["MIDRIFF"] = "midriff";
    Type["BELT"] = "belt";
    Type["SHORTS"] = "shorts";
    Type["PANTS"] = "pants";
    Type["SKIRT"] = "skirt";
    Type["DRESS"] = "dress";
    Type["SHOES"] = "shoes";
    Type["JUMPER"] = "jumper";
})(Type || (exports.Type = Type = {}));
// TODO: See below
// The Style of the clothes (not sure if this is no longer needed)
var Style;
(function (Style) {
    Style["CONTEMP"] = "contemporary";
    Style["S2000"] = "2000s";
    Style["S90"] = "90s";
    Style["S80"] = "80s";
    Style["S70"] = "70s";
    Style["S60"] = "60s";
    Style["S50"] = "50s";
    Style["VINTAGE"] = "vintage";
})(Style || (exports.Style = Style = {}));
