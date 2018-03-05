"""Utilizes a known plaintext and a ciphertext to determine an LFSR.
After determining the recurrence relation, the entire plaintext is decoded
from the cipertext.

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\
|| Academic Integrity disclaimer:                                            ||
|| This code is for academic instructional purposes; however,                ||
||                                                                           ||
|| IT MAY NOT BE COPIED IN WHOLE OR IN PART BY ANY STUDENT, FOR ANY CLASS.   ||
\\~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

@author Peter Mahon
@version 1.0
"""

# Computes the LFSR digits given a known plaintext and a ciphertext. The length
# of the LFSR is determined by the smaller of the two strings.
# formula: LFSR = plaintext XOR ciphertext
# PARAM: left  -- a binary string; may be cipher- or plaintext
#        right -- the other binary string; may be cipher- or plaintext
# RETURN: the computed LFSR as a binary string
def xor(left, right):
    lfsr = "" #lfsr = left XOR right (up to smallest string length)
    smaller = min(len(left), len(right))
    
    for i in range(0, smaller):
        #convert the bits from string to integer
        pt_bit = int(left[i])
        ci_bit = int(right[i])

        #creates the XOR comparisons to construct the LFSR
        XOR_1 = (not pt_bit) == ci_bit
        XOR_2 = (not ci_bit) == pt_bit
        if(XOR_1 or XOR_2):   # XOR = (~AB and ~BA)
            lfsr += "1"
        else:
            lfsr += "0"
            
    return lfsr

# Constructs the entire LFSR key and uses it to find the plaintext
# by using LFSR XOR ciphertext
# After computing the recurrence relation, it was determined that
# the formula for the relation is:
#       x_(n+5) = x_(n) + x_(n+1) + x_(n+4)
# PARAMS: ciphertext -- a string representing binary encoded cipertext
#         lfsr -- the binary key used to decrypt the ciphertext
# RETURN: the decrypted plaintext binary string
def find_plaintext(ciphertext, lfsr):
    
    #the loop constructs the LFSR (mod 2) over the entire
    #length of the ciphertext
    start = len(lfsr)
    end = len(ciphertext)
    for i in range(start, end):
        x_n0 = int(lfsr[i-5])
        x_n1 = int(lfsr[i-4])
        x_n4 = int(lfsr[i-1])
        lfsr += str((x_n0 + x_n1 + x_n4) % 2)

    return xor(lfsr, ciphertext)

# Prints the results of the XOR operations. Text is aligned to make visual
# XOR calculations easier
#PARAMS: c_text, lfsr, p_text -- the respective ciphertext,
#        LFSR, and plaintext strings
def results(c_text, lfsr, p_text):
    print("The ciphertext is:   " + c_text)
    print("The LFSR after XOR:  " + lfsr)
    print("The plaintext is:    " + p_text)

def main():
    ciphertext = "01100010101110011101010001000110001010111001110101"
    plaintext = "100100100100100"
    
    lfsr = xor(plaintext, ciphertext)
    plaintext = find_plaintext(ciphertext, lfsr)
    results(ciphertext, lfsr, plaintext)
    
main()
