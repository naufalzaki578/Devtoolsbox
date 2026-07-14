document.addEventListener('DOMContentLoaded', () => {
    console.log("DevToolbox Engine: Active and Ready!");

    // ==========================================
    // A. LOGIKA NAVIGASI TAB (SPA)
    // ==========================================
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.tool-section');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            const targetSection = document.getElementById(target);
            
            if (targetSection) {
                navButtons.forEach(b => b.classList.remove('active'));
                sections.forEach(s => s.classList.remove('active'));

                btn.classList.add('active');
                targetSection.classList.add('active');
            }
        });
    });

    // ==========================================
    // 1. JSON FORMATTER & MINIFIER
    // ==========================================
    const jsonInput = document.getElementById('json-input');
    const jsonOutput = document.getElementById('json-output');
    const fmtBtn = document.getElementById('json-fmt-btn');
    const minBtn = document.getElementById('json-min-btn');
    const jsonCopyBtn = document.getElementById('json-copy-btn');
    
    if (fmtBtn && jsonInput && jsonOutput) {
        fmtBtn.addEventListener('click', () => {
            const rawValue = jsonInput.value.trim();
            if (!rawValue) { jsonOutput.textContent = "Kotak input kosong."; return; }
            try {
                const parsed = JSON.parse(rawValue);
                jsonOutput.textContent = JSON.stringify(parsed, null, 4);
                jsonOutput.style.color = "#4ade80";
            } catch (e) {
                jsonOutput.textContent = "Invalid JSON: " + e.message;
                jsonOutput.style.color = "#f87171";
            }
        });
    }

    if (minBtn && jsonInput && jsonOutput) {
        minBtn.addEventListener('click', () => {
            const rawValue = jsonInput.value.trim();
            if (!rawValue) { jsonOutput.textContent = "Kotak input kosong."; return; }
            try {
                const parsed = JSON.parse(rawValue);
                jsonOutput.textContent = JSON.stringify(parsed);
                jsonOutput.style.color = "#4ade80";
            } catch (e) {
                jsonOutput.textContent = "Invalid JSON: " + e.message;
                jsonOutput.style.color = "#f87171";
            }
        });
    }

    if (jsonCopyBtn && jsonOutput) {
        jsonCopyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(jsonOutput.textContent);
            alert('Output JSON berhasil disalin!');
        });
    }

    // ==========================================
    // 2. BASE64 CONVERTER
    // ==========================================
    const b64Input = document.getElementById('base64-input');
    const b64Output = document.getElementById('base64-output');
    const encBtn = document.getElementById('b64-encode-btn');
    const decBtn = document.getElementById('b64-decode-btn');

    if (encBtn && b64Input && b64Output) {
        encBtn.addEventListener('click', () => {
            const rawValue = b64Input.value;
            try {
                const bytes = new TextEncoder().encode(rawValue);
                const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
                b64Output.value = btoa(binString);
            } catch (e) {
                b64Output.value = `Error Encoding: ${e.message}`;
            }
        });
    }

    if (decBtn && b64Input && b64Output) {
        decBtn.addEventListener('click', () => {
            let base64Value = b64Input.value.replace(/\s/g, ''); 
            try {
                const binString = atob(base64Value);
                const bytes = Uint8Array.from(binString, (char) => char.charCodeAt(0));
                b64Output.value = new TextDecoder().decode(bytes);
            } catch (e) {
                b64Output.value = `Gagal Decode! Kode Base64 tidak valid.\nDetail: ${e.message}`;
            }
        });
    }

    // ==========================================
    // 3. FIXED: UUID & PASSWORD GENERATOR
    // ==========================================
    const uuidBtn = document.getElementById('uuid-gen-btn');
    const uuidOutput = document.getElementById('uuid-output');

    if (uuidBtn && uuidOutput) {
        uuidBtn.addEventListener('click', () => {
            // Menggunakan Crypto API bawaan browser jika tersedia (lebih cepat & aman)
            if (typeof crypto !== 'undefined' && crypto.randomUUID) {
                uuidOutput.value = crypto.randomUUID();
            } else {
                // Alternatif Math.random jika dijalankan di browser jadul / non-HTTPS lokal
                let dt = new Date().getTime();
                const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    const r = (dt + Math.random()*16)%16 | 0;
                    dt = Math.floor(dt/16);
                    return (c=='x' ? r :(r&0x3|0x8)).toString(16);
                });
                uuidOutput.value = uuid;
            }
        });
    }

    const passBtn = document.getElementById('pass-gen-btn');
    const passLengthInput = document.getElementById('pass-length');
    const passOutput = document.getElementById('pass-output');

    if (passBtn && passOutput) {
        passBtn.addEventListener('click', () => {
            const length = parseInt(passLengthInput ? passLengthInput.value : 16) || 16;
            const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~=";
            let password = "";
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset[randomIndex];
            }
            passOutput.value = password;
        });
    }

    // ==========================================
    // 4. REGEX TESTER
    // ==========================================
    const regexPattern = document.getElementById('regex-pattern');
    const regexFlags = document.getElementById('regex-flags');
    const regexText = document.getElementById('regex-text');
    const regexStatus = document.getElementById('regex-status');

    if (regexPattern && regexText && regexStatus) {
        function runRegexTest() {
            if (!regexPattern.value || !regexText.value) {
                regexStatus.textContent = "Masukkan pola regex dan teks uji.";
                return;
            }
            try {
                const flags = regexFlags ? regexFlags.value : '';
                const rx = new RegExp(regexPattern.value, flags);
                if (rx.test(regexText.value)) {
                    regexStatus.textContent = "✓ MATCH MATCHED! Pola cocok dengan teks.";
                    regexStatus.style.color = "#4ade80";
                } else {
                    regexStatus.textContent = "✗ NO MATCH. Pola tidak sesuai.";
                    regexStatus.style.color = "#f87171";
                }
            } catch (e) {
                regexStatus.textContent = "Error Regex: " + e.message;
                regexStatus.style.color = "#f87171";
            }
        }
        regexPattern.addEventListener('input', runRegexTest);
        regexText.addEventListener('input', runRegexTest);
        if (regexFlags) regexFlags.addEventListener('input', runRegexTest);
    }

    // ==========================================
    // 5. COLOR & GRADIENT TOOLS
    // ==========================================
    const colorInput = document.getElementById('color-input');
    const colorHex = document.getElementById('color-hex');
    if (colorInput && colorHex) {
        colorInput.addEventListener('input', () => { colorHex.value = colorInput.value; });
    }

    const gradC1 = document.getElementById('grad-c1');
    const gradC2 = document.getElementById('grad-c2');
    const gradCss = document.getElementById('grad-css');
    const gradPreview = document.getElementById('grad-preview');

    if (gradC1 && gradC2 && gradPreview) {
        function updateGradient() {
            const cssString = `linear-gradient(135deg, ${gradC1.value}, ${gradC2.value})`;
            gradPreview.style.background = cssString;
            if (gradCss) gradCss.value = `background: ${cssString};`;
        }
        gradC1.addEventListener('input', updateGradient);
        gradC2.addEventListener('input', updateGradient);
    }

    // ==========================================
    // 6. TIMESTAMP CONVERTER
    // ==========================================
    const currentEpochSpan = document.getElementById('current-epoch');
    if (currentEpochSpan) {
        setInterval(() => { currentEpochSpan.textContent = Math.floor(Date.now() / 1000); }, 1000);
    }

    const tsConvBtn = document.getElementById('ts-conv-btn');
    if (tsConvBtn) {
        tsConvBtn.addEventListener('click', () => {
            const tsInputVal = document.getElementById('ts-input').value;
            const tsValue = parseInt(tsInputVal);
            if (!tsValue) return;
            const date = new Date(tsValue < 9999999999 ? tsValue * 1000 : tsValue);
            document.getElementById('ts-output-date').textContent = "Hasil Lokal: " + date.toLocaleString();
        });
    }

    // ==========================================
    // 7. QR GENERATOR
    // ==========================================
    const qrContainer = document.getElementById('qr-output-container');
    const qrGenBtn = document.getElementById('qr-gen-btn');
    if (qrGenBtn && qrContainer) {
        qrGenBtn.addEventListener('click', () => {
            const text = document.getElementById('qr-text').value;
            qrContainer.innerHTML = ""; 
            if (!text) return;
            if (typeof QRCode !== 'undefined') {
                new QRCode(qrContainer, { text: text, width: 150, height: 150 });
            } else {
                qrContainer.textContent = "Gagal memuat library QR.";
            }
        });
    }

    // ==========================================
    // 8. LIVE MARKDOWN PREVIEW
    // ==========================================
    const mdInput = document.getElementById('md-input');
    const mdOutput = document.getElementById('md-output');
    if (mdInput && mdOutput) {
        mdInput.addEventListener('input', () => {
            if (typeof marked !== 'undefined') {
                mdOutput.innerHTML = marked.parse(mdInput.value);
            }
        });
    }
});