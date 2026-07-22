/**
 * EROSSARC Utility Functions & Formatters
 */

const Utils = {
    formatCurrency: (value, decimals = 2) => {
        return Number(value).toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    },

    randomRange: (min, max) => {
        return Math.random() * (max - min) + min;
    },

    debounce: (func, wait = 100) => {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
};
