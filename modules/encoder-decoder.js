export function initEncoderDecoder() {
    const b64Input = document.getElementById('base64-input');
    const b64Output = document.getElementById('base64-output');
    const encodeBtn = document.getElementById('b64-encode-btn');
    const decodeBtn = document.getElementById('b64-decode-btn');

    if (!b64Input || !b64Output) return;

    // Fungsi ENCODE (Teks Biasa -> Base64)
    encodeBtn.addEventListener('click', () => {
        const rawValue = b64Input.value;
        if (!rawValue.trim()) {
            b64Output.value = "Kotak input kosong! Masukkan teks biasa terlebih dahulu.";
            return;
        }

        try {
            const bytes = new TextEncoder().encode(rawValue);
            const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
            b64Output.value = btoa(binString);
        } catch (e) {
            b64Output.value = `Error Encoding: ${e.message}`;
        }
    });

    // Fungsi DECODE (Base64 -> Teks Biasa)
    decodeBtn.addEventListener('click', () => {
        let base64Value = b64Input.value.trim(); 
        if (!base64Value) {
            b64Output.value = "Kotak input kosong! Masukkan kode Base64 terlebih dahulu.";
            return;
        }

        // RegEx untuk mengecek apakah format string HANYA berisi karakter Base64 yang sah
        const isBase64 = /^[A-Za-z0-9+/]*={0,2}$/.test(base64Value);

        if (!isBase64) {
            b64Output.value = "Peringatan: Teks yang Anda masukkan tampaknya BUKAN kode Base64 yang valid.\n\n" +
                              "Tips: \n" +
                              "1. Jika ingin mengubah teks biasa menjadi kode, klik tombol ENCODE.\n" +
                              "2. Tombol DECODE hanya digunakan jika input berupa kode acak berakhiran '='.";
            return;
        }

        try {
            const binString = atob(base64Value);
            const bytes = Uint8Array.from(binString, (char) => char.charCodeAt(0));
            b64Output.value = new TextDecoder().decode(bytes);
        } catch (e) {
            b64Output.value = `Gagal Decode! Kode Base64 rusak atau tidak lengkap.\nDetail: ${e.message}`;
        }
    });
}