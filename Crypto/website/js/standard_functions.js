/*
 * @author Peter Mahon
 *
 * All of the standard functions that the different encryption schemes might
 * utilize.
 */

var debug = false;
var mod   = 26;
var theGCD;

/*
 * Takes a letter, returns its decimal equivalent (mod 26)
 * ASSUME: the letter parameter is one character in length and is alpha only
 * PARAMS: letter -- the character being analyzed
 * RETURN: the decimal equivalent to the letter mod 26
 */
function letter_to_dec(letter){
    if(letter.length > 1){
        if(debug)
            console.log("ERROR: converting letter to dec, length > 1. letter is: " + letter);
        return null;
    }

    var value = letter.toUpperCase().charCodeAt(0);
    if(value < "A".charCodeAt(0) || value > "Z".charCodeAt(0)){
        if(debug)
            console.log("ERROR: the parameter value is not a letter. It is: " + letter);
        return null;
    }
    else
        return value;
}

/*
 * Takes a letter, returns its decimal equivalent (mod 26)
 * ASSUME: the letter parameter is one character in length and is alpha only
 * PARAMS: letter -- the character being analyzed
 * RETURN: the decimal equivalent to the letter mod 26
 */
function dec_to_letter(num){
    if(num < 0)
        num = convertNegativeMod(num);
    num = num % mod;
    return String.fromCharCode(97 + num);
}

/*
 * Takes two numbers and returns an object containing the GCD as well as an
 * array of the factors
 * ASSUME: n and d are integers
 */
function gcd(n, d){
    var data = {gcd: -1, factors:[]}
    if(false){
        if(debug){
            console.log("ERROR: at least one number in GCD is not an integer!");
            console.log("   n = " + n);
            console.log("   d = " + d);
        }
        return;
    }
    //ensure n > d
    if(d > n){
        console.log(d + " > " + n + ". swap!");
        var temp = n;
        n = d;
        d = temp;
    }

    //start gcd iteratively
    while(n % d != 0){
        if(debug)
            console.log("  " + n + "=" + "("+ parseInt(n/d) + ")" + d + " + " + (n%d));
        data.factors.push(parseInt(n/d));
        var prev_n = n;
        n = d;
        d = prev_n % d; //the remainder
    }
    if(debug)
        console.log("  " + n + "=" + "("+ parseInt(n/d) + ")" + d + " + " + (n%d));
    data.gcd = d;
    return data;
}

/*
 * Uses Euler's Algorithm to determine the GCD of two numbers.
 * The Algorithm is: n = qd + r, where:
 *      n -> the larger of the two numbers
 *      d -> the smaller of the two numbers
 *      q -> the highest integer such that qd < n
 *      r -> the remainder (r = n - qd), where 0 <= r < d
 * PARAMS: n, d -- integers, described above
 *         data -- an object that saves the factors (all q's) and the resulting
 *                 GCD of this algorithm
 */
function enhanced_gcd(n, d, data){
    //console.log("n: " + n + "   d: " + d + "   q: " + parseInt(n/d) + "   r: " + (n%d));
    var q = parseInt(n/d);
    if(d != 0)
        data.factors.push(q);
    if(n % d == 0){
        data.gcd = d;
        return data;
    }
    else
        return enhanced_gcd(d, n%d, data);
}

function convertNegativeMod(num){
    if(num >= 0)
        return num;

    var pos_num = num * (-1);
    if(pos_num < mod)
        return num + mod;
    return pos_num - (mod * parseInt(pos_num / mod));
}

function getAlphaInverse(){
    var factors = theGCD.factors;
    var a = 0, b = 1, c = 1, d = 0, temp;
    for(var i = 0; i < factors.length; i++){
        //upper half of magix box
        temp = factos[i] * b + a;
        a = b;
        b = temp;
        //lower half of magic box
        temp = factos[i] * d + c;
        c = d;
        d = temp;
    }

    if(b == mod){
        if(a*d + b*c == 1 || a*d + b*(-c) == 1)
            return convertNegativeMod(factors.gcd);
        else
            return convertNegativeMod(-1 * factors.gcd);
    }
    else{
        if(a*(-d) + b*c == 1 || a*d + b*c == 1)
            return convertNegativeMod(factors.gcd);
        else
            return convertNegativeMod(-1 * factors.gcd);
    }

    //after this loop, it is presumed that b and d represent either of n or d from gcd


}

/*
 *
 */
function setDebug(bool){
    debug = bool;
}
