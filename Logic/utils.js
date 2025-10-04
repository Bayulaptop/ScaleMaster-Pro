// Unit conversion functions
function convertToCm(value, fromUnit) {
    if (!value) return 0;
    const conversions = {
        'mm': value * 0.1,
        'cm': value,
        'm': value * 100,
        'km': value * 100000
    };
    return conversions[fromUnit] || value;
}

function convertFromCm(value, toUnit) {
    if (!value) return 0;
    const conversions = {
        'mm': value * 10,
        'cm': value,
        'm': value * 0.01,
        'km': value * 0.00001
    };
    return conversions[toUnit] || value;
}

function convertUnit(value, fromUnit, toUnit) {
    if (!value) return 0;
    // Convert to cm first, then to target unit
    const inCm = convertToCm(value, fromUnit);
    return convertFromCm(inCm, toUnit);
}

// Smart number formatter - removes unnecessary zeros
function formatNumber(num, maxDecimals = 6) {
    if (!num && num !== 0) return '0';

    let number = parseFloat(num);
    if (isNaN(number)) return '0';

    // Handle very small numbers
    if (Math.abs(number) < 0.000001 && number !== 0) {
        return number.toExponential(2);
    }

    // Format the number to remove trailing zeros
    let formatted = number.toString();

    // If it has decimal places, remove unnecessary zeros
    if (formatted.includes('.')) {
        formatted = formatted.replace(/\.?0+$/, ''); // Remove trailing zeros after decimal
        // If we ended up with just a decimal point, remove it too
        if (formatted.endsWith('.')) {
            formatted = formatted.slice(0, -1);
        }
    }

    // For numbers with many decimal places, limit to maxDecimals
    if (formatted.includes('.')) {
        const parts = formatted.split('.');
        if (parts[1].length > maxDecimals) {
            formatted = number.toFixed(maxDecimals).replace(/\.?0+$/, '');
        }
    }

    // Add thousand separators for numbers >= 1000
    if (!formatted.includes('.') && !formatted.includes('e')) {
        const numValue = parseFloat(formatted);
        if (numValue >= 1000 || numValue <= -1000) {
            formatted = numValue.toLocaleString('id-ID');
        }
    }

    return formatted;
}

// Format number with Indonesian style (comma as decimal separator)
function formatNumberID(num, maxDecimals = 6) {
    let formatted = formatNumber(num, maxDecimals);
    // Replace dot with comma for decimal separator (Indonesian format)
    formatted = formatted.replace(/\./g, '|').replace(/,/g, '.').replace(/\|/g, ',');
    return formatted;
}

// Special formatter for conversion results
function formatConversionResult(value, fromUnit, toUnit) {
    const converted = convertUnit(value, fromUnit, toUnit);
    const formattedValue = formatNumberID(value);
    const formattedConverted = formatNumberID(converted);

    return `${formattedValue} ${fromUnit} = ${formattedConverted} ${toUnit}`;
}