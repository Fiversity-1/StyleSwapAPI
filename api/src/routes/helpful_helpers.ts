import crypto from 'crypto';
import * as dotenv from 'dotenv';

import { ClothingParams, SizeWithNumber } from '../types';

import {
    Gender,
    Type,
    Size,
    Condition,
    Style,
    Colour
} from '../enums';

dotenv.config();

const KEY = crypto.randomBytes(32);
const IV = crypto.randomBytes(16);
const ALGO = 'aes-256-cbc';

export function encrypt(text: string): string {
    console.log(text);
    let cipher = crypto.createCipheriv(ALGO, KEY, IV);
    let encrypted = cipher.update(text, "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
}

export function decrypt(text: string): string {
    let decipher = crypto.createDecipheriv(ALGO, KEY, IV);
    let decrypted = decipher.update(text, "base64", "utf8");
    return decrypted + decipher.final("utf8");
}

export function operationExtraction(text: string): ClothingParams {
    const styles = Object.values(Style);
    const genders = Object.values(Gender);
    const types = Object.values(Type);
    const sizes = Object.values(Size);
    const conditions = Object.values(Condition);
    const colours = Object.values(Colour);

    const styleMatch = styles.filter((style) => text.includes(style));
    const genderMatch = genders.filter((gender) => text.includes(gender));
    const typeMatch = types.filter((type) => text.includes(type));
    // Add in size matching for numbers should be like size 9 or SiZe 10
    let sizeMatch: SizeWithNumber[] = sizes.filter((size) => text.includes(size));

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

export function calculateDistance(lat1: string, lon1: string, lat2: string, lon2: string): number {
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
function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}


function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
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

function handleEmptyArray<T>(array: T[]): T[] | null {
    if (array.length === 0) {
        return null;
    }
    return array;
}

export function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const toRadians = (degrees: number) => degrees * (Math.PI / 180);
    const dlat = toRadians(lat2 - lat1);
    const dlon = toRadians(lon2 - lon1);

    const a = Math.sin(dlat / 2) ** 2 +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dlon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const radius = 6371;
    return radius * c;
}
