import * as Helpers from "./modules/helpers.js"; 
import factors from "./modules/interest-factors.js";

// global variables
var scope = { i: 0, n: 0 };
var selectedFactor = 0;
var selectedCalc = "";

const changeScope = (x) => {
    selectedCalc == "rate" ? scope.i = x : scope.n = x;
    return scope;
}

function NewtonRaphson(f_x, fprime_x, x, nmax, eps, del) {
    let n, fx, fp;

    fx = math.evaluate(f_x, changeScope(x));

    console.group("Interest Factors: Newton Raphson");
    console.time("Newton Raphson");

    for (n = 1; n <= nmax; n++) {
        fp = math.evaluate(fprime_x, changeScope(x));

        if (Math.abs(fp) < del) {
            console.log("Small Derivative: Out of Bounds");
            break;
        }

        let d = fx/fp;
        x = x - d;
        fx = math.evaluate(f_x, changeScope(x));

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

$(document).ready(function(){
    const calcFactor = () => {
        let amount = parseFloat($(".amount").val());

        scope = {
            i: parseFloat($("#rate").val()),
            n: parseFloat($("#period").val())
        };

        let factor = factors[selectedFactor].eval(scope);

        let ans = amount*factor;

        factor = Helpers.precise(factor, 8);
        ans = Helpers.financial(ans);

        const obj = factors[selectedFactor];
        const {given, ungiven} = obj;

        katex.render(String.raw`\begin{aligned}${ungiven}&=${given}${obj.formatted("i", "n")}\\&=${amount}${obj.formatted(scope.i, scope.n)}\\&=${amount}(${factor})\\&=${ans}\end{aligned}`, document.querySelector('#calculation-IO .output'), {
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

        ans = Helpers.precise(ans, 8);

        if (selectedCalc == "rate"){         
            katex.render(String.raw`\begin{aligned}${ungiven}&=${given}${f.formatted("i", "n")}\\${first}&=${second}${f.formatted("i", scope.n)}\\${Helpers.precise(shift, 4)}&=${f.formatted("i", scope.n)}\\i&=${Helpers.toPercent(ans, true)}\end{aligned}`, document.querySelector('#calculation-IO-interpolate .output'), {
                throwOnError: false
            });
        }
        else {
            katex.render(String.raw`\begin{aligned}${ungiven}&=${given}${f.formatted("i", "n")}\\${first}&=${second}${f.formatted(scope.i, "n")}\\${shift}&=${f.formatted(scope.i, "n")}\\n&=${ans}\end{aligned}`, document.querySelector('#calculation-IO-interpolate .output'), {
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
        $("#calculation-IO-interpolate h3").text(`Calculating ${$(this).text()} with ${factors[selectedFactor].name}`);

        calcFactor();
        interpolateFactor();
    };

    // $("#calculation-type .factor").click(function() {
    //     selectedFactor = $(this).index(".factor");
    //     update();
    // });

    $('.select select').on('change', function() {
        selectedFactor = this.value;
        update();
    });
    
    $("#calculation-IO-interpolate #calcRate, #calculation-IO-interpolate #calcPeriod").click(function() {
        $("#calculation-IO-interpolate h3").text(`Calculating ${$(this).text()} with ${factors[selectedFactor].name}`);

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
    $(window).on('load', function() {
        update();

        textColour();
    });

    // change text colour
    function textColour() {       
        $("input").each(function(index) {
            if($(this).val() == "0")
                $(this).css("color", "red");
            else
                $(this).css("color", "black");
        });
    }
        
    // on change
    $("#calculation-IO .amount, #calculation-IO #rate, #calculation-IO #period").on('input', () => {calcFactor(); textColour();});
    $("#calculation-IO-interpolate .first-amount, #calculation-IO-interpolate .second-amount, #calculation-IO-interpolate .calculate").on('input', () => {interpolateFactor(); textColour();}); // resource heavy

    // print out formulas
    for (let i = factors.length-1; i >= 0; i--) {
        var tex;
        if (i == 8) {
            tex = katex.renderToString(String.raw`\begin{aligned}${factors[i].formatted("g", "i", "n")}&=${factors[i].printTex()} \\ ${factors[i].printTexAdjusted()}\end{aligned}`, {
                throwOnError: false,
                displayMode: true
            });
            $("#formula-heading").after(tex);
            $("#formula-heading").after(`<h3>Geometric Gradient</h3>`);
            continue;
        }

        
        tex = katex.renderToString(String.raw`${factors[i].formatted("i", "n")}=${factors[i].printTex()}`, {
            throwOnError: false,
            displayMode: true
        });
        $("#formula-heading").after(`${tex}<br>`);

        if (i == 0) {
            $("#formula-heading").after(`<h3>Single Payments</h3>`);
        }
        if (i == 2) {
            $("#formula-heading").after(`<h3>Uniform Payment Series</h3>`);
        }
        if (i == 6) {
            $("#formula-heading").after(`<h3>Arithmetic Gradient</h3>`);
        }
    }
});