export function initUtils() {
    // Timestamp Converter
    setInterval(() => {
        document.getElementById('current-epoch').textContent = Math.floor(Date.now() / 1000);
    }, 1000);

    document.getElementById('ts-conv-btn').addEventListener('click', () => {
        const tsValue = parseInt(document.getElementById('ts-input').value);
        if (!tsValue) return;
        const date = new Date(tsValue < 9999999999 ? tsValue * 1000 : tsValue);
        document.getElementById('ts-output-date').textContent = "Hasil GMT/UTC: " + date.toUTCString() + " | Lokal: " + date.toLocaleString();
    });

    // QR Generator
    const qrContainer = document.getElementById('qr-output-container');
    document.getElementById('qr-gen-btn').addEventListener('click', () => {
        const text = document.getElementById('qr-text').value;
        qrContainer.innerHTML = ""; 
        if (!text) { alert('Teks kosong!'); return; }
        
        new QRCode(qrContainer, {
            text: text,
            width: 180,
            height: 180,
            colorDark: "#000000",
            colorLight: "#ffffff"
        });
    });

    // Live Markdown Preview
    const mdInput = document.getElementById('md-input');
    const mdOutput = document.getElementById('md-output');

    mdInput.addEventListener('input', () => {
        mdOutput.innerHTML = marked.parse(mdInput.value);
    });
    mdOutput.innerHTML = marked.parse(mdInput.value);
}