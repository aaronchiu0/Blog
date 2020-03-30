export function clamp(num, min, max) {
    if (num <= min)
        return min;
    else if (num >= max)
        return max;
    else 
        return num;
}

export const precise = (x, p) => Number.parseFloat(x).toPrecision(p);
export const financial = (x) => Number.parseFloat(x).toFixed(2);

export function toPercent (x, tex=false) {
    if(isNaN(x))
    {
        return `${x}`;
    } else {
        if (tex)
            return `${precise(x*100, 8)*1}\\%`; // fix precision errors
        else
            return `${precise(x*100, 8)*1}%`; // fix precision errors
    }
}