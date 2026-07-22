/**
 * EROSSARC Live Market Ticker Generator
 */

document.addEventListener('DOMContentLoaded', () => {
    const tickerTrack = document.getElementById('tickerTrack');
    if (!tickerTrack) return;

    const marketSymbols = [
        { symbol: 'BTC/USD', price: '64,820.50', change: '+2.45%', positive: true },
        { symbol: 'ETH/USD', price: '3,490.10', change: '+1.82%', positive: true },
        { symbol: 'USD/JPY', price: '154.62', change: '-0.15%', positive: false },
        { symbol: 'EUR/USD', price: '1.0845', change: '+0.12%', positive: true },
        { symbol: 'GBP/USD', price: '1.2630', change: '-0.24%', positive: false },
        { symbol: 'XAU/USD', price: '2,385.40', change: '+0.85%', positive: true },
        { symbol: 'US OIL', price: '82.10', change: '-1.12%', positive: false },
        { symbol: 'NASDAQ', price: '18,240.00', change: '+0.64%', positive: true },
        { symbol: 'S&P 500', price: '5,420.20', change: '+0.42%', positive: true }
    ];

    // Duplicate array to ensure seamless infinite marquee animation loop
    const duplicateData = [...marketSymbols, ...marketSymbols, ...marketSymbols];

    tickerTrack.innerHTML = duplicateData.map(item => `
        <div class="ticker-item">
            <span class="ticker-symbol">${item.symbol}</span>
            <span class="ticker-price">${item.price}</span>
            <span class="ticker-change ${item.positive ? 'positive' : 'negative'}">${item.change}</span>
        </div>
    `).join('');
});
