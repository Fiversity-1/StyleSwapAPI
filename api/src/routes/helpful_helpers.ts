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

const key = Buffer.from(process.env.KEY, 'hex');
const iv = Buffer.from(process.env.IV, 'hex');

const algo = 'aes-256-cbc';

export function encrypt(text: string): string {
    let cipher = crypto.createCipheriv(algo, key, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(text: string): string {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift()!, 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv(algo, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
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
    let sizeMatch = sizes.filter((size) => text.includes(size));

    const regex = /size\s*(\d+)/i;
    const match = text.match(regex);

    if (match) {
        sizeMatch.push({
            number: parseInt(match[1])
        });
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

function handleEmptyArray(array: T[]): T[] | null {
    if (array.length === 0) {
        return null;
    }
    return array;
}
