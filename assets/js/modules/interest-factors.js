import * as Helpers from "./helpers.js";

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

    formatted(i, n) { return `( ${this.m_name}, ${Helpers.toPercent(i, true)}, ${n})`; }
    printTex() { return this.print.toTex({parenthesis: 'auto'}); }
}

class GrowthFactor extends Factor {
    constructor(name, expression, adjusted, print) {
        super(name, expression, print);
        this.m_adjusted_i = adjusted;
    }

    get adjusted_i() { return math.parse(this.m_adjusted_i); }

    formatted(g, i, n) { return `( ${this.m_name}, ${g}, ${Helpers.toPercent(i, true)}, ${n})`; }
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

export default factors;