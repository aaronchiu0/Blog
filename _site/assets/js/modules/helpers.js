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

export function NewtonRaphson(f_x, fprime_x, req, scope, x, nmax, eps, del) {
    const {k, n: trials, p} = scope;
    let n, fx, fp;

    fx = req - f_x(scope);
    
    scope = {
        k: k,  n: x, p: p
    };

    

    console.group("Test: Newton Raphson");
    console.time("Newton Raphson");

    console.log(scope);

    console.log({n: 0, x: x, fx: fx});

    for (n = 1; n <= nmax; n++) {
        fp = fprime_x(scope, x, 0.00001);

        if (Math.abs(fp) < del) {
            console.log("Small Derivative: Out of Bounds");
            break;
        }

        let d = fx/fp;
        x = x - d;

        scope = {
            n: x
        };

        fx = req - f_x(scope);

        console.log({n: n, x: x, fx: fx});

        if (Math.abs(d) < eps) {
            console.log("Convergence");
            break;
        }
    }

    console.log(`Newton Raphson has ran ${n} time(s)`)
    console.timeEnd("Newton Raphson");
    console.groupEnd();

    return x;
} 