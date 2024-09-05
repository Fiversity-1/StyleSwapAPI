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
exports.calculateDistance = calculateDistance;
const crypto_1 = __importDefault(require("crypto"));
const dotenv = __importStar(require("dotenv"));
const enums_1 = require("../enums");
dotenv.config();
const KEY = crypto_1.default.randomBytes(32);
const IV = crypto_1.default.randomBytes(16);
const ALGO = 'aes-256-cbc';
function encrypt(text) {
    console.log(text);
    let cipher = crypto_1.default.createCipheriv(ALGO, KEY, IV);
    let encrypted = cipher.update(text, "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
}
function decrypt(text) {
    let decipher = crypto_1.default.createDecipheriv(ALGO, KEY, IV);
    let decrypted = decipher.update(text, "base64", "utf8");
    return decrypted + decipher.final("utf8");
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
function calculateDistance(lat1, lon1, lat2, lon2) {
    lat1 = decrypt(lat1);
    lat2 = decrypt(lat2);
    lon1 = decrypt(lon1);
    lon2 = decrypt(lon2);
    let lat1I = parseInt(lat1);
    let lat2I = parseInt(lat2);
    let lon1I = parseInt(lon1);
    let lon2I = parseInt(lon2);
    return haversineDistance(lat1I, lon1I, lat2I, lon2I);
}
// ChatGPT generated the below functions
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}
function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}
function handleEmptyArray(array) {
    if (array.length === 0) {
        return null;
    }
    return array;
}
