// Round to precision
function precise(x, p) {
    return Number.parseFloat(x).toPrecision(p);
}

// global variables
var scope = {
    i: -1,
    n: -1
};
var selectedFactor = -1;
var selectedCalc = "";

// expression objects definition
class Factor {
    constructor(name, expression) {
        this.m_name = name;
        this.m_expression = expression;
    }
    
    get name(){        return this.m_name;}
    get expression(){  return this.m_expression;}
    get parsed(){      return math.parse(this.m_expression);}
    get compiled(){    return math.compile(this.m_expression);}

    set name(name){                 this.m_name = name;}
    set expression(expression){     this.m_expression = expression;}

    eval(scope) {
        return this.compiled.evaluate(scope);
    }

    derivative(x) {
        return math.derivative(this.parsed, x);
    }

    eval_derivative(x, scope) {
        return this.derivative(x).evaluate(scope);
    }
}

// expressions to evaluate
var factors = [
    fp = new Factor("F/P", '(1+i)^n'),
    pf = new Factor("P/F", '1/(1+i)^n'),
    af = new Factor("A/F", 'i/((1+i)^n-1)'),
    ap = new Factor("A/P", 'i*(1+i)^n/((1+i)^n-1)'),
    fa = new Factor("F/A", '((1+i)^n-1)/i'),
    pa = new Factor("P/A", '((1+i)^n-1)/(i*(1+i)^n)'),
    ag = new Factor("A/G", '1/i-n/((1+i)^n-1)'),
    pg = new Factor("P/G", '((1+i)^n-i*n-1)/(i^2*(1+i)^n)')
];

function NewtonRaphson(shift, x, nmax, eps, del) {
    var n, fx, fp;

    selectedCalc == "rate" ? scope.i = x : scope.n = x;
    console.log(selectedFactor, shift, scope);

    fx = factors[selectedFactor].eval(scope) - shift;
    console.log(0, x, fx);

    for (n = 1; n <= nmax; n++) {
        selectedCalc == "rate" ? fp = factors[selectedFactor].eval_derivative('i', scope) : fp = factors[selectedFactor].eval_derivative('n', scope);

        if (Math.abs(fp) < del) {
            console.log("small derivative")
            break;
        }

        let d = fx/fp;
        x = x - d;
        selectedCalc == "rate" ? scope.i = x : scope.n = x;
        fx = factors[selectedFactor].eval(scope) - shift;

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

        var factor = factors[selectedFactor].eval(scope);

        console.log(amount, factor, scope);

        var ans = amount*factor;

        factor = precise(factor, 8);
        ans = precise(ans, 8);

        $("#calculation-IO .output").text(
            "$\\begin{align}"+factors[selectedFactor].name.charAt(0)+"&="+factors[selectedFactor].name.charAt(2)+"("+factors[selectedFactor].name+",i, n)\\\\&="+amount+"("+factors[selectedFactor].name+","+scope.i+","+scope.n+")\\\\&="+amount+"("+factor+")\\\\&="+ans+"\\end{align}$");


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

        var shift = first/second;

        var ans = -1;
        if (selectedCalc == "rate") {
            scope.n = known;
            ans = NewtonRaphson(shift, 0.001, 100, 0.0000000001, 0.0001);
        }
        else {
            scope.i = known;
            ans = NewtonRaphson(shift, 2, 100, 0.0000000001, 0.0001);
        }

        ans = precise(ans, 8);

        if (selectedCalc == "rate"){
            $("#calculation-IO-interpolate .output").text(
                "$\\begin{align}"+factors[selectedFactor].name.charAt(0)+"&="+factors[selectedFactor].name.charAt(2)+"("+factors[selectedFactor].name+",i, n)\\\\"+first+"&="+second+"("+factors[selectedFactor].name+",i,"+scope.n+")\\\\"+shift+"&=("+factors[selectedFactor].name+",i,"+scope.n+")\\\\i&="+ans+"\\end{align}$");
        }
        else {
            $("#calculation-IO-interpolate .output").text(
                "$\\begin{align}"+facto[selectedFactor].name.charAt(0)+"&="+factors[selectedFactor].name.charAt(2)+"("+factors[selectedFactor].name+",i, n)\\\\"+first+"&="+second+"("+factors[selectedFactor].name+","+scope.i+",n)\\\\"+shift+"&=("+factors[selectedFactor].name+","+scope.i+",n)\\\\n&="+ans+"\\end{align}$");
        }

        MathJax.Hub.Typeset();
    });

    // print out formulas
    for (let i = factors.length-1; i >= 0; i--) {
        $("#formula-heading").after("$$"+"("+factors[i].name+",i, n)="+factors[i].parsed.toTex({parenthesis: 'auto'})+"$$"+"<br>");
    }
});
