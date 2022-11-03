import crypto from 'crypto';
import fs from 'fs';

export default function genKeyPair() {
    
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096, // en bits
        publicKeyEncoding: {
            type: 'pkcs1', // "Public Key Cryptography Standards 1" 
            format: 'pem' // Most common formatting choice
        },
        privateKeyEncoding: {
            type: 'pkcs1', // "Public Key Cryptography Standards 1"
            format: 'pem' // Most common formatting choice
        }
    });

    fs.writeFileSync('./key_public.pem', keyPair.publicKey); 
    
    fs.writeFileSync('./key_prive.pem', keyPair.privateKey);

}