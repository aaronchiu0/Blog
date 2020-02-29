// Round to precision
const precise = (x, p) => Number.parseFloat(x).toPrecision(p);
const toPercent = (x) => isNaN(x) ? `${x}` : `${x*100}\\%`;
const tex = (str) => `$$ ${str} $$`;

// global variables
var scope = { i: -1, n: -1 };
var selectedFactor = 0;
var selectedCalc = "";

// expression objects definition
class Factor {
    constructor(name, expression, print=expression) {
        this.m_name = name;
        this.m_expression = expression;
        this.m_print = print;
    }
    
    get name() {        return this.m_name; }
    get expression() {  return this.m_expression; }
    get parsed() {      return math.parse(this.m_expression); }
    get compiled() {    return math.compile(this.m_expression); }

    get ungiven() {     return this.m_name.charAt(0); }
    get given() {       return this.m_name.charAt(2); }

    get print(){        return math.parse(this.m_print); }

    set name(name) {                 this.m_name = name; }
    set expression(expression) {     this.m_expression = expression; }

    eval(scope) { return this.compiled.evaluate(scope); }
    derivative(x) { return math.derivative(this.parsed, x); }
    eval_derivative(x, scope) { return this.derivative(x).evaluate(scope); }

    formatted(i, n) { return `( ${this.m_name}, ${toPercent(i)}, ${n})`; }
    printTex() { return this.print.toTex({parenthesis: 'auto'}); }
}

class GrowthFactor extends Factor {
    constructor(name, expression, adjusted, print) {
        super(name, expression, print);
        this.m_adjusted_i = adjusted;
    }

    get adjusted_i() { return math.parse(this.m_adjusted_i); }

    formatted(g, i, n) { return `( ${this.m_name}, ${g}, ${toPercent(i)}, ${n})`; }
    printTexAdjusted() {
        return `i^o&=${this.adjusted_i.toTex({parenthesis: 'auto'})}`;
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
    pg = new Factor("P/G", '((1+i)^n-i*n-1)/(i^2*(1+i)^n)'),

    pa = new GrowthFactor("P/A", '((1+i)^n-1)/(i*(1+i)^n)*(1/(1+g))', '(1+i)/(1+g)-1', '((1+i^o)^n-1)/(i^o*(1+i^o)^n)*(1/(1+g))')
];

const changeScope = (x) => {
    selectedCalc == "rate" ? scope.i = x : scope.n = x;
    return scope;
}

function NewtonRaphson(f_x, fprime_x, x, nmax, eps, del) {
    let n, fx, fp;
    console.log(f_x, fprime_x, scope);

    fx = math.evaluate(f_x, changeScope(x));
    console.log(0, x, fx);

    for (n = 1; n <= nmax; n++) {
        fp = math.evaluate(fprime_x, changeScope(x));

        if (Math.abs(fp) < del) {
            console.log("small derivative");
            break;
        }

        let d = fx/fp;
        x = x - d;
        fx = math.evaluate(f_x, changeScope(x));

        console.log(n, x, fx);

        if (Math.abs(d) < eps) {
            console.log("Convergence");
            break;
        }
    }
    return x;
} 

$(document).ready(function(){
    const calcFactor = function() {
        let amount = parseFloat($(".amount").val());

        scope = {
            i: parseFloat($("#rate").val()),
            n: parseFloat($("#period").val())
        };

        let factor = factors[selectedFactor].eval(scope);

        console.log(amount, factor, scope);

        let ans = amount*factor;

        factor = precise(factor, 8);
        ans = precise(ans, 8);

        $("#calculation-IO .output").text(function() {
            const obj = factors[selectedFactor];
            const {given, ungiven} = obj;
            return "$\\begin{align}"+ungiven+"&="+given+obj.formatted("i", "n")+"\\\\&="+amount+obj.formatted(scope.i, scope.n)+"\\\\&="+amount+"("+factor+")\\\\&="+ans+"\\end{align}$"
        });

        MathJax.Hub.Typeset();
    };

    const update = function() {
        const {name, given, ungiven} = factors[selectedFactor];
        $("#calculation-IO h3").text(`Calculating ${name}`);
        $("#calculation-IO .amount-label").text(`${given}`);
        $("#calculation-IO-interpolate .first-label").text(`${ungiven}`);
        $("#calculation-IO-interpolate .second-label").text(`${given}`);

        console.log(selectedFactor, $(this).text());

        calcFactor();
    };

    $("#calculation-type .factor").click(function() {
        selectedFactor = $(this).index(".factor");
        update();
    });

    $("#calculation-IO .amount, #calculation-IO #rate, #calculation-IO #period").change(calcFactor);

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
        let first = parseFloat($("#calculation-IO-interpolate .first-amount").val());
        let second = parseFloat($("#calculation-IO-interpolate .second-amount").val());
        var known = parseFloat($(".calculate").val());

        let f = factors[selectedFactor];
        const {given, ungiven} = f;

        let shift = first/second;

        let ans = -1;
        if (selectedCalc == "rate") {
            scope = { i: 0.001, n: known };

            ans = NewtonRaphson(`${f.expression}-${shift}`, `${f.derivative('i')}`, scope.i, 100, 0.0000000001, 0.0001);
        }
        else {
            scope = { i: known, n: 2 };

            ans = NewtonRaphson(`${f.expression}-${shift}`,`${f.derivative('n')}`, scope.n, 100, 0.0000000001, 0.0001);
        }

        ans = precise(ans, 8);

        if (selectedCalc == "rate"){
            $("#calculation-IO-interpolate .output").text(function() {
                return `$\\begin{align}${ungiven}&=${given}${f.formatted("i", "n")}\\\\${first}&=${second}${f.formatted("i", scope.n)}\\\\${shift}&=${f.formatted("i", scope.n)}\\\\i&=${toPercent(ans)}\\end{align}$`
            });
        }
        else {
            $("#calculation-IO-interpolate .output").text(function() {
                return `$\\begin{align}${ungiven}&=${given}${f.formatted("i", "n")}\\\\${first}&=${second}${f.formatted(scope.i, "n")}\\\\${shift}&=${f.formatted(scope.i, "n")}\\\\n&=${ans}\\end{align}$`
            });
        }

        MathJax.Hub.Typeset();
    });

    // on load
    update();

    // print out formulas
    for (let i = factors.length-1; i >= 0; i--) {
        if (i == 8) {
            $("#formula-heading").after(tex(`\\begin{align}${factors[i].formatted("g", "i", "n")}&=${factors[i].printTex()} \\\\ ${factors[i].printTexAdjusted()}\\end{align}`));
            continue;
        }

        $("#formula-heading").after(tex(`${factors[i].formatted("i", "n")}=${factors[i].printTex()}`)+"<br>");
    }
});
