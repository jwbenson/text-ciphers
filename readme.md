
# Text Ciphers

Monoalphabetic ciphers (substitution cipher) and Vegenère square ciphers (US ASCII alphabet only (A-Z)) for use with node.js or CommonJS.

*Note* in almost all cases using this package for actual cryptography is a pretty bad idea.  These were created for fun and are intended for educational purposes only.

## Examples:

#### Monoalphabetic cipher
```
const MonoAlphabeticCipher = require('text-ciphers').MonoAlphabeticCipher;
const monoalphabeticCipher = new MonoAlphabeticCipher({
	substitution: MonoAlphabeticCipher.createKeyByShift(-5)
});

// outputs 'oczlpdxfwmjriajsephkzyjqzmoczgvutyjb'
const enciphered = monoalphabeticCipher.encipher('The Quick Brown Fox Jumped Over the Lazy Dog');

//outputs 'thequickbrownfoxjumpedoverthelazydogs'
const deciphered = monoalphabeticCipher.decipher(enciphered);
```

#### Vegenère cipher
```
const VegenereCipher = require('text-ciphers').VegenereCipher;
const vegenereCipher = new VegenereCipher({
	keyword: 'hopper'
});

const enciphered = vegenereCipher.encipher('The Quick Brown Fox Jumped Over the Lazy Dog');

const deciphered = vegenereCipher.decipher(enciphered);
```

## Options

```preserveSpaces``` - Preserve spaces in the  text (default = false)
```preserverOther``` - Preserve other characters (non A-Z and spaces) in the text (default = false);

### MonoAlphabeticCipher options
```substitution``` - Substitution alphabet to use (required)

### VegenereCipher options
```keyword``` - string to use to encipher and decipher (required)
```square``` - 26x26 square to use for enciphering and deciphering (optional, default = false)
```randomSquare``` - Use a randomized 26x26 character square (optional, default = false)

## Utility methods
### MonoAlphabeticCipher
```MonoAlphabeticCipher.createKey(keyword)``` - create substitution alphabet from a key or phrase
```MonoAlphabeticCipher.createKeyByShift(shiftPlaces)``` - create substitution alphabet by shifting letters to the left or right ```shiftPlaces``` spaces
```MonoAlphabeticCipher.createKeyRandom()``` - create a substitution alphabet by randomizing the letters A-Z (Fischer-Yates shuffle)

### VegenereCipher
```VegenereCipher.createSquare(random)``` - create a 26x26 square for use with a Vegenère cipher.  boolean ```random``` default = false

See tests in ```/test``` for examples for using various options and static methods


## Run tests
```mocha test```