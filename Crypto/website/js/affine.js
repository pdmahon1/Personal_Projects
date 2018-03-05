/*
 * @author Peter Mahon
 *
 * The functions used specifically for the Affine cipher
 */
var alpha, beta, plaintext, ciphertext;
var mod = 26; //standard mod 26 for the English alphabet
var currentRadio = "";
var randomWords = ['sheet', 'matter', 'monarch', 'liberty', 'stab',
'east', 'budget', 'authorise', 'grain', 'assault', 'turkey', 'pavement',
'patch', 'colon', 'chair', 'facade', 'year', 'reverse', 'location',
'peanut', 'Mars', 'condition', 'kitchen', 'climate', 'joy', 'charm',
'glow', 'dividend', 'dynamic', 'quarter', 'retailer', 'urine',
'diameter', 'indirect', 'national', 'shatter', 'central', 'agile',
'half', 'nose', 'goat', 'mature', 'soap', 'shave', 'lid', 'fund',
'craft', 'mug', 'frown', 'win'];

function change_form(){
    document.getElementById("response_correct").style.display = "none";
    currentRadio = getRadioData();
    generateAlpha();
    generateBeta();
    generatePlaintext();
    convertPT();
    switch(currentRadio){
        case "find_ct":
            setPT(plaintext);
            setCT("");
            setAlpha(alpha);
            setBeta(beta);
            break;
        case "find_pt":
            setPT("");
            setCT(ciphertext);
            setAlpha(alpha);
            setBeta(beta);
            break;
        case "find_alpha":
            setPT(plaintext);
            setCT(ciphertext);
            setAlpha("");
            setBeta("");
            break;
        case "generate":
            setPT(plaintext);
            setCT(ciphertext);
            setAlpha(alpha);
            setBeta(beta);
            break;
        default:
            setPT("");
            setCT("");
            setAlpha("");
            setBeta("");
            break;
    }
}

function convertPT(){
    ciphertext = "";
    for(var i = 0; i < plaintext.length; i++){
        new_value = (letter_to_dec(plaintext.charAt(i)) * alpha + beta) % mod;
        next_letter = dec_to_letter(new_value);
        ciphertext += next_letter;
        if(debug)
            console.log(ciphertext);
    }
    ciphertext = ciphertext.toUpperCase();
}

function getRadioData() {
	var sections = document.forms[0];
	var value = "";
	for (var i = 0; i < sections.length; i++) {
		if (sections[i].checked){
			value = sections[i].value;
			break;
		}
	}
	return value;
}

function generateAlpha(){
    alpha = -1
    var greatest_denom = -1;
    theGCD = null;

    while(alpha <= 1 || greatest_denom != 1){
        alpha = Math.floor(Math.random() * (mod-3))+2; // 2 to mod-1
        if(debug)
            console.log("alpha = " + alpha);
        theGCD = gcd(mod, alpha);
        greatest_denom = theGCD.gcd;
        if(debug){
            if(greatest_denom != 1)
                console.log("  gcd("+alpha+", "+ mod +") != 1, reassigning alpha.");
            else
                console.log("*** gcd("+ alpha + ", " + mod + ") = 1");
        }
    }
}

function generateBeta(){
    beta = Math.floor(Math.random() * (mod-2)) + 1;
}

function generatePlaintext(){
    plaintext = randomWords[Math.floor(Math.random() * (randomWords.length-1))];
}

function setAlpha(value){
    console.log("Setting alpha to: " + value);
    document.getElementById("alpha_out").value = value;
}

function setBeta(value){
    console.log("Setting beta to: " + value);
    document.getElementById("beta_out").value = value;
}

function setCT(value){
    console.log("Setting CT to: " + value);
    document.getElementById("ct_out").value = value;
}

function setPT(value){
    console.log("Setting PT to: " + value);
    document.getElementById("pt_out").value = value;
    if(currentRadio == "find_alpha" || currentRadio == "generate"){
        convertPT();
        document.getElementById("ct_out").value = ciphertext;
    }

}

function check_answer(){
    response_alpha = document.getElementById("alpha_out").value;
    response_beta  = document.getElementById("beta_out").value;
    response_PT    = document.getElementById("pt_out").value;
    response_CT    = document.getElementById("ct_out").value;
    if(currentRadio == "")
        return;
    if(response_alpha == alpha && response_beta   == beta  &&
       response_PT    == plaintext && response_CT == ciphertext){
           document.getElementById("response_correct").style.color = "green";
           document.getElementById("response_correct").style.border = "1px solid green";
           document.getElementById("response_correct").innerHTML = "CORRECT!"
   }

   else{
       document.getElementById("response_correct").style.color = "red";
       document.getElementById("response_correct").style.border = "1px solid red";
       document.getElementById("response_correct").innerHTML = "THAT IS INCORRECT!";
   }
   document.getElementById("response_correct").style.display = "block";
}
