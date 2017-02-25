
class Cipher {
	constructor(options) {
		this.preserveSpaces = typeof options.preserveSpaces != 'undefined' ? options.preserveSpaces : false;
		this.preserveOther = typeof options.preserveOther != 'undefined' ? options.preserveOther : false;
	}

	encipher(plaintext) {
		return plaintext
			.toLowerCase()
			.split('')
			.map((letter, plainTextIndex) => this.encipherLetter(letter, plainTextIndex))
			.join('');
	}

	decipher(ciphertext) {
		return ciphertext
			.split('')
			.map((letter, cipherTextIndex) => this.decipherLetter(letter, cipherTextIndex))
			.join('');
	}

	encipherLetter(letter, plainTextIndex) {
		throw new Error("Not implemented");
	}

	decipherLetter(letter, cipherTextIndex) {
		throw new Error("Not implemented");
	}
};

module.exports = Cipher;