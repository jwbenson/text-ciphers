require('chai').should();
const VegenereCipher = require('../index').VegenereCipher;

describe("vegenere", () => {

	it("encipher and decipher (plain square) verify known", () => {
		var vegenereCipher = new VegenereCipher({
			keyword: 'abcd'
		});

		// https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher
		var plaintext = 'CRYPTOISSHORTFORCRYPTOGRAPHY';
		var enciphered = vegenereCipher.encipher(plaintext);

		enciphered.should.equal('CSASTPKVSIQUTGQUCSASTPIUAQJB'.toLowerCase());

		var deciphered = vegenereCipher.decipher(enciphered);
		deciphered.should.equal(plaintext.toLowerCase().replace(/[^a-z]/g, ''));
	});

	it("encipher and decipher (plain square)", () => {
		var vegenereCipher = new VegenereCipher({
			keyword: 'king'
		});

		var plaintext = 'The Quick Brown Fox Jumped Over the Lazy Dog';
		var enciphered = vegenereCipher.encipher(plaintext);

		var deciphered = vegenereCipher.decipher(enciphered);

		deciphered.should.equal(plaintext.toLowerCase().replace(/[^a-z]/g, ''));
	});

	it("encipher and decipher (random square)", () => {
		var vegenereCipher = new VegenereCipher({
			keyword: 'abcd',
			randomSquare: true
		});

		(vegenereCipher.square[0] +
		vegenereCipher.square[1][0] + vegenereCipher.square[1][25]).should.not.equal('abcdefghijklmnopqrstuvwxyzazba');

		var plaintext = 'The Quick Brown Fox Jumped Over the Lazy Dog';
		var enciphered = vegenereCipher.encipher(plaintext);

		var deciphered = vegenereCipher.decipher(enciphered);
		deciphered.should.equal(plaintext.toLowerCase().replace(/[^a-z]/g, ''));
	});

	it("encipher and decipher (plain square, random 26 character keyword)", () => {
		var vegenereCipher = new VegenereCipher({
			keyword: VegenereCipher.createKeyRandom()
		});

		var plaintext = 'The Quick Brown Fox Jumped Over the Lazy Dog';
		var enciphered = vegenereCipher.encipher(plaintext);

		var deciphered = vegenereCipher.decipher(enciphered);
		deciphered.should.equal(plaintext.toLowerCase().replace(/[^a-z]/g, ''));
	});

	it("preserve spaces option", () => {
		var vegenereCipher = new VegenereCipher({
			keyword: 'king',
			preserveSpaces: true
		});

		var plaintext = 'The Quick Brown Fox Jumped Over the Lazy Dog';
		var enciphered = vegenereCipher.encipher(plaintext);

		var deciphered = vegenereCipher.decipher(enciphered);

		deciphered.should.equal(plaintext.toLowerCase().replace(/[^a-z\s]/g, ''));
	});

	it("preserve other option", () => {
		var vegenereCipher = new VegenereCipher({
			keyword: 'king',
			preserveOther: true
		});

		var plaintext = 'The !Quick Brown Fox Jumped Over the Lazy !Dog';
		var enciphered = vegenereCipher.encipher(plaintext);

		var deciphered = vegenereCipher.decipher(enciphered);

		deciphered.should.equal(plaintext.toLowerCase().replace(/[\s]/g, ''));
	});
});