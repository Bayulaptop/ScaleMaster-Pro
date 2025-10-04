// Scale Presets Data for ScaleMaster Pro
const scalePresetsData = {
    architectural: {
        name: "Arsitektur & Konstruksi",
        icon: "🏗️",
        scales: [
            { label: "1:1", value: 1, description: "Skala penuh - Detail maksimal" },
            { label: "1:2", value: 2, description: "Setengah skala - Detail komponen" },
            { label: "1:5", value: 5, description: "Detail konstruksi - Sambungan" },
            { label: "1:10", value: 10, description: "Detail furniture - Perlengkapan" },
            { label: "1:20", value: 20, description: "Detail ruangan - Elevasi" },
            { label: "1:50", value: 50, description: "Denah detail - Potongan" },
            { label: "1:100", value: 100, description: "Denah bangunan - Tampak" },
            { label: "1:200", value: 200, description: "Denah site plan - Lokasi" }
        ]
    },
    urban: {
        name: "Perencanaan Kota",
        icon: "🏙️",
        scales: [
            { label: "1:500", value: 500, description: "Site plan kecil - Kavling" },
            { label: "1:1000", value: 1000, description: "Perencanaan kota - Blok" },
            { label: "1:2500", value: 2500, description: "Master plan - Zona" },
            { label: "1:5000", value: 5000, description: "Regional planning - Kecamatan" }
        ]
    },
    topographic: {
        name: "Topografi & Geologi",
        icon: "🗺️",
        scales: [
            { label: "1:10000", value: 10000, description: "Peta kota - Administrasi" },
            { label: "1:25000", value: 25000, description: "Peta topografi - Kontur" },
            { label: "1: 50000", value: 50000, description: "Survey geologi - SDA" },
            { label: "1:100000", value: 100000, description: "Peta regional - Provinsi" }
        ]
    },
    engineering: {
        name: "Teknik & Mesin",
        icon: "⚙️",
        scales: [
            { label: "1:1", value: 1, description: "Full scale - Prototype" },
            { label: "1:2", value: 2, description: "Half scale - Assembly" },
            { label: "1:5", value: 5, description: "Component detail" },
            { label: "1:10", value: 10, description: "Machine parts" },
            { label: "1:20", value: 20, description: "Mechanism detail" }
        ]
    }
};

// Function to get all presets
function getAllScalePresets() {
    return scalePresetsData;
}

// Function to get presets by category
function getScalePresetsByCategory(category) {
    return scalePresetsData[category] || null;
}

// Function to find preset by value
function findScalePresetByValue(value) {
    for (const category in scalePresetsData) {
        const preset = scalePresetsData[category].scales.find(scale => scale.value === value);
        if (preset) {
            return { ...preset, category: scalePresetsData[category].name };
        }
    }
    return null;
}

// Function to get recommended preset for measurement type
function getRecommendedPreset(realWorldDistance, unit) {
    const distanceInMeters = convertToMeters(realWorldDistance, unit);

    if (distanceInMeters < 1) return findScalePresetByValue(50);      // Detail interior
    if (distanceInMeters < 10) return findScalePresetByValue(100);    // Rumah
    if (distanceInMeters < 100) return findScalePresetByValue(200);   // Bangunan
    if (distanceInMeters < 1000) return findScalePresetByValue(500);  // Site plan
    return findScalePresetByValue(1000);                             // Urban planning
}

// Helper function for unit conversion
function convertToMeters(value, unit) {
    const conversions = {
        'mm': value * 0.001,
        'cm': value * 0.01,
        'm': value,
        'km': value * 1000
    };
    return conversions[unit] || value;
}