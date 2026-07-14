export function initJsonFormatter() {
    const jsonInput = document.getElementById('json-input');
    const jsonOutput = document.getElementById('json-output');
    const fmtBtn = document.getElementById('json-fmt-btn');
    const minBtn = document.getElementById('json-min-btn');
    const copyBtn = document.getElementById('json-copy-btn');

    // Proteksi jika elemen HTML tidak ditemukan
    if (!jsonInput || !jsonOutput) {
        console.error("Elemen JSON Formatter tidak ditemukan di HTML!");
        return;
    }

    // Fungsi untuk memformat JSON
    fmtBtn.addEventListener('click', () => {
        const rawValue = jsonInput.value.trim();
        if (!rawValue) {
            jsonOutput.textContent = "Kotak input kosong. Silakan masukkan teks JSON.";
            jsonOutput.style.color = "#f87171";
            return;
        }

        try {
            const parsed = JSON.parse(rawValue);
            jsonOutput.textContent = JSON.stringify(parsed, null, 4);
            jsonOutput.style.color = "#4ade80"; // Hijau jika sukses
        } catch (e) {
            jsonOutput.textContent = `JSON Tidak Valid!\nError: ${e.message}\n\nTips: Pastikan menggunakan tanda petik dua (") untuk key dan string, bukan petik satu (').`;
            jsonOutput.style.color = "#f87171"; // Merah jika error
        }
    });

    // Fungsi untuk meminifikasi JSON (menjadi 1 baris rapat)
    minBtn.addEventListener('click', () => {
        const rawValue = jsonInput.value.trim();
        if (!rawValue) return;

        try {
            const parsed = JSON.parse(rawValue);
            jsonOutput.textContent = JSON.stringify(parsed);
            jsonOutput.style.color = "#4ade80";
        } catch (e) {
            jsonOutput.textContent = `JSON Tidak Valid!\nError: ${e.message}`;
            jsonOutput.style.color = "#f87171";
        }
    });

    // Fungsi copy ke clipboard
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const textToCopy = jsonOutput.textContent;
            if (textToCopy && textToCopy !== "Hasil akan muncul di sini...") {
                navigator.clipboard.writeText(textToCopy)
                    .then(() => alert('Output JSON berhasil disalin!'))
                    .catch(() => alert('Gagal menyalin teks.'));
            }
        });
    }
}