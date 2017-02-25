require('chai').should();
const MonoAlphabetic = require('../index').MonoAlphabeticCipher;

describe("monoalphabetic", () => {
	it("Create Key (shift 0)", () => {
		var monoalphabeticCipher = new MonoAlphabetic({
			substitution: MonoAlphabetic.createKeyByShift(0)
		});

		monoalphabeticCipher.substitution.should.equal("abcdefghijklmnopqrstuvwxyz");
	});

	it("Create Key (shift +3)", () => {
		var monoalphabeticCipher = new MonoAlphabetic({
			substitution: MonoAlphabetic.createKeyByShift(3)
		});

		monoalphabeticCipher.substitution.should.equal("defghijklmnopqrstuvwxyzabc");
	});

	it("Create Key (shift -3)", () => {
		var monoalphabeticCipher = new MonoAlphabetic({
			substitution: MonoAlphabetic.createKeyByShift(-3)
		});

		monoalphabeticCipher.substitution.should.equal("xyzabcdefghijklmnopqrstuvw");
	});

	it("Create Key from keyword (short)", () => {
		var monoalphabeticCipher = new MonoAlphabetic({
			substitution: MonoAlphabetic.createKey("kingandcountry")
		});

		monoalphabeticCipher.substitution.length.should.equal(26);
		monoalphabeticCipher.substitution.should.equal("kingadcoutrybefhjlmpqsvwxz");
	});

	it("Create Key from keyword (long)", () => {
		var monoalphabeticCipher = new MonoAlphabetic({
			substitution: MonoAlphabetic.createKey("Pack my box with five dozen liquor jugs")
		});

		monoalphabeticCipher.substitution.should.equal("packmyboxwithfvedznlqurjgs");
	});

	it("encipher and decipher shift (0)", () => {
		var monoalphabeticCipher = new MonoAlphabetic({
			substitution: MonoAlphabetic.createKeyByShift(0)
		});

		var plaintext = 'The Quick Brown Fox Jumped Over the Lazy Dog';
		var enciphered = monoalphabeticCipher.encipher(plaintext);

		var deciphered = monoalphabeticCipher.decipher(enciphered);

		deciphered.should.equal(enciphered.toLowerCase().replace(/[^a-z]/g, ''));
	});

	it("encipher and decipher shift (13)", () => {
		var monoalphabeticCipher = new MonoAlphabetic({
			substitution: MonoAlphabetic.createKeyByShift(13)
		});

		var plaintext = 'The Quick Brown Fox Jumped Over the Lazy Dog';
		var enciphered = monoalphabeticCipher.encipher(plaintext);

		enciphered.should.equal('gurdhvpxoebjasbkwhzcrqbiregurynmlqbt');

		var deciphered = monoalphabeticCipher.decipher(enciphered);
		deciphered.should.equal(plaintext.toLowerCase().replace(/[^a-z]/g, ''));
	});

	it("encipher and decipher shift (-5)", () => {
		var monoalphabeticCipher = new MonoAlphabetic({
			substitution: MonoAlphabetic.createKeyByShift(-5)
		});

		var plaintext = 'The Quick Brown Fox Jumped Over the Lazy Dog';
		var enciphered = monoalphabeticCipher.encipher(plaintext);

		enciphered.should.equal('oczlpdxfwmjriajsephkzyjqzmoczgvutyjb');

		var deciphered = monoalphabeticCipher.decipher(enciphered);
		deciphered.should.equal(plaintext.toLowerCase().replace(/[^a-z]/g, ''));
	});

	it("encipher and decipher keyword", () => {
		var monoalphabeticCipher = new MonoAlphabetic({
			substitution: MonoAlphabetic.createKey('kingandcountry')
		});

		var plaintext = 'The Quick Brown Fox Jumped Over the Lazy Dog';
		var enciphered = monoalphabeticCipher.encipher(plaintext);

		enciphered.should.equal('poajqunrilfvedfwtqbhagfsalpoaykzxgfc');

		var deciphered = monoalphabeticCipher.decipher(enciphered);
		deciphered.should.equal(plaintext.toLowerCase().replace(/[^a-z]/g, ''));
	});

	it("preserve spaces option", () => {
		var monoalphabeticCipher = new MonoAlphabetic({
			substitution: MonoAlphabetic.createKeyByShift(-3),
			preserveSpaces: true
		});

		var plaintext = 'The Quick Brown Fox Jumped Over the Lazy Dog';
		var enciphered = monoalphabeticCipher.encipher(plaintext);

		enciphered.should.equal('qeb nrfzh yoltk clu grjmba lsbo qeb ixwv ald');

		var deciphered = monoalphabeticCipher.decipher(enciphered);
		deciphered.should.equal(plaintext.toLowerCase());
	});

	it("preserve other option", () => {
		var monoalphabeticCipher = new MonoAlphabetic({
			substitution: MonoAlphabetic.createKeyByShift(-3),
			preserveOther: true
		});

		var plaintext = '!The Quick Brown Fox@#$ Jumped Over the Lazy Dog.';
		var enciphered = monoalphabeticCipher.encipher(plaintext);

		enciphered.should.equal('!qebnrfzhyoltkclu@#$grjmbalsboqebixwvald.');

		var deciphered = monoalphabeticCipher.decipher(enciphered);
		deciphered.should.equal(plaintext.toLowerCase().replace(/\s/g, ''));
	});
});