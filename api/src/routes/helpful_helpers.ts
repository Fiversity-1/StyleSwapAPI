import crypto from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();

const key = Buffer.from(process.env.KEY, 'hex');
const iv = Buffer.from(process.env.IV, 'hex');

const algo = 'aes-256-cbc';

export function encrypt(text: string): string {
    let cipher = crypto.createCipheriv(algo, key, iv);
    console.log(key);
    console.log(iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(text: string): string {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift()!, 'hex');
    let encrytpedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv(ialgo, Buffer.from(key), iv);
    let decyrtped = decipher.update(encryptedText)
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
