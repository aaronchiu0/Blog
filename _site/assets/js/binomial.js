import * as Helpers from "./modules/helpers.js";

const binomialCoefficent = (n, k) => math.factorial(n)/(math.factorial(k)*math.factorial(n-1));
const binomial = (k, n, p) => binomialCoefficent(n, k)*Math.pow(p, k)*Math.pow(1-p, n-k);

console.log(binomial(1, 100, 0.01));

$(document).ready(function(){
    let k = parseFloat($("#successes").val());
    let n = parseFloat($("#trials").val());
    let p = parseFloat($("#probability").val());

    $("#successes, #trials, #probability").on('input', function(){
        let ans = binomial(k, n, p)
        $(".output").text(ans);  
    });
});