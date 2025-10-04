// Aspect Ratio Calculator Logic
$(document).ready(function () {
    // Calculate aspect ratio
    $('#calculateAspect').on('click', function () {
        calculateAspectRatio();
    });

    // Calculate resolution
    $('#calculateResolution').on('click', function () {
        calculateResolution();
    });

    // Auto-calculate when inputs change
    $('#aspectWidth, #aspectHeight').on('input', function () {
        if ($('#aspectWidth').val() && $('#aspectHeight').val()) {
            calculateAspectRatio();
        }
    });

    // Aspect ratio presets
    $('.aspect-preset').on('click', function () {
        const width = $(this).data('width');
        const height = $(this).data('height');

        $('#aspectWidth').val(width);
        $('#aspectHeight').val(height);
        calculateAspectRatio();

        // Visual feedback
        $(this).addClass('bg-blue-100 border border-blue-300');
        setTimeout(() => {
            $(this).removeClass('bg-blue-100 border border-blue-300');
        }, 500);
    });
});

function calculateAspectRatio() {
    const width = parseInt($('#aspectWidth').val());
    const height = parseInt($('#aspectHeight').val());

    if (!width || !height || height === 0) {
        $('#aspectResult').addClass('hidden');
        return;
    }

    // Calculate greatest common divisor
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(width, height);

    const aspectRatio = `${width / divisor}:${height / divisor}`;
    const aspectDecimal = (width / height).toFixed(4);

    $('#aspectRatio').text(aspectRatio);
    $('#aspectDecimal').text(`Desimal: ${formatNumberID(aspectDecimal)}`);
    $('#aspectResult').removeClass('hidden');
}

function calculateResolution() {
    const aspectInput = $('#targetAspect').val();
    const dimensionType = $('#targetDimension').val();
    const targetValue = parseFloat($('#targetValue').val());

    if (!aspectInput || !targetValue) return;

    // Parse aspect ratio (support both "16:9" and "16/9" formats)
    const aspectParts = aspectInput.split(/[:/]/);
    if (aspectParts.length !== 2) {
        alert('Format rasio aspek tidak valid. Gunakan format seperti "16:9" atau "16/9"');
        return;
    }

    const aspectWidth = parseFloat(aspectParts[0]);
    const aspectHeight = parseFloat(aspectParts[1]);

    if (!aspectWidth || !aspectHeight) return;

    let width, height;
    const aspectRatio = aspectWidth / aspectHeight;

    switch (dimensionType) {
        case 'width':
            width = targetValue;
            height = targetValue / aspectRatio;
            break;
        case 'height':
            height = targetValue;
            width = targetValue * aspectRatio;
            break;
        case 'diagonal':
            // For diagonal, use Pythagorean theorem
            const diagonal = targetValue;
            height = diagonal / Math.sqrt(1 + Math.pow(aspectRatio, 2));
            width = height * aspectRatio;
            break;
    }

    const resultText = `Lebar: ${Math.round(width)} × Tinggi: ${Math.round(height)}`;
    $('#resolutionOutput').text(resultText);
    $('#resolutionResult').removeClass('hidden');
}