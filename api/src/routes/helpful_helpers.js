"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = encrypt;
exports.decrypt = decrypt;
exports.operationExtraction = operationExtraction;
const crypto_1 = __importDefault(require("crypto"));
const dotenv = __importStar(require("dotenv"));
const enums_1 = require("../enums");
dotenv.config();
const key = Buffer.from(process.env.KEY || "", 'hex');
const iv = Buffer.from(process.env.IV || "", 'hex');
const algo = 'aes-256-cbc';
function encrypt(text) {
    let cipher = crypto_1.default.createCipheriv(algo, key, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}
function decrypt(text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto_1.default.createDecipheriv(algo, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
function operationExtraction(text) {
    const styles = Object.values(enums_1.Style);
    const genders = Object.values(enums_1.Gender);
    const types = Object.values(enums_1.Type);
    const sizes = Object.values(enums_1.Size);
    const conditions = Object.values(enums_1.Condition);
    const colours = Object.values(enums_1.Colour);
    const styleMatch = styles.filter((style) => text.includes(style));
    const genderMatch = genders.filter((gender) => text.includes(gender));
    const typeMatch = types.filter((type) => text.includes(type));
    // Add in size matching for numbers should be like size 9 or SiZe 10
    let sizeMatch = sizes.filter((size) => text.includes(size));
    const regex = /size\s*(\d+)/i;
    const match = text.match(regex);
    if (match) {
        sizeMatch.push(parseInt(match[1]));
    }
    const conditionMatch = conditions.filter((condition) => text.includes(condition));
    const colourMatch = colours.filter((colour) => text.includes(colour));
    return {
        style: handleEmptyArray(styleMatch),
        gender: handleEmptyArray(genderMatch),
        type: handleEmptyArray(typeMatch),
        size: handleEmptyArray(sizeMatch),
        condition: handleEmptyArray(conditionMatch),
        colour: handleEmptyArray(colourMatch)
    };
}
function handleEmptyArray(array) {
    if (array.length === 0) {
        return null;
    }
    return array;
}
