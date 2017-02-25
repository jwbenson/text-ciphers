const MonoAlphabeticCipher = require('./monoalphabetic');

class VigenereCipher extends MonoAlphabeticCipher {

	constructor(options) {
		super(options);

		this.keyword = options.keyword;
		this.square = options.square || [];

		// create 26x26 square
		if (!this.square || this.square.length == 0) {
			this.square = VigenereCipher.createSquare(options.randomSquare);
		}

		if (this.square.length < 26) {
			throw new Error('Vigenere square must be of size 26x26');
		}
	}

	encipher(plaintext) {
		/**
		 * unlike a monoalphabetic cipher, it is important that the plaintext and ciphertext have
		 * equal lengths so remove spaces and puncuation in advance of enciphering each letter
		 */
		if (!this.preserveOther) {
			plaintext = plaintext.toLowerCase().replace(/[^a-z\s]/g, '');
		}

		if (!this.preserveSpaces) {
			plaintext = plaintext.toLowerCase().replace(/ /g, '');
		}

		return super.encipher(plaintext);
	}

	encipherLetter(letter, plainTextIndex) {
		const keyPosition = plainTextIndex % this.keyword.length;
		const keyLetter = this.keyword[keyPosition]
		const substitution = this.square.filter(cipher => cipher.indexOf(keyLetter) == 0)[0];

		var charCode = letter.charCodeAt(0);
		var index = charCode - 97;
		if (substitution && index >= 0 && index <= 26) {
			return substitution[index]
		}
		else if (charCode == 32) {
			return this.preserveSpaces ? letter : '';
		}
		else if (this.preserveOther) {
			return letter;
		}
		return '';
	}

	decipherLetter(letter, cipherTextIndex) {
		const keyPosition = cipherTextIndex % this.keyword.length;
		const keyLetter = this.keyword[keyPosition]
		const substitution = this.square.filter(cipher => cipher.indexOf(keyLetter) == 0)[0];

		var index = substitution.indexOf(letter);
		if (index >= 0 && index <= 26) {
			return String.fromCharCode(index + 97);
		}
		return letter;
	}

	static createSquare(random) {
		var square = [];

		if (random) {
			var indexRow = VigenereCipher.createKeyRandom().split('');

			for (var i = 0; i < 26; i++) {
				var startLetter = indexRow[i];
				var randomKey = VigenereCipher.createKeyRandom().split('');

				randomKey.splice(randomKey.indexOf(startLetter), 1);
				randomKey.splice(0, 0, startLetter);

				square.push(randomKey.join(''));
			}
		}
		else {
			for (var i = 0; i < 26; i++) {
				square.push(VigenereCipher.createKeyByShift(i));
			}
		}

		return square;
	}
}

module.exports = VigenereCipher;
