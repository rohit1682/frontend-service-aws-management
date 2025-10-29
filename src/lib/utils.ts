import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

export function formatDate(date: Date | string) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date));
}

export function formatCurrency(amount: number, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(amount);
}

export function formatRegions(activeRegions: string): string {
    if (!activeRegions || activeRegions.trim() === '') {
        return 'No regions';
    }

    try {
        // Try to parse as JSON array first
        const regions = JSON.parse(activeRegions);
        if (Array.isArray(regions)) {
            if (regions.length === 0) return 'No regions';
            if (regions.length === 1) return regions[0];
            if (regions.length <= 3) return regions.join(', ');
            return `${regions.slice(0, 2).join(', ')} +${regions.length - 2} more`;
        }
    } catch {
        // If not JSON, treat as comma-separated string
        const regions = activeRegions.split(',').map(r => r.trim()).filter(r => r);
        if (regions.length === 0) return 'No regions';
        if (regions.length === 1) return regions[0];
        if (regions.length <= 3) return regions.join(', ');
        return `${regions.slice(0, 2).join(', ')} +${regions.length - 2} more`;
    }

    return activeRegions;
}

export function triggerVibration(pattern: number | number[] = 200) {
    // Check if vibration is supported
    if ('vibrate' in navigator) {
        navigator.vibrate(pattern);
    }
}

export function shakeElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('animate-shake');
        setTimeout(() => {
            element.classList.remove('animate-shake');
        }, 500);
    }
}