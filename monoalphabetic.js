const Cipher = require('./cipher');

class MonoAlphabeticCipher extends Cipher {
	constructor(options){
		super(options);

		this.substitution = options.substitution;
	}

	encipherLetter(letter, plainTextIndex) {
		var charCode = letter.charCodeAt(0);
		var index = charCode - 97;
		if (index >= 0 && index <= 26) {
			return this.substitution[index];
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
		var index = this.substitution.indexOf(letter);
		if (index >= 0 && index <= 26) {
			return String.fromCharCode(index + 97);
		}
		return letter;
	}

	static createKey(keyword) {
		const key = keyword
			.toLowerCase()
			.split('')
			.reduce((accumulator, letter) => {
				var characterIndex = letter.charCodeAt(0) - 97;
				if (characterIndex < 0 || characterIndex > 26) {
					return accumulator;
				}

				if (accumulator.indexOf(letter) == -1) {
					accumulator.push(letter);
				}
				return accumulator;
			}, []);

		for (var i = 0; i < 26; i++) {
			const letter = String.fromCharCode(i + 97);
			if (key.indexOf(letter) == -1) {
				key.push(letter);
			}
		}
		return key.join('');
	}

	static createKeyByShift(shift) {
		const key = [];
		for (var i = 0; i < 26; i++) {
			let character = i + shift;
			if (character > 25) {
				character = character - 26;
			}
			else if (character < 0) {
				character = character + 26;
			}
			key.push(String.fromCharCode(character + 97));
		}
		return key.join('');
	}

	static createKeyRandom(firstLetter) {
		let alphabet = "abcdefghijklmnopqrstuvwxyz";
		const array = alphabet.split('');

		let currentIndex = array.length;
		let temporaryValue = null;
		let randomIndex = null;

		// Fischer-Yates shuffle
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array.join('');
	}
}

module.exports = MonoAlphabeticCipher;
