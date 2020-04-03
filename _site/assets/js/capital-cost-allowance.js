import * as Helpers from "./modules/helpers.js";
import factors from "./modules/interest-factors.js";

const CTF = (t, d, i) => 1 - t*d*(1+i/2)/(i+d)/(1+i);
const CSF = (t, d, i) => 1 - t*d/(i+d);

$(document).ready(function(){
    // factor calculations
    function calcFactors() {
        let t = parseFloat($("#factor-input #tax").val())/100;
        let d = parseFloat($("#factor-input #CCA").val())/100;
        let i = parseFloat($("#factor-input #MARR").val())/100;

        katex.render(String.raw`\begin{aligned}CTF&=1-\frac{td(1+\tfrac{i}{2})}{(i+d)(1+i)}\\&=1-\frac{(${t})(${d})(1+\tfrac{(${i})}{2})}{(${i}+${d})(1+${i})}\\&=${Helpers.precise(CTF(t,d,i), 6)}\end{aligned}`, document.querySelector('#factor-output #CTF'), {
            throwOnError: false
        });

        katex.render(String.raw`\begin{aligned}CSF&=1-\frac{td}{i+d}\\&=1-\frac{(${t})(${d})}{${i}+${d}}\\&=${Helpers.precise(CSF(t,d,i), 6)}\end{aligned}`, document.querySelector('#factor-output #CSF'), {
            throwOnError: false
        });
    }

    $("#factor-input > [type=number]").on('input', function() {
        calcFactors();
        textColour();
    });

    $("#factor-input #tax-slider").on('input', function(){
        $("#factor-input #tax").val(this.value);     
        calcFactors();
        textColour();
    });

    $("#factor-input #CCA-slider").on('input', function(){
        $("#factor-input #CCA").val(this.value);     
        calcFactors();
        textColour();
    });

    $("#factor-input #MARR-slider").on('input', function(){
        $("#factor-input #MARR").val(this.value);     
        calcFactors();
        textColour();
    });


    // worth calculations
    function calcWorth() {
        let t = parseFloat($("#worth-input-1 #tax").val())/100;
        let d = parseFloat($("#worth-input-1 #CCA").val())/100;
        let i = parseFloat($("#worth-input-1 #MARR").val())/100;

        let FC = -parseFloat($("#worth-input-2 #FC").val());
        let SV = parseFloat($("#worth-input-2 #SV").val());
        let savings = parseFloat($("#worth-input-2 #savings").val());

        let life = parseFloat($("#worth-input-3 #life").val());

        // calculations
        let capitalFactor = CTF(t,d,i);
        let salvageFactor = CSF(t,d,i);

        let P_A = factors[5].eval({i: i, n: life});
        let P_F = factors[1].eval({i: i, n: life});

        let A_P = factors[3].eval({i: i, n: life});
        let A_F = factors[2].eval({i: i, n: life});

        let termsPW = [FC*capitalFactor, savings*(1-t)*P_A, SV*salvageFactor*P_F];
        let ansPW = termsPW[0]+termsPW[1]+termsPW[2]; 

        let termsAW = [FC*capitalFactor*A_P, savings*(1-t), SV*salvageFactor*A_F]
        let ansAW = termsAW[0]+termsAW[1]+termsAW[2];

        // format
        capitalFactor = Helpers.precise(capitalFactor, 6);
        salvageFactor = Helpers.precise(salvageFactor, 6);
        P_A = Helpers.precise(P_A, 6);
        P_F = Helpers.precise(P_F, 6);
        A_P = Helpers.precise(A_P, 6);
        A_F = Helpers.precise(A_F, 6);
        for (let i = 0; i < termsPW.length; i++)
            termsPW[i] = Helpers.precise(termsPW[i], 6);
            termsAW[i] = Helpers.precise(termsAW[i], 6);
        ansPW = Helpers.precise(ansPW, 6);
        ansAW = Helpers.precise(ansAW, 6);

        // print
        katex.render(String.raw`\begin{aligned}PW&=\underbrace{-FC\cdot CTF}_{Capital\:Cost}+\underbrace{Savings\cdot (1-t)(P/A,i,n)}_{Tax\:from\:Savings}+\underbrace{SV\cdot CSF \cdot(P/F,i,n)}_{Proceeds\:from\:Disposition}\\&=${FC}\cdot CTF+(${savings})(1-${Helpers.toPercent(t, true)})${factors[5].formatted(i,life)}+${SV}\cdot CSF${factors[1].formatted(i,life)}\\&=(${FC})(${capitalFactor})+(${savings})(${1-t})(${P_A})+(${SV})(${salvageFactor})(${P_F})\\&=${termsPW[0]}+${termsPW[1]}+${termsPW[2]}\\&=${ansPW}\end{aligned}`, document.querySelector('#worth-output #PW-output'), {
            throwOnError: false
        });

        katex.render(String.raw`\begin{aligned}AW&=\underbrace{-FC\cdot CTF\cdot (A/P,i,n)}_{Capital\:Cost}+\underbrace{Savings\cdot (1-t)}_{Tax\:from\:Savings}+\underbrace{SV\cdot CSF \cdot(A/F,i,n)}_{Proceeds\:from\:Disposition}\\&=${FC}\cdot CTF\cdot ${factors[3].formatted(i,life)}+(${savings})(1-${Helpers.toPercent(t, true)})+${SV}\cdot CSF${factors[2].formatted(i,life)}\\&=(${FC})(${capitalFactor})(${A_P})+(${savings})(${1-t})+(${SV})(${salvageFactor})(${A_F})\\&=${termsAW[0]}+${termsAW[1]}+${termsAW[2]}\\&=${ansAW}\end{aligned}`, document.querySelector('#worth-output #AW-output'), {
            throwOnError: false
        });
    }

    $("#worth-input-1 > input, #worth-input-2 > input, #worth-input-3 > input").on('input', function() {
        calcWorth();
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


    // On load
    $(window).on('load', function() {
        calcFactors();
        calcWorth();

        textColour();
    });
});