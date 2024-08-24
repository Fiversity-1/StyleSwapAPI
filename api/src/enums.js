"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Style = exports.Type = exports.Condition = exports.Size = exports.Gender = exports.Colour = void 0;
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
// This code might get me cancelled
var Gender;
(function (Gender) {
    Gender["MALE"] = "male";
    Gender["FEMALE"] = "female";
    Gender["UNISEX"] = "unisex";
})(Gender || (exports.Gender = Gender = {}));
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
var Condition;
(function (Condition) {
    Condition["NEW_TAG"] = "new_tag";
    Condition["NEW"] = "new";
    Condition["LIKE_NEW"] = "like-new";
    Condition["GOOD"] = "good";
    Condition["FAIR"] = "fair";
})(Condition || (exports.Condition = Condition = {}));
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
