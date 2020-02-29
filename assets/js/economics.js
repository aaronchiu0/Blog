// Round to precision
const precise = (x, p) => Number.parseFloat(x).toPrecision(p);
const financial = (x) => Number.parseFloat(x).toPrecision(2);
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
    new Factor("F/P", '(1+i)^n'),
    new Factor("P/F", '1/(1+i)^n'),
    new Factor("A/F", 'i/((1+i)^n-1)'),
    new Factor("A/P", 'i*(1+i)^n/((1+i)^n-1)'),
    new Factor("F/A", '((1+i)^n-1)/i'),
    new Factor("P/A", '((1+i)^n-1)/(i*(1+i)^n)'),
    new Factor("A/G", '1/i-n/((1+i)^n-1)'),
    new Factor("P/G", '((1+i)^n-i*n-1)/(i^2*(1+i)^n)'),

    new GrowthFactor("P/A", '((1+i)^n-1)/(i*(1+i)^n)*(1/(1+g))', '(1+i)/(1+g)-1', '((1+i^o)^n-1)/(i^o*(1+i^o)^n)*(1/(1+g))')
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

class Car extends React.Component {
    render() {
      return (
        <p>Hello</p>
      )
    }
}

//ReactDOM.render(<Car />, document.getElementById("test"));

$(document).ready(function(){
    const calcFactor = () => {
        let amount = parseFloat($(".amount").val());

        scope = {
            i: parseFloat($("#rate").val()),
            n: parseFloat($("#period").val())
        };

        let factor = factors[selectedFactor].eval(scope);

        console.log(amount, factor, scope);

        let ans = amount*factor;

        factor = precise(factor, 8);
        ans = financial(ans);

        const obj = factors[selectedFactor];
        const {given, ungiven} = obj;

        katex.render(`\\begin{aligned}${ungiven}&=${given}${obj.formatted("i", "n")}\\\\&=${amount}${obj.formatted(scope.i, scope.n)}\\\\&=${amount}(${factor})\\\\&=${ans}\\end{aligned}`, document.querySelector('#calculation-IO .output'), {
            throwOnError: false
         });
    };

    const interpolateFactor = () => {
        let first = parseFloat($("#calculation-IO-interpolate .first-amount").val());
        let second = parseFloat($("#calculation-IO-interpolate .second-amount").val());
        var known = parseFloat($(".calculate").val());

        let f = factors[selectedFactor];
        const {given, ungiven} = f;

        let shift = first/second;

        var ans = -1;
        if (selectedCalc == "rate") {
            scope = { i: 0.001, n: known };

            ans = NewtonRaphson(`${f.expression}-${shift}`, `${f.derivative('i')}`, scope.i, 50, 0.0000000001, 0.0001);
        }
        else {
            scope = { i: known, n: 2 };

            ans = NewtonRaphson(`${f.expression}-${shift}`,`${f.derivative('n')}`, scope.n, 50, 0.0000000001, 0.0001);
        }

        ans = precise(ans, 8);

        if (selectedCalc == "rate"){         
            katex.render(`\\begin{aligned}${ungiven}&=${given}${f.formatted("i", "n")}\\\\${first}&=${second}${f.formatted("i", scope.n)}\\\\${shift}&=${f.formatted("i", scope.n)}\\\\i&=${toPercent(ans)}\\end{aligned}`, document.querySelector('#calculation-IO-interpolate .output'), {
                throwOnError: false
            });
        }
        else {
            katex.render(`\\begin{aligned}${ungiven}&=${given}${f.formatted("i", "n")}\\\\${first}&=${second}${f.formatted(scope.i, "n")}\\\\${shift}&=${f.formatted(scope.i, "n")}\\\\n&=${ans}\\end{aligned}`, document.querySelector('#calculation-IO-interpolate .output'), {
                throwOnError: false
            });
        }
    }

    const update = function() {
        const {name, given, ungiven} = factors[selectedFactor];
        $("#calculation-IO h3").text(`Calculating ${name}`);
        $("#calculation-IO .amount-label").text(`${given}`);
        $("#calculation-IO-interpolate .first-label").text(`${ungiven}`);
        $("#calculation-IO-interpolate .second-label").text(`${given}`);

        console.log(selectedFactor, $(this).text());

        calcFactor();
        interpolateFactor();
    };

    $("#calculation-type .factor").click(function() {
        selectedFactor = $(this).index(".factor");
        update();
    });
    
    $("#calculation-IO-interpolate #calcRate, #calculation-IO-interpolate #calcPeriod").click(function() {
        $("#calculation-IO-interpolate h3").text("Calculating "+$(this).text());

        if ($(this).is("#calculation-IO-interpolate #calcRate")) {
            $(".calculate-label").text("Period");
            selectedCalc = "rate";
        }
        else {
            $(".calculate-label").text("Rate");
            selectedCalc = "period";
        }

        interpolateFactor();
    });

    $("#calculation-IO .submit").click(calcFactor);
    $("#calculation-IO-interpolate .submit").click(interpolateFactor);

    // on load
    update();
    interpolateFactor();

    // on change
    $("#calculation-IO .amount, #calculation-IO #rate, #calculation-IO #period").on('input', calcFactor);
    $("#calculation-IO-interpolate .first-amount, #calculation-IO-interpolate .second-amount, #calculation-IO-interpolate .calculate").on('input', interpolateFactor); // resource heavy

    // print out formulas
    for (let i = factors.length-1; i >= 0; i--) {
        var tex;
        if (i == 8) {
            tex = katex.renderToString(`\\begin{aligned}${factors[i].formatted("g", "i", "n")}&=${factors[i].printTex()} \\\\ ${factors[i].printTexAdjusted()}\\end{aligned}`, {
                throwOnError: false,
                displayMode: true
            });
            $("#formula-heading").after(tex);
            continue;
        }

        tex = katex.renderToString(`${factors[i].formatted("i", "n")}=${factors[i].printTex()}`, {
            throwOnError: false,
            displayMode: true
        });
        $("#formula-heading").after(`${tex}<br>`);
    }
});
