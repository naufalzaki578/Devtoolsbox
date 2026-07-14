export function initRegexTester() {
    const regexPattern = document.getElementById('regex-pattern');
    const regexFlags = document.getElementById('regex-flags');
    const regexText = document.getElementById('regex-text');
    const regexStatus = document.getElementById('regex-status');

    function runRegexTest() {
        if (!regexPattern.value || !regexText.value) {
            regexStatus.textContent = "Masukkan pola regex dan teks uji.";
            regexStatus.style.borderColor = "var(--border)";
            return;
        }
        try {
            const rx = new RegExp(regexPattern.value, regexFlags.value || '');
            if (rx.test(regexText.value)) {
                regexStatus.textContent = "✓ MATCH MATCHED! Pola cocok dengan teks.";
                regexStatus.style.borderColor = "var(--success)";
            } else {
                regexStatus.textContent = "✗ NO MATCH. Pola tidak sesuai.";
                regexStatus.style.borderColor = "#f87171";
            }
        } catch (e) {
            regexStatus.textContent = "Error Regex: " + e.message;
            regexStatus.style.borderColor = "#f87171";
        }
    }
    regexPattern.addEventListener('input', runRegexTest);
    regexText.addEventListener('input', runRegexTest);
    regexFlags.addEventListener('input', runRegexTest);
}