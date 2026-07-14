export function initGenerators() {
    // UUID v4
    const uuidBtn = document.getElementById('gen-uuid');
    const uuidOut = document.getElementById('uuid-output');
    
    uuidBtn.addEventListener('click', () => {
        // Menggunakan Web Crypto API bawaan browser modern
        uuidOut.value = crypto.randomUUID();
    });

    // Password Generator
    const passBtn = document.getElementById('gen-pass');
    const passLength = document.getElementById('pass-length');
    const passOut = document.getElementById('pass-output');

    passBtn.addEventListener('click', () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
        let password = "";
        const length = parseInt(passLength.value) || 16;
        
        // Mengambil array acak yang aman dari Crypto API
        const randomValues = new Uint32Array(length);
        crypto.getRandomValues(randomValues);

        for (let i = 0; i < length; i++) {
            password += chars[randomValues[i] % chars.length];
        }
        passOut.value = password;
    });
}