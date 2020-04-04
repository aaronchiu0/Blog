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


    // UCC Computation
    $("#add-row").click(function(){
        $("#UCC-table tbody").append(`
            <tr>
                <th>Year ${$("#UCC-table tbody tr").length+1}</th>
                <td class="UCC-start">Output</td>
                <td class="additions"><input value="0"></td>
                <td class="salvage"><input value="0"></td>
                <td class="adjust">Output</td>
                <td class="UCC-base">Output</td>
                <td class="CCA">Output</td>
                <td class="UCC-end">Output</td>
                <td class="tax-benefit">Output</td>
            </tr>
        `);
        console.log("Add row", $("#UCC-table tbody tr").length);

        calcUCC();

        textColour();
    });

    function calcUCC() {
        let tax_Rate = parseFloat($("#UCC-computation #tax").val())/100;
        let CCA_Rate = parseFloat($("#UCC-computation #CCA").val())/100;

        console.log(tax_Rate, CCA_Rate, $("#UCC-table tbody tr").length);

        for (let i = 0; i < $("#UCC-table tbody tr").length; i++) {
            let UCC_Start = 0;
            if (i == 0)
                UCC_Start = parseFloat($("#UCC-table .UCC-start input").eq(i).val());
            else
                UCC_Start = parseFloat($("#UCC-table .UCC-start").eq(i).text());

            let additions = parseFloat($("#UCC-table .additions input").eq(i).val());
            let salvage = parseFloat($("#UCC-table .salvage input").eq(i).val());

            let adjust = additions - salvage;

            let UCC_Base = adjust > 0 ? UCC_Start + adjust / 2 : UCC_Start + adjust;

            let CCA = UCC_Base * CCA_Rate;

            let UCC_End = UCC_Start + additions - salvage - CCA;

            let taxBenefit = UCC_End * tax_Rate;

            
            $("#UCC-table .UCC-start").eq(i+1).text(UCC_End);

            $("#UCC-table .adjust").eq(i).text(Helpers.financial(adjust));
            $("#UCC-table .UCC-base").eq(i).text(Helpers.financial(UCC_Base));
            $("#UCC-table .CCA").eq(i).text(Helpers.financial(CCA));
            $("#UCC-table .UCC-end").eq(i).text(Helpers.financial(UCC_End));
            $("#UCC-table .tax-benefit").eq(i).text(Helpers.financial(taxBenefit));

            console.log(UCC_Start, additions, salvage, adjust, UCC_Base, CCA, UCC_End, taxBenefit); 
        }
    }

    $("#UCC-computation #tax, #UCC-computation #CCA").on("input", function(){
        calcUCC();

        textColour();
    });

    $("#UCC-table").on("input", "input", function(){
        calcUCC();

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
        calcUCC();

        textColour();
    });
});