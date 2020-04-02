import * as Helpers from "./modules/helpers.js";

function binomialCoef (n, k) {
    let product = 1;
    for (let i = 1; i <= k; i++) {
        product *= (n + 1 + i)/i 
    }
    return product;
}

const binomial = (k, n, p) => binomialCoef(n, k)*Math.pow(p, k)*Math.pow(1-p, n-k);

function cumulativeBinomial (k, n, p) {
    let sum = 0;
    for (let i = 0; i < k; i++) {
        sum += binomial(i, n, p);
    }
    return sum;
}

const expectedTrials = (r, p) => Math.log(1-r)/Math.log(1-p);

$(document).ready(function(){
    // Chance Calculator
    let data_set = [];
    function calculateBinomial(chart) {
        let k = parseFloat($("#at-least-X #successes").val());
        let n = parseFloat($("#at-least-X #trials").val());
        let p = parseFloat($("#at-least-X #probability").val());

        let ans = 1 - cumulativeBinomial(k, n, p);
        $("#at-least-X .output").text(Helpers.toPercent(Helpers.clamp(ans, 0, 1)));  

        data_set.splice(0, data_set.length);
        for (let i = 0; i <= 300; i+=1) {
            data_set.push({
                x: i, y: Helpers.clamp(1 - cumulativeBinomial(k, i, p), 0, 1)
            });

            if (1 - cumulativeBinomial(k, i, p) > 0.999)
                break;
            
        }

        console.log(data_set);
        
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
        let r = parseFloat($("#required-trials #req-probability").val());
        let p = parseFloat($("#required-trials #probability").val());

        let ans = expectedTrials(r, p);
        $("#required-trials .output").text(ans);  
    }

    $("#required-trials #req-probability, #required-trials #probability").on('input', calculateRequired);

        
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