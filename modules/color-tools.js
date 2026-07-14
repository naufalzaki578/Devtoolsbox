export function initColorTools() {
    // Color Picker
    const colorInput = document.getElementById('color-input');
    const colorHex = document.getElementById('color-hex');
    
    colorInput.addEventListener('input', () => {
        colorHex.value = colorInput.value;
    });

    // Gradient Generator
    const gradC1 = document.getElementById('grad-c1');
    const gradC2 = document.getElementById('grad-c2');
    const gradCss = document.getElementById('grad-css');
    const gradPreview = document.getElementById('grad-preview');

    function updateGradient() {
        const cssString = `linear-gradient(135deg, ${gradC1.value}, ${gradC2.value})`;
        gradPreview.style.backgroundImage = cssString;
        gradCss.value = `background: ${cssString};`;
    }
    gradC1.addEventListener('input', updateGradient);
    gradC2.addEventListener('input', updateGradient);
    updateGradient();
}