/**
 * EROSSARC Interactive Custom Canvas Chart Simulator
 */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('interactiveChartCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.parentElement.clientWidth;
    let height = canvas.parentElement.clientHeight;

    canvas.width = width;
    canvas.height = height;

    window.addEventListener('resize', () => {
        if (!canvas.parentElement) return;
        width = canvas.parentElement.clientWidth;
        height = canvas.parentElement.clientHeight;
        canvas.width = width;
        canvas.height = height;
    });

    let currentAsset = 'forex';
    let basePrice = 1.0845;
    let volatility = 0.0015;

    const assetButtons = document.querySelectorAll('.asset-btn');
    assetButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            assetButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentAsset = e.target.getAttribute('data-asset');
            
            if (currentAsset === 'forex') { basePrice = 1.0845; volatility = 0.0012; }
            else if (currentAsset === 'crypto') { basePrice = 64800; volatility = 450; }
            else if (currentAsset === 'commodities') { basePrice = 2380; volatility = 12; }
            else if (currentAsset === 'indices') { basePrice = 18200; volatility = 85; }
        });
    });

    // Generate simulated price series
    let pointsCount = 60;
    let priceHistory = [];

    function generateInitialData() {
        priceHistory = [];
        let p = basePrice;
        for (let i = 0; i < pointsCount; i++) {
            p += (Math.random() - 0.48) * volatility;
            priceHistory.push(p);
        }
    }
    generateInitialData();

    function drawChart() {
        ctx.clearRect(0, 0, width, height);

        // Update live price with slight drift
        let lastPrice = priceHistory[priceHistory.length - 1];
        lastPrice += (Math.random() - 0.49) * (volatility * 0.3);
        priceHistory.push(lastPrice);
        priceHistory.shift();

        // Update DOM price readout
        const simPriceEl = document.getElementById('simPrice');
        if (simPriceEl) {
            simPriceEl.innerText = lastPrice.toFixed(currentAsset === 'crypto' || currentAsset === 'indices' ? 2 : 5);
        }

        const padding = 40;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;

        const minVal = Math.min(...priceHistory);
        const maxVal = Math.max(...priceHistory);
        const range = maxVal - minVal || 1;

        // Draw Grid Lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 1;
        for (let i = 1; i <= 4; i++) {
            let y = padding + (chartHeight / 4) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }

        // Draw Area Gradient & Line
        const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
        gradient.addColorStop(0, 'rgba(255, 107, 0, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 107, 0, 0.0)');

        ctx.beginPath();
        priceHistory.forEach((val, index) => {
            let x = padding + (chartWidth / (pointsCount - 1)) * index;
            let y = height - padding - ((val - minVal) / range) * chartHeight;
            if (index === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });

        // Close path for area fill
        ctx.lineTo(width - padding, height - padding);
        ctx.lineTo(padding, height - padding);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Stroke Main Line
        ctx.beginPath();
        priceHistory.forEach((val, index) => {
            let x = padding + (chartWidth / (pointsCount - 1)) * index;
            let y = height - padding - ((val - minVal) / range) * chartHeight;
            if (index === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = '#FF6B00';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        requestAnimationFrame(drawChart);
    }

    drawChart();
});
