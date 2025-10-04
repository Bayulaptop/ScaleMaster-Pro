// Bar Scale Generator Logic
$(document).ready(function () {
    // Generate bar scale
    $('#generateBarScale').on('click', function () {
        generateBarScale();
    });

    // Auto-generate when inputs change
    $('#barScale, #barUnit, #barInterval, #barLength, #barColor').on('input change', function () {
        generateBarScale();
    });

    // Download functionality
    $('#downloadBarScale').on('click', function () {
        downloadBarScale();
    });

    // Generate initial scale
    generateBarScale();
});

function generateBarScale() {
    const scale = parseInt($('#barScale').val()) || 1000;
    const unit = $('#barUnit').val();
    const interval = parseInt($('#barInterval').val()) || 500;
    const length = parseFloat($('#barLength').val()) || 10;
    const color = $('#barColor').val();

    if (!scale || !length) return;

    // Calculate real world distance for the bar length
    const realDistance = (length * scale) / 100; // Convert cm to meters

    // Determine appropriate unit and value
    let displayValue, displayUnit;
    if (unit === 'km') {
        displayValue = realDistance / 1000; // Convert to km
        displayUnit = 'km';
    } else {
        displayValue = realDistance;
        displayUnit = 'm';
    }

    // Format the value nicely
    const formattedValue = formatNumberID(displayValue);

    // Generate the bar scale HTML
    const barScaleHTML = `
        <div class="text-center">
            <div class="mb-4">
                <div class="text-lg font-bold text-gray-800 mb-2">Skala 1:${scale.toLocaleString('id-ID')}</div>
                <div class="text-sm text-gray-600">${formattedValue} ${displayUnit} = ${length} cm di peta</div>
            </div>
            
            <div class="relative mx-auto" style="width: ${length * 20}px; max-width: 100%;">
                <!-- Main bar -->
                <div class="flex">
                    <div class="h-8 bg-${color}-500 border-r border-white" style="width: 50%"></div>
                    <div class="h-8 bg-${color}-300" style="width: 50%"></div>
                </div>
                
                <!-- Tick marks and labels -->
                <div class="flex justify-between text-xs text-gray-700 mt-1">
                    <div>0</div>
                    <div>${formatNumberID(interval / (unit === 'km' ? 1000 : 1))}</div>
                    <div>${formatNumberID(interval * 2 / (unit === 'km' ? 1000 : 1))} ${displayUnit}</div>
                </div>
                
                <!-- Measurement indicator -->
                <div class="flex justify-between mt-2">
                    <div class="text-xs text-gray-600">${formatNumberID(interval / (unit === 'km' ? 1000 : 1))} ${displayUnit}</div>
                    <div class="text-xs text-gray-600">${formatNumberID(interval / (unit === 'km' ? 1000 : 1))} ${displayUnit}</div>
                </div>
            </div>
            
            <div class="mt-4 text-sm text-gray-500">
                Cetak dan ukur: 1 cm pada layar = ${length} cm pada cetakan
            </div>
        </div>
    `;

    $('#barScalePreview').html(barScaleHTML);
}

function downloadBarScale() {
    alert('Fitur download akan diimplementasikan dengan library tambahan seperti html2canvas');
    // Implementation would use html2canvas to convert the preview to PNG
}