import * as Helpers from "./modules/helpers.js";

// add prototype, probability vector (ie make values sum up to 1)
Array.prototype.sumToOne = function() {
    let sum = 0;
    for (let i = 0; i < this.length; i++)
        sum += this[i];

    for (let i = 0; i < this.length; i++)
        this[i] /= sum;

    return this;
};

function eigen(A, n) {
    let size = math.size(A)[1]; // set size
    console.log(size);

    // create random vector
    let b_k = Array.apply(null, Array(size)).map(() => Math.random());
    console.log("initial", b_k);

    let b_k1 = math.zeros(math.size(A));
    let b_k1_mag = math.zeros(math.size(A));

    for (let i = 0; i < n; i++) {
        b_k1 = math.multiply(A, b_k);       // product of A and b_k
        b_k1_mag = math.norm(b_k1);         // magnitude
        b_k = math.divide(b_k1, b_k1_mag);  // divide vector by magnitude

        console.group("Step " + (i+1));
            console.log("mulitply", b_k1);
            console.log("norm", b_k1_mag);
            console.log("ans", b_k);
        console.groupEnd();
    }

    return b_k;
}

function is_square(M) {
    for (let i = 0; i < M.length; i++) {
        if(M[i].length != M.length)
            return false;
    }

    return true;
}

function is_stochastic(M) {
    for (let i = 0; i < M.length; i++) {
        let sum = 0;
        for (let j = 0; j < M[i].length; j++) {
            sum += M[i][j];
        }

        if (sum != 1)
            return false;
    }

    return true;
}

function transpose(M) { 
    for (let i = 0; i < M.length; i++) { 
        for (let j = 0; j < i; j++) { 
            const temp = M[i][j]; 
            M[i][j] = M[j][i]; 
            M[j][i] = temp; 
        } 
    } 
} 

$(document).ready(function(){
    // UCC Computation
    $("#stationary-calc").click(function() {
        // Conversion
        let stringValue = $("#transition-matrix").val();
        console.log(stringValue);

        let stringVector = stringValue.split("\n");
        console.log(stringVector);

        for (let i = 0; i < stringVector.length; i++) {
            stringVector[i] = stringVector[i].trim();
        }

        stringVector = stringVector.filter(function(entry) {
            return entry.trim() != "";
        });

        console.log(stringVector);

        let stringMatrix = [];
        for(let i = 0; i < stringVector.length; i++) {
            stringMatrix.push(stringVector[i].split(" "));
        }
        console.log(stringMatrix);

        // test conditions
        if(!is_square(stringMatrix)) {
            $("#stationary-ans").text("Matrix is not square");
            return;
        }

        var matrix = [];
        for (let i = 0; i < stringMatrix.length; i++) {
            if (stringMatrix)
            matrix.push(stringMatrix[i].map(Number));

            for (let j = 0; j < stringMatrix[i].length; j++) {
                if(isNaN(stringMatrix[i][j])){
                    $("#stationary-ans").text("Matrix contains non-numbers");
                    return;
                }
            }
        }
        console.log(matrix);

        if(!is_stochastic(matrix)) {
            $("#stationary-ans").text("Matrix is not stochastic");
            return;
        }

        transpose(matrix);
        console.log(matrix);

        let e = eigen(matrix, 25);
    
        console.log(e.sumToOne());
    });
});