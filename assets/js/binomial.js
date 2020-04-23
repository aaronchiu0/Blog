import * as Helpers from "./modules/helpers.js";

function binomialCoef (n, k) {
    let product = 1;
    for (let i = 1; i <= k; i++) {
        product *= (n + 1 - i)/i; 
    }
    return product;
}

const binomial = (k, n, p) => binomialCoef(n, k)*Math.pow(p, k)*Math.pow(1-p, n-k);

function cumulativeBinomial(scope) {
    const {k, n, p} = scope;

    let sum = 0;
    for (let i = 0; i <= k; i++) {
        sum += binomial(i, n, p);
    }
    return sum;
}

function cumulativeBinomialDifferential(scope, x, h) {
    const {k, n, p} = scope;
    //console.log({k: k, p: p}, "x+h:", x+h);
    //console.log((-required+1-cumulativeBinomial(k, x+h, p) - (-required+1-cumulativeBinomial(k, x-h, p)))/(2*h));
    return (-cumulativeBinomial({k: k, n: x+h, p: p}) - (-cumulativeBinomial({k: k, n: x-h, p: p})))/(2*h);
}

function NewtonRaphson(required, scope, x, nmax, eps, del) {
    const {k, n: trials, p} = scope;
    let n, fx, fp;

    fx = -required+1-cumulativeBinomial({k: k-1, n: x, p: p});

    console.group("Binomial: Newton Raphson");
    console.time("Newton Raphson");

    console.log(scope);

    console.log({n: 0, x: x, fx: fx});

    for (n = 1; n <= nmax; n++) {
        fp = cumulativeBinomialDifferential({k: k-1, trials, p}, x, 0.0001);

        if (Math.abs(fp) < del) {
            console.warn("Small Derivative: Out of Bounds");
            break;
        }

        let d = fx/fp;
        x = x - d;
        fx = -required+1-cumulativeBinomial({k: k-1, n: x, p: p});

        console.log({n: n, x: x, fx: fx});

        if (Math.abs(d) < eps) {
            console.log("Convergence");
            break;
        }
    }

    console.log(`Newton Raphson has ran ${n} time(s)`)
    console.timeEnd("Newton Raphson");
    console.groupEnd();

    console.log({x: x});
    return x;
} 

//NewtonRaphson({k: 1, n: 50, p: 0.01}, 1, 50, 0.0000000001, 0.0001);



$(document).ready(function(){
    // Chance Calculator
    let data_set = [];
    function calculateBinomial(chart) {
        let k = parseFloat($("#at-least-X #successes").val());
        let n = parseFloat($("#at-least-X #trials").val());
        let p = parseFloat($("#at-least-X #probability").val());

        let ans = 1 - cumulativeBinomial({k: k-1, n: n, p: p});
        $("#at-least-X .output").text(Helpers.toPercent(Helpers.clamp(ans, 0, 1)));  

        data_set.splice(0, data_set.length);
        for (let i = 0; i <= 300; i+=1) {
            data_set.push({
                x: i, y: Helpers.clamp(1 - cumulativeBinomial({k: k-1, n: i, p: p}), 0, 1)
            });

            if (1 - cumulativeBinomial({k: k-1, n: i, p: p}) > 0.999)
                break;
            
        }
        
        chart.options = {
            scales: {
                xAxes: [{
                    ticks: {
                    min: 0,
                    max: data_set.length-1
                    }
                }],
                yAxes: [{
                    ticks: {
                    min: 0,
                    max: 1
                    }
                }]
            }
        };
        chart.update();
    }

    $("#at-least-X #successes, #at-least-X #trials, #at-least-X #probability").on('input', function(){
        calculateBinomial(chart);
    });

    $("#at-least-X #successes-slider").on('input', function(){
        $("#at-least-X #successes").val(this.value);
        calculateBinomial(chart);
    });

    $("#at-least-X #trials-slider").on('input', function(){
        $("#at-least-X #trials").val(this.value);       
        calculateBinomial(chart);
    });

    $("#at-least-X #probability-slider").on('input', function(){
        $("#at-least-X #probability").val(this.value);     
        calculateBinomial(chart);
    });

    // Required Probability
    function calculateRequired() {
        let k = parseFloat($("#required-trials #successes").val());
        let r = parseFloat($("#required-trials #req-probability").val());
        let p = parseFloat($("#required-trials #probability").val());


        let test = 1;
        if (p >= 0.07)
            test = 5;
        else if(p >= 0.01)
            test = 100;
        else if(p >= 0.001)
            test = 1000;

        if (k >= 3)
            test = 1000;

        console.log({test: test});
        let ans = NewtonRaphson(r, {k: k, n: 50, p: p}, test, 50, 0.0000000001, 0.0001);

        Helpers.NewtonRaphson(cumulativeBinomial, cumulativeBinomialDifferential, r, {k: k, n: 50, p: p}, test, 50, 0.0000000001, 0.0001);


        if (ans <= 0 || ans == test)
            $("#required-trials .output").text("~1"); 
        else
            $("#required-trials .output").text(ans);  
    }

    $("#required-trials #successes, #required-trials #req-probability, #required-trials #probability").on('input', calculateRequired);

    $("#required-trials #successes-slider").on('input', function(){
        $("#required-trials #successes").val(this.value);     
        calculateRequired();
    });

    $("#required-trials #req-probability-slider").on('input', function(){
        $("#required-trials #req-probability").val(this.value);     
        calculateRequired();
    });

    $("#required-trials #probability-slider").on('input', function(){
        $("#required-trials #probability").val(this.value);     
        calculateRequired();
    });
    
    // Chart of X number of Succeses
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Trials angainst Success',
                data: data_set
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                    min: 0,
                    max: 300
                    }
                }],
                yAxes: [{
                    ticks: {
                    min: 0,
                    max: 1
                    }
                }]
            }
        }
    });

    // On load
    $(window).on('load', function() {
        calculateBinomial(chart);
        calculateRequired();
    });
});