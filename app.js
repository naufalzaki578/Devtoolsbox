import { initJsonFormatter } from './modules/json-formatter.js';
import { initEncoderDecoder } from './modules/encoder-decoder.js';
import { initGenerators } from './modules/generators.js';
import { initRegexTester } from './modules/regex-tester.js';
import { initColorTools } from './modules/color-tools.js';
import { initUtils } from './modules/utils.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Logika Navigasi Tab SPA
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.tool-section');

    if (navButtons.length > 0 && sections.length > 0) {
        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                navButtons.forEach(b => b.classList.remove('active'));
                sections.forEach(s => s.classList.remove('active'));

                btn.classList.add('active');
                const target = btn.getAttribute('data-target');
                const targetSection = document.getElementById(target);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            });
        });
    }

    // 2. Jalankan fungsi modul dengan proteksi try-catch agar jika 1 modul error, modul lain tidak ikut mati
    try { initJsonFormatter(); } catch (e) { console.error("Error JSON Formatter:", e); }
    try { initEncoderDecoder(); } catch (e) { console.error("Error Encoder/Decoder:", e); }
    try { initGenerators(); } catch (e) { console.error("Error Generators:", e); }
    try { initRegexTester(); } catch (e) { console.error("Error Regex Tester:", e); }
    try { initColorTools(); } catch (e) { console.error("Error Color Tools:", e); }
    try { initUtils(); } catch (e) { console.error("Error Utils:", e); }
});