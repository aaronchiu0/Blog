// Round to precision
function precise(x) {
    return Number.parseFloat(x).toPrecision(6);
}

// global variables
var scope = {
    i: -1,
    n: -1
};
var selectedFactor = -1;
var selectedCalc = "";

var factorNames = [ "F/P", "P/F", "A/F", "A/P", "F/A", "P/A", "A/G", "P/G" ];

// expressions to evaluate
var expressions = [
    fp = math.parse('(1+i)^n'),
    pf = math.parse('1/(1+i)^n'),
    af = math.parse('i/((1+i)^n-1)'),
    ap = math.parse('i*(1+i)^n/((1+i)^n-1)'),
    fa = math.parse('((1+i)^n-1)/i'),
    pa = math.parse('((1+i)^n-1)/(i*(1+i)^n)'),
    ag = math.parse('1/i-n/((1+i)^n-1)'),
    pg = math.parse('((1+i)^n-i*n-1)/(i^2*(1+i)^n)'),
];

// compile expressions
var compiled_expressions = new Array;
for (let i = 0; i < expressions.length; i++) {
    compiled_expressions.push(expressions[i].compile());
}

var derivative_i = new Array;
for (let i = 0; i < expressions.length; i++) {
    derivative_i.push(math.derivative(expressions[i], 'i'));
}

var derivative_n = new Array;
for (let i = 0; i < expressions.length; i++) {
    derivative_n.push(math.derivative(expressions[i], 'n'));
}

function NewtonRaphson(equals, x, nmax, eps, del) {
    var n, fx, fp;

    selectedCalc == "rate" ? scope.i = x : scope.n = x;
    console.log(selectedFactor, equals, scope);

    fx = compiled_expressions[selectedFactor].evaluate(scope) - equals;
    console.log(0, x, fx);

    for (n = 1; n <= nmax; n++) {
        selectedCalc == "rate" ? fp = derivative_i[selectedFactor].evaluate(scope) : fp = derivative_n[selectedFactor].evaluate(scope);

        if (Math.abs(fp) < del) {
            console.log("small derivative")
            return;
        }

        let d = fx/fp;
        x = x - d;
        selectedCalc == "rate" ? scope.i = x : scope.n = x;
        fx = compiled_expressions[selectedFactor].evaluate(scope) - equals;

        console.log(n, x, fx);

        if (Math.abs(d) < eps) {
            console.log("Convergence");
            break;
        }
    }
    return x;
} 

$(document).ready(function(){
    $("#calculation-type .factor").click(function() {
        selectedFactor = $(this).index(".factor");
        $("#calculation-IO h3").text("Calculating "+$(this).text());
        $("#calculation-IO .amount-label").text($(this).text().charAt(2));
        $("#calculation-IO-interpolate .first-label").text($(this).text().charAt(0));
        $("#calculation-IO-interpolate .second-label").text($(this).text().charAt(2));

        console.log(selectedFactor, $(this).text());
    });


    $("#calculation-IO .submit").click(function() {
        var amount = parseFloat($(".amount").val());

        scope = {
            i: parseFloat($("#rate").val()),
            n: parseFloat($("#period").val())
        };

        var factor = compiled_expressions[selectedFactor].evaluate(scope);

        console.log(amount, factor, scope);

        var ans = amount*factor;

        factor = precise(factor);
        ans = precise(ans);

        $("#calculation-IO .output").text(
            "$\\begin{align}"+factorNames[selectedFactor].charAt(0)+"&="+factorNames[selectedFactor].charAt(2)+"("+factorNames[selectedFactor]+",i, n)\\\\&="+amount+"("+factorNames[selectedFactor]+","+scope.i+","+scope.n+")\\\\&="+amount+"("+factor+")\\\\&="+ans+"\\end{align}$");


        MathJax.Hub.Typeset();
    });

    $("#calculation-IO-interpolate #calcRate").click(function() {
        $("#calculation-IO-interpolate h3").text("Calculating "+$(this).text());
        $(".calculate-label").text("Period");
        selectedCalc = "rate";
    });

    $("#calculation-IO-interpolate #calcPeriod").click(function() {
        $("#calculation-IO-interpolate h3").text("Calculating "+$(this).text());
        $(".calculate-label").text("Rate");
        selectedCalc = "period";
    });

    $("#calculation-IO-interpolate .submit").click(function() {
        var first = parseFloat($("#calculation-IO-interpolate .first-amount").val());
        var second = parseFloat($("#calculation-IO-interpolate .second-amount").val());
        var known = parseFloat($(".calculate").val());

        selectedCalc == "rate" ? scope.n = known : scope.i = known;

        var ans = -1;
        if (selectedCalc == "rate") {
            scope.n = known;
            ans = NewtonRaphson(first/second, 0.001, 100, 0.0000000001, 0.0001);
        }
        else {
            scope.i = known;
            ans = NewtonRaphson(first/second, 2, 100, 0.0000000001, 0.0001);
        }

        math.format(ans, {precision: 10});
        $("#calculation-IO-interpolate .output").text(ans);
    });

    // print out formulas
    for (let i = expressions.length-1; i >= 0; i--) {
        $("#formula-heading").after("$$"+"("+factorNames[i]+",i, n)="+expressions[i].toTex({parenthesis: 'auto'})+"$$"+"<br>");
    }
});
