// Scale Calculator Logic - Integrated with scale-presets.js
$(document).ready(function () {
    // Load scale presets from external file
    loadScalePresets();

    // Calculate scale from real length and map length
    $('#calculateScale').on('click', function () {
        calculateScale();
    });

    // Convert units
    $('#convertUnits').on('click', function () {
        convertUnits();
    });

    // Auto-calculate when inputs change
    $('#realLength, #mapLength, #scaleInput').on('input', function () {
        calculateScale();
    });

    // Auto-convert when conversion inputs change
    $('#convertValue, #convertFrom, #convertTo').on('input', function () {
        if ($('#convertValue').val()) {
            convertUnits();
        }
    });
});

function loadScalePresets() {
    // Use the presets from scale-presets.js
    const presetsData = getAllScalePresets();

    let html = '';
    for (const categoryKey in presetsData) {
        const category = presetsData[categoryKey];
        html += `
            <div class="mb-6">
                <div class="font-semibold text-gray-800 mb-3 flex items-center">
                    <span class="mr-2">${category.icon}</span>
                    ${category.name}
                </div>
                <div class="space-y-2">
        `;

        category.scales.forEach(scale => {
            html += `
                <button class="w-full text-left p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-all duration-200 scale-preset border border-gray-200 hover:border-blue-300" 
                        data-scale="${scale.value}"
                        title="${scale.description}">
                    <div class="font-medium text-gray-800">${scale.label}</div>
                    <div class="text-xs text-gray-500 mt-1">${scale.description}</div>
                </button>
            `;
        });

        html += `</div></div>`;
    }

    $('#presetsList').html(html);

    // Add click event for scale presets
    $('.scale-preset').on('click', function () {
        const scaleValue = $(this).data('scale');
        $('#scaleInput').val(scaleValue);
        calculateScale();

        // Visual feedback
        $(this).addClass('bg-blue-100 border-blue-400');
        setTimeout(() => {
            $(this).removeClass('bg-blue-100 border-blue-400');
        }, 1000);
    });
}

function calculateScale() {
    const realLength = parseFloat($('#realLength').val());
    const mapLength = parseFloat($('#mapLength').val());
    const scaleInput = parseFloat($('#scaleInput').val());
    const realUnit = $('#realUnit').val();

    // Reset results
    $('#scaleResult').addClass('hidden');
    $('#conversionResult').html('');

    // Calculate scale from real length and map length
    if (realLength && mapLength && mapLength !== 0) {
        const realLengthInCm = convertToCm(realLength, realUnit);
        const scale = realLengthInCm / mapLength;

        $('#scaleResult').removeClass('hidden');
        $('#calculatedScale').text(`1 : ${formatNumber(scale)}`);

        // Show recommended preset if available
        showRecommendedPreset(realLength, realUnit);
    }

    // Calculate conversions based on scale input
    if (scaleInput && scaleInput > 0) {
        let conversionText = '';

        if (realLength) {
            const realLengthInCm = convertToCm(realLength, realUnit);
            const mapFromReal = realLengthInCm / scaleInput;
            conversionText += `<div class="mb-2"><span class="font-medium">Denah:</span> ${formatNumberID(mapFromReal)} cm</div>`;
        }

        if (mapLength) {
            const realFromMap = mapLength * scaleInput;
            const realFromMapConverted = convertFromCm(realFromMap, realUnit);
            conversionText += `<div><span class="font-medium">Real:</span> ${formatNumberID(realFromMapConverted)} ${realUnit}</div>`;
        }

        if (conversionText) {
            $('#conversionResult').html(conversionText);
        }
    }
}

function showRecommendedPreset(realLength, realUnit) {
    const recommended = getRecommendedPreset(realLength, realUnit);
    if (recommended) {
        // Remove existing recommendation
        $('.recommended-preset').remove();

        const recommendationHTML = `
            <div class="recommended-preset mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div class="text-sm text-green-700">
                    <span class="font-medium">Rekomendasi:</span> Gunakan skala ${recommended.label} (${recommended.description})
                </div>
            </div>
        `;

        $('#scaleResult').after(recommendationHTML);
    }
}

function convertUnits() {
    const value = parseFloat($('#convertValue').val());
    const fromUnit = $('#convertFrom').val();
    const toUnit = $('#convertTo').val();

    if (!value && value !== 0) {
        $('#conversionOutput').addClass('hidden');
        return;
    }

    const result = formatConversionResult(value, fromUnit, toUnit);
    $('#conversionOutput').removeClass('hidden');
    $('#convertedValue').text(result);
}