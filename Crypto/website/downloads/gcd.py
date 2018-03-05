'''@author Peter Mahon
Takes two numbers -- the modulus base and and the affine "alpha" -- and
solves for the cipher key
'''

MOD_Z = 26  # we are working with numbers (mod MOD_Z)

def main():
    test_gcd(True)
    n = 8574 #the mod value
    d = 13   #the alpha value
    factors = [] #used for "the magic box"
    gcd_value = enhanced_gcd(n ,d, factors, False)
    if(gcd_value == 1):
        magic_box(n, d, factors)
    else:
        print("gcd(" + str(n) + ", " + str(d) + ") != 1")
        
def magic_box(N, D, factors):
    box = [ [0,1], [1,0] ]
    print("Factors:", factors)
    #build the magic box
    for row in box:
        for factor in factors:
            num = row[-1] * factor + row[-2]
            row.append(num)
            
    a = box[0][-2]
    b = box[0][-1]
    c = box[1][-2]
    d = box[1][-1]
    n_first = False
    if(d == N):
        n_tuple = (d, a)
        d_tuple = (b, c)
        n_first = True
    else:
        n_tuple = (b, c)
        d_tuple = (d, a)

    if(n_first):
        discriminant = n_tuple[0]*n_tuple[1] -\
                       d_tuple[0]*d_tuple[1]
    else:
        discriminant = d_tuple[0]*d_tuple[1] -\
                       n_tuple[0]*n_tuple[1]
    
    if(discriminant < 1 and n_first):
        n_tuple = (n_tuple[0], (-1)*n_tuple[1])
    elif(discriminant < 1):
        d_tuple = (d_tuple[0], (-1)*d_tuple[1])

    if(n_first):
        discriminant = n_tuple[0]*n_tuple[1] -\
                       d_tuple[0]*d_tuple[1]
    else:
        discriminant = d_tuple[0]*d_tuple[1] -\
                       n_tuple[0]*n_tuple[1]        
    output = str(box) + "\n"
    output += "Disc:" + str(box[0][-2]*box[1][-1] - box[1][-2]*box[0][-1]) + "\n"
    output += "a: " + str(a) + "\n"
    output += "b: " + str(b) + "\n"
    output += "c: " + str(c) + "\n"
    output += "d: " + str(d) + "\n"
    output += "n_first:" + str(n_first) + "\n"
    output += "n_tuple:" + str(n_tuple) + "\n"
    output += "d_tuple:" + str(d_tuple) + "\n"
    output += "Sum:" + str(d_tuple[0]*d_tuple[1] + n_tuple[0]*n_tuple[1])
    print(output)
    
#Finds the gcd(n, d)
def enhanced_gcd(n, d, factors, debug_output):
    if(debug_output):  #looks like: n = (q)d + r
        print(str(n) + " = (" +str(n//d) + ")" + str(d) + " + " + str(n%d))
        
    if(d != 0):
        factors.append(n//d)
    return d if n%d == 0 else enhanced_gcd(d, n%d, factors, debug_output)

def gcd(n, d):
    if(d > n):
        gcd(d, n)
    return d if n%d == 0 else gcd(d, n%d)

def test_gcd(debug_output):
    factors = []
    assert enhanced_gcd(5, 25, factors, debug_output) == 60
    assert enhanced_gcd(5, 25, factors, debug_output) == 5
    assert enhanced_gcd(25, 5, factors, debug_output) == 5
    assert enhanced_gcd(101, 10, factors, debug_output) == 1, end="\n\n")
    assert enhanced_gcd(1111, 11, factors, debug_output) == 101, end="\n\n")
    assert nhanced_gcd(1112, 11, factors, debug_output) == 1, end="\n\n")

main()
