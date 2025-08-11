/* --- START OF FILE solar-calculator.js --- */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const tableBody = document.getElementById('calculator-body');
    const rowTemplate = document.getElementById('calculator-row-template');
    const addRowBtn = document.getElementById('add-row-btn');
    const resetBtn = document.getElementById('reset-btn');

    // Total fields in the footer
    const totalQtyEl = document.getElementById('total-qty');
    const totalPowerEl = document.getElementById('total-power');
    const totalDayEnergyEl = document.getElementById('total-day-energy');
    const totalNightEnergyEl = document.getElementById('total-night-energy');
    const totalEnergyEl = document.getElementById('total-energy');

    // Summary card fields
    const summaryTotalPowerEl = document.getElementById('summary-total-power');
    const summaryDayEnergyEl = document.getElementById('summary-day-energy');
    const summaryNightEnergyEl = document.getElementById('summary-night-energy');
    const summaryTotalEnergyEl = document.getElementById('summary-total-energy');
    
    const PRESET_APPLIANCES = {
        ar: [
            "تلفزيون", "ثلاجة", "مكيف هواء", "غسالة", "ميكروويف", "سخان مياه",
            "كمبيوتر", "راوتر", "لمبة LED", "مروحة سقف", "مضخة مياه",
            "غلاية كهربائية", "فرن كهربائي", "دفاية", "مكواة ملابس", "جهاز استقبال رسيفر",
            "جهاز بلايستيشن", "جهاز كمبيوتر محمول", "جهاز عرض (بروجكتور)", "مروحة مكتب", "جهاز تنقية هواء",
            "مضخة غاطسة", "جهاز DVR كاميرات", "جهاز طابعة", "جهاز شحن موبايل", "جهاز تحكم باب جراج"
        ],
        en: [
            "Television", "Refrigerator", "Air Conditioner", "Washing Machine", "Microwave", "Water Heater",
            "Computer", "Router", "LED Bulb", "Ceiling Fan", "Water Pump",
            "Electric Kettle", "Electric Oven", "Heater", "Iron", "Satellite Receiver",
            "PlayStation", "Laptop", "Projector", "Desk Fan", "Air Purifier",
            "Submersible Pump", "DVR (CCTV)", "Printer", "Mobile Charger", "Garage Door Opener"
        ]
    };


    function calculateRow(row) {
        const quantity = parseFloat(row.querySelector('[name="quantity"]').value) || 0;
        const power = parseFloat(row.querySelector('[name="power"]').value) || 0;
        const dayHours = parseFloat(row.querySelector('[name="day_hours"]').value) || 0;
        const nightHours = parseFloat(row.querySelector('[name="night_hours"]').value) || 0;

        const totalPower = quantity * power;
        const dayEnergy = totalPower * dayHours;
        const nightEnergy = totalPower * nightHours;
        const totalEnergy = dayEnergy + nightEnergy;

        row.querySelector('[name="total_power"]').value = totalPower.toLocaleString();
        row.querySelector('[name="day_energy"]').value = dayEnergy.toLocaleString();
        row.querySelector('[name="night_energy"]').value = nightEnergy.toLocaleString();
        row.querySelector('[name="total_energy"]').value = totalEnergy.toLocaleString();

        updateTotals();
    }

    function updateTotals() {
        const rows = tableBody.querySelectorAll('.calculator-row');
        let totalQty = 0;
        let totalPower = 0;
        let totalDayEnergy = 0;
        let totalNightEnergy = 0;
        let totalEnergy = 0;

        rows.forEach(row => {
            totalQty += parseFloat(row.querySelector('[name="quantity"]').value) || 0;
            totalPower += (parseFloat(row.querySelector('[name="quantity"]').value) || 0) * (parseFloat(row.querySelector('[name="power"]').value) || 0);
            totalDayEnergy += parseFloat(row.querySelector('[name="day_energy"]').value.replace(/,/g, '')) || 0;
            totalNightEnergy += parseFloat(row.querySelector('[name="night_energy"]').value.replace(/,/g, '')) || 0;
            totalEnergy += parseFloat(row.querySelector('[name="total_energy"]').value.replace(/,/g, '')) || 0;
        });

        // Update table footer
        totalQtyEl.textContent = totalQty.toLocaleString();
        totalPowerEl.textContent = `${totalPower.toLocaleString()} W`;
        totalDayEnergyEl.textContent = `${totalDayEnergy.toLocaleString()} Wh`;
        totalNightEnergyEl.textContent = `${totalNightEnergy.toLocaleString()} Wh`;
        totalEnergyEl.textContent = `${totalEnergy.toLocaleString()} Wh/d`;

        // Update summary card
        summaryTotalPowerEl.textContent = `${totalPower.toLocaleString()} W`;
        summaryDayEnergyEl.textContent = `${totalDayEnergy.toLocaleString()} Wh/d`;
        summaryNightEnergyEl.textContent = `${totalNightEnergy.toLocaleString()} Wh/d`;
        summaryTotalEnergyEl.textContent = `${totalEnergy.toLocaleString()} Wh/d`;
    }
    
    function createDatalist() {
        const datalist = document.createElement('datalist');
        datalist.id = 'appliances-list';
        const currentLang = document.documentElement.lang || 'ar';
        PRESET_APPLIANCES[currentLang].forEach(appliance => {
            const option = document.createElement('option');
            option.value = appliance;
            datalist.appendChild(option);
        });
        document.body.appendChild(datalist);
    }

    function addRow() {
        const newRow = rowTemplate.content.cloneNode(true);
        const nameInput = newRow.querySelector('[name="appliance_name"]');
        if (nameInput) {
            nameInput.setAttribute('list', 'appliances-list');
        }
        tableBody.appendChild(newRow);
        updateResponsiveLabels(); // Apply labels for the new row
    }
    
    function updateResponsiveLabels() {
        const currentLang = document.documentElement.lang || 'ar';
        tableBody.querySelectorAll('td').forEach(td => {
            const label = td.getAttribute(`data-label-${currentLang}`);
            if (label) {
                td.setAttribute('data-label', label);
            }
        });
    }

    function resetCalculator() {
        tableBody.innerHTML = '';
        for (let i = 0; i < 3; i++) { // Start with 3 empty rows
            addRow();
        }
        updateTotals();
    }

    // --- Event Listeners ---
    if (addRowBtn) {
        addRowBtn.addEventListener('click', addRow);
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', resetCalculator);
    }

    if (tableBody) {
        // Use event delegation for performance
        tableBody.addEventListener('input', (e) => {
            if (e.target.matches('.form-control')) {
                const row = e.target.closest('.calculator-row');
                if (row) {
                    calculateRow(row);
                }
            }
        });

        tableBody.addEventListener('click', (e) => {
            if (e.target.closest('.delete-row-btn')) {
                const row = e.target.closest('.calculator-row');
                if (row) {
                    row.remove();
                    updateTotals();
                }
            }
        });
    }
    
    // Observer to re-apply labels when language changes
    const langObserver = new MutationObserver((mutations) => {
        for (let mutation of mutations) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
                updateResponsiveLabels();
                const oldDatalist = document.getElementById('appliances-list');
                if (oldDatalist) oldDatalist.remove();
                createDatalist();
            }
        }
    });

    langObserver.observe(document.documentElement, { attributes: true });


    // --- Initialisation ---
    function init() {
        if (!tableBody || !rowTemplate) {
            console.error("Calculator table body or template not found. Aborting initialization.");
            return;
        }
        createDatalist();
        resetCalculator(); // Start with a fresh set of rows
    }

    init();
});
/* --- END OF FILE solar-calculator.js --- */