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

function handleEmptyArray<T>(array: T[]): T[] | null {
    if (array.length === 0) {
        return null;
    }
    return array;
}
