require('chai').should();
const VigenereCipher = require('../index').VigenereCipher;

describe("vigenere", () => {

	it("encipher and decipher (plain square) verify known", () => {
		var vigenereCipher = new VigenereCipher({
			keyword: 'abcd'
		});

		// https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher
		var plaintext = 'CRYPTOISSHORTFORCRYPTOGRAPHY';
		var enciphered = vigenereCipher.encipher(plaintext);

		enciphered.should.equal('CSASTPKVSIQUTGQUCSASTPIUAQJB'.toLowerCase());

		var deciphered = vigenereCipher.decipher(enciphered);
		deciphered.should.equal(plaintext.toLowerCase().replace(/[^a-z]/g, ''));
	});

	it("encipher and decipher (plain square)", () => {
		var vigenereCipher = new VigenereCipher({
			keyword: 'king'
		});

		var plaintext = 'The Quick Brown Fox Jumped Over the Lazy Dog';
		var enciphered = vigenereCipher.encipher(plaintext);

		var deciphered = vigenereCipher.decipher(enciphered);

		deciphered.should.equal(plaintext.toLowerCase().replace(/[^a-z]/g, ''));
	});

	it("encipher and decipher (random square)", () => {
		var vigenereCipher = new VigenereCipher({
			keyword: 'abcd',
			randomSquare: true
		});

		(vigenereCipher.square[0] +
		vigenereCipher.square[1][0] + vigenereCipher.square[1][25]).should.not.equal('abcdefghijklmnopqrstuvwxyzazba');

		var plaintext = 'The Quick Brown Fox Jumped Over the Lazy Dog';
		var enciphered = vigenereCipher.encipher(plaintext);

		var deciphered = vigenereCipher.decipher(enciphered);
		deciphered.should.equal(plaintext.toLowerCase().replace(/[^a-z]/g, ''));
	});

	it("encipher and decipher (plain square, random 26 character keyword)", () => {
		var vigenereCipher = new VigenereCipher({
			keyword: VigenereCipher.createKeyRandom()
		});

		var plaintext = 'The Quick Brown Fox Jumped Over the Lazy Dog';
		var enciphered = vigenereCipher.encipher(plaintext);

		var deciphered = vigenereCipher.decipher(enciphered);
		deciphered.should.equal(plaintext.toLowerCase().replace(/[^a-z]/g, ''));
	});

	it("preserve spaces option", () => {
		var vigenereCipher = new VigenereCipher({
			keyword: 'king',
			preserveSpaces: true
		});

		var plaintext = 'The Quick Brown Fox Jumped Over the Lazy Dog';
		var enciphered = vigenereCipher.encipher(plaintext);

		var deciphered = vigenereCipher.decipher(enciphered);

		deciphered.should.equal(plaintext.toLowerCase().replace(/[^a-z\s]/g, ''));
	});

	it("preserve other option", () => {
		var vigenereCipher = new VigenereCipher({
			keyword: 'king',
			preserveOther: true
		});

		var plaintext = 'The !Quick Brown Fox Jumped Over the Lazy !Dog';
		var enciphered = vigenereCipher.encipher(plaintext);

		var deciphered = vigenereCipher.decipher(enciphered);

		deciphered.should.equal(plaintext.toLowerCase().replace(/[\s]/g, ''));
	});
});