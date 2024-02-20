// nat.js
// a NLP (natural language processing) toolkit in javascript

// a small toolkit which will help you apply some NLP techniques
// in javascript. with nat.js you will be able to tokenize,
// calculate frequency distribution, apply some algorithms to
// string comparison and make syllable splitting.

// NOTE: nat.js is designed to work on the portuguese language. if
// you liked it, you could help extend it to other languages.

// The MIT License (MIT)

// Copyright (c) 2013 Erick Fernandes

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.


QUnit.test('util - is array', function() {
	QUnit.assert.equal(nat.util.isArray('is it an array?'), false, 'string is not an array.');
	QUnit.assert.equal(nat.util.isArray(null), false, 'null is not an array.');
	QUnit.assert.equal(nat.util.isArray({}), false, 'empty object is not an array.');
	QUnit.assert.equal(nat.util.isArray(33), false, '33 is not an array.');
	QUnit.assert.equal(nat.util.isArray(new Function()), false, 'function-object is not an array.');
	QUnit.assert.equal(nat.util.isArray(function(){}), false, 'implicit function is not an array.');
	QUnit.assert.equal(nat.util.isArray(false), false, 'false is not an array.');
	QUnit.assert.equal(nat.util.isArray(new Date()), false, 'date is not an array.');
	QUnit.assert.equal(nat.util.isArray([]), true, 'this is an empty array.');
	QUnit.assert.equal(nat.util.isArray(new Array(0)), true, 'this is an empty array.');
	QUnit.assert.equal(nat.util.isArray(['is it an array?']), true, 'this is a one-element array.');
	QUnit.assert.equal(nat.util.isArray(new Array(1)), true, 'this is a one-element array.');
});

QUnit.test('util - is digit', function() {
	QUnit.assert.equal(nat.util.isDigit(null), false, 'null is not a digit.');
	QUnit.assert.equal(nat.util.isDigit(''), false, 'empty string is not a digit.');
	QUnit.assert.equal(nat.util.isDigit(' '), false, 'blank character is not a digit.');
	QUnit.assert.equal(nat.util.isDigit({}), false, 'empty object is not a digit.');
	QUnit.assert.equal(nat.util.isDigit([]), false, 'empty array is not a digit.');
	QUnit.assert.equal(nat.util.isDigit(false), false, 'false is not a digit.');
	QUnit.assert.equal(nat.util.isDigit(new Date()), false, 'date is not a digit.');
	QUnit.assert.equal(nat.util.isDigit(new Function()), false, 'function-object is not a digit.');
	QUnit.assert.equal(nat.util.isDigit(function(){}), false, 'implicit function is not a digit.');
	QUnit.assert.equal(nat.util.isDigit('a'), false, 'character "a" is not a digit.');
	QUnit.assert.equal(nat.util.isDigit(3), true, 'number 3 is casted to "3" so it is a digit.');
	QUnit.assert.equal(nat.util.isDigit('0'), true, 'character 0 is a digit.');
});

QUnit.test('util - is alpha', function() {
	QUnit.assert.equal(nat.util.isAlpha(null), false, 'null is not an alpha.');
	QUnit.assert.equal(nat.util.isAlpha(''), false, 'empty string is not an alpha.');
	QUnit.assert.equal(nat.util.isAlpha(' '), false, 'blank character is not an alpha.');
	QUnit.assert.equal(nat.util.isAlpha({}), false, 'empty object is not an alpha.');
	QUnit.assert.equal(nat.util.isAlpha([]), false, 'empty array is not an alpha.');
	QUnit.assert.equal(nat.util.isAlpha(false), false, 'false is not an alpha.');
	QUnit.assert.equal(nat.util.isAlpha(new Date()), false, 'date is not an alpha.');
	QUnit.assert.equal(nat.util.isAlpha(new Function()), false, 'function-object is not a alpha.');
	QUnit.assert.equal(nat.util.isAlpha(function(){}), false, 'implicit function is not a alpha.');
	QUnit.assert.equal(nat.util.isAlpha(3), false, 'number 3 is not an alpha.');
	QUnit.assert.equal(nat.util.isAlpha('0'), false, 'character 0 is not an alpha.');
	QUnit.assert.equal(nat.util.isAlpha('\n'), false, '"\\n" is not an alpha.');
	QUnit.assert.equal(nat.util.isAlpha(';'), false, '; is not an alpha.');
	QUnit.assert.equal(nat.util.isAlpha('a'), true, '"a" is an alpha.');
});

QUnit.test('util - is end of line', function() {
	QUnit.assert.equal(nat.util.isEndOfLine(null), false, 'null is not EOL.');
	QUnit.assert.equal(nat.util.isEndOfLine(''), false, 'empty string is not EOL.');
	QUnit.assert.equal(nat.util.isEndOfLine(' '), false, 'blank character is not EOL.');
	QUnit.assert.equal(nat.util.isEndOfLine({}), false, 'empty object is not EOL.');
	QUnit.assert.equal(nat.util.isEndOfLine([]), false, 'empty array is not EOL.');
	QUnit.assert.equal(nat.util.isEndOfLine(false), false, 'false is not EOL.');
	QUnit.assert.equal(nat.util.isEndOfLine(new Date()), false, 'date is not EOL.');
	QUnit.assert.equal(nat.util.isEndOfLine(new Function()), false, 'function-object is not EOL.');
	QUnit.assert.equal(nat.util.isEndOfLine(function(){}), false, 'implicit function is not EOL.');
	QUnit.assert.equal(nat.util.isEndOfLine(3), false, 'number 3 is not EOL.');
	QUnit.assert.equal(nat.util.isEndOfLine('0'), false, 'character 0 is not EOL.');
	QUnit.assert.equal(nat.util.isEndOfLine('\n'), true, '"\\n" is EOL.');
});

QUnit.test('util - is a blank char', function() {
	QUnit.assert.equal(nat.util.isBlank(null), false, 'null is not blank character.');
	QUnit.assert.equal(nat.util.isBlank(''), false, 'empty string is not blank character.');
	QUnit.assert.equal(nat.util.isBlank({}), false, 'empty object is not blank character.');
	QUnit.assert.equal(nat.util.isBlank([]), false, 'empty array is not blank character.');
	QUnit.assert.equal(nat.util.isBlank(false), false, 'false is not blank character.');
	QUnit.assert.equal(nat.util.isBlank(new Date()), false, 'date is not blank character.');
	QUnit.assert.equal(nat.util.isBlank(new Function()), false, 'function-object is not blank character.');
	QUnit.assert.equal(nat.util.isBlank(function(){}), false, 'implicit function is not blank character.');
	QUnit.assert.equal(nat.util.isBlank(3), false, 'number 3 is not blank character.');
	QUnit.assert.equal(nat.util.isBlank('0'), false, 'character 0 is not blank character.');
	QUnit.assert.equal(nat.util.isBlank('\n'), true, '"\\n" is a blank character.');
	QUnit.assert.equal(nat.util.isBlank(' '), true, 'space is a blank character.');
	QUnit.assert.equal(nat.util.isBlank('\t'), true, 'tab is a blank character.');
});

QUnit.test('util - is a symbol', function() {
	QUnit.assert.equal(nat.util.isSymbol(null), false, 'null is not a symbol.');
	QUnit.assert.equal(nat.util.isSymbol(''), false, 'empty string is not a symbol.');
	QUnit.assert.equal(nat.util.isSymbol({}), false, 'empty object is not a symbol.');
	QUnit.assert.equal(nat.util.isSymbol([]), false, 'empty array is not a symbol.');
	QUnit.assert.equal(nat.util.isSymbol(false), false, 'false is not a symbol.');
	QUnit.assert.equal(nat.util.isSymbol(new Date()), false, 'date is not a symbol.');
	QUnit.assert.equal(nat.util.isSymbol(new Function()), false, 'function-object is not a symbol.');
	QUnit.assert.equal(nat.util.isSymbol(function(){}), false, 'implicit function is not a symbol.');
	QUnit.assert.equal(nat.util.isSymbol(3), false, 'number 3 is not a symbol.');
	QUnit.assert.equal(nat.util.isSymbol('0'), false, 'character 0 is not a symbol.');
	QUnit.assert.equal(nat.util.isSymbol(';'), true, '";" is a symbol.');
	QUnit.assert.equal(nat.util.isSymbol(','), true, '"," is a symbol.');
	QUnit.assert.equal(nat.util.isSymbol('.'), true, '"." is a symbol.');
});

QUnit.test('scanner - is end', function() {
	var sc = new nat.scanner('');
	QUnit.assert.equal(sc.isEnd(), true, 'when text is "", isEnd is already true.');

	var sc = new nat.scanner('non-empty string');
	QUnit.assert.equal(sc.isEnd(), false, 'when text is "non-empty string", isEnd is false.');
});

QUnit.test('scanner - getChar()', function() {
	var sc = new nat.scanner('');
	QUnit.assert.equal(sc.getChar(), '', 'there is no character to be read.');

	var sc = new nat.scanner('non-empty string');
	QUnit.assert.equal(sc.getChar(), 'n', 'reading n');
	QUnit.assert.equal(sc.getChar(), 'o', 'reading o');
	QUnit.assert.equal(sc.getChar(), 'n', 'reading n');
	QUnit.assert.equal(sc.getChar(), '-', 'reading -');
	QUnit.assert.equal(sc.getChar(), 'e', 'reading e');
	QUnit.assert.equal(sc.getChar(), 'm', 'reading m');
	QUnit.assert.equal(sc.getChar(), 'p', 'reading p');
	QUnit.assert.equal(sc.getChar(), 't', 'reading t');
	QUnit.assert.equal(sc.getChar(), 'y', 'reading y');
	QUnit.assert.equal(sc.getChar(), ' ', 'reading  ');
	QUnit.assert.equal(sc.getChar(), 's', 'reading s');
	QUnit.assert.equal(sc.getChar(), 't', 'reading t');
	QUnit.assert.equal(sc.getChar(), 'r', 'reading r');
	QUnit.assert.equal(sc.getChar(), 'i', 'reading i');
	QUnit.assert.equal(sc.getChar(), 'n', 'reading n');
	QUnit.assert.equal(sc.getChar(), 'g', 'reading g');
	QUnit.assert.equal(sc.getChar(), '', 'end of text');
});

QUnit.test('scanner - seeChar()', function() {
	var sc = new nat.scanner('');
	QUnit.assert.equal(sc.seeChar(), '', 'no character at the default offset (0).');
	QUnit.assert.equal(sc.seeChar(0), '', 'no character at the offset=0.');
	QUnit.assert.equal(sc.seeChar(1), '', 'no character at the offset=1');

	var sc = new nat.scanner('non-empty string');
	QUnit.assert.equal(sc.seeChar(0), 'n', 'reading n.');
	QUnit.assert.equal(sc.seeChar(1), 'o', 'reading o.');
	QUnit.assert.equal(sc.seeChar(2), 'n', 'reading n.');
	QUnit.assert.equal(sc.seeChar(3), '-', 'reading -.');
	QUnit.assert.equal(sc.seeChar(4), 'e', 'reading e.');
	QUnit.assert.equal(sc.seeChar(5), 'm', 'reading m.');
	QUnit.assert.equal(sc.seeChar(6), 'p', 'reading p.');
	QUnit.assert.equal(sc.seeChar(7), 't', 'reading t.');
	QUnit.assert.equal(sc.seeChar(8), 'y', 'reading y.');
	QUnit.assert.equal(sc.seeChar(9), ' ', 'reading  .');
	QUnit.assert.equal(sc.seeChar(10), 's', 'reading s.');
	QUnit.assert.equal(sc.seeChar(11), 't', 'reading t.');
	QUnit.assert.equal(sc.seeChar(12), 'r', 'reading r.');
	QUnit.assert.equal(sc.seeChar(13), 'i', 'reading i.');
	QUnit.assert.equal(sc.seeChar(14), 'n', 'reading n.');
	QUnit.assert.equal(sc.seeChar(15), 'g', 'reading g.');
	QUnit.assert.equal(sc.seeChar(16), '' , 'end of text.');
});

QUnit.test('scanner - getToken()', function() {
	var tk = null;
	var sc = new nat.scanner('');
	tk = sc.getToken();
	QUnit.assert.equal(tk.value, '', 'no value for EOF.');
	QUnit.assert.equal(tk.type, nat.TokenTypes.EOF, 'type=EOF');

	var sc = new nat.scanner('eçãí code CD-23.456/01 32 times; date=12/01/2013.\n');
	tk = sc.getToken();
	QUnit.assert.equal(tk.value, 'eçãí', 'value = eçãí');
	QUnit.assert.equal(tk.type, nat.TokenTypes.ALPHA, 'type=ALPHA');
	tk = sc.getToken();
	QUnit.assert.equal(tk.value, ' ', 'value = blank');
	QUnit.assert.equal(tk.type, nat.TokenTypes.BLANK, 'type=BLANK');
	tk = sc.getToken();
	QUnit.assert.equal(tk.value, 'code', 'value = code');
	QUnit.assert.equal(tk.type, nat.TokenTypes.ALPHA, 'type=ALPHA');
	tk = sc.getToken();
	QUnit.assert.equal(tk.value, ' ', 'value = blank');
	QUnit.assert.equal(tk.type, nat.TokenTypes.BLANK, 'type=BLANK');
	tk = sc.getToken();
	QUnit.assert.equal(tk.value, 'CD-23.456/01', 'value = CD-23.456/01');
	QUnit.assert.equal(tk.type, nat.TokenTypes.ALPHALIKE, 'type=ALPHALIKE');
	tk = sc.getToken();
	QUnit.assert.equal(tk.value, ' ', 'value = blank');
	QUnit.assert.equal(tk.type, nat.TokenTypes.BLANK, 'type=BLANK');
	tk = sc.getToken();
	QUnit.assert.equal(tk.value, '32', 'value = 32');
	QUnit.assert.equal(tk.type, nat.TokenTypes.NUMBER, 'type=NUMBER');
	tk = sc.getToken();
	QUnit.assert.equal(tk.value, ' ', 'value = blank');
	QUnit.assert.equal(tk.type, nat.TokenTypes.BLANK, 'type=BLANK');
	tk = sc.getToken();
	QUnit.assert.equal(tk.value, 'times', 'value = times');
	QUnit.assert.equal(tk.type, nat.TokenTypes.ALPHA, 'type=ALPHA');
	tk = sc.getToken();
	QUnit.assert.equal(tk.value, ';', 'value = ;');
	QUnit.assert.equal(tk.type, nat.TokenTypes.SYMBOL, 'type=SYMBOL');
	tk = sc.getToken();
	QUnit.assert.equal(tk.value, ' ', 'value = blank');
	QUnit.assert.equal(tk.type, nat.TokenTypes.BLANK, 'type=BLANK');
	tk = sc.getToken();
	QUnit.assert.equal(tk.value, 'date', 'value = date');
	QUnit.assert.equal(tk.type, nat.TokenTypes.ALPHA, 'type=ALPHA');
	tk = sc.getToken();
	QUnit.assert.equal(tk.value, '=', 'value = =');
	QUnit.assert.equal(tk.type, nat.TokenTypes.SYMBOL, 'type=SYMBOL');
	tk = sc.getToken();
	QUnit.assert.equal(tk.value, '12/01/2013', 'value = 12/01/2013');
	QUnit.assert.equal(tk.type, nat.TokenTypes.NUMBERLIKE, 'type=NUMBERLIKE');
	tk = sc.getToken();
	QUnit.assert.equal(tk.value, '.', 'value = .');
	QUnit.assert.equal(tk.type, nat.TokenTypes.SYMBOL, 'type=SYMBOL');
	tk = sc.getToken();
	QUnit.assert.equal(tk.value, '', 'value = \n');
	QUnit.assert.equal(tk.type, nat.TokenTypes.EOL, 'type=EOL');
	tk = sc.getToken();
	QUnit.assert.equal(tk.value, '', 'no value for EOF.');
	QUnit.assert.equal(tk.type, nat.TokenTypes.EOF, 'type=EOF');
});

QUnit.test('tokenizer - execute()', function() {
	var tkz = new nat.tokenizer();
	var result = tkz.execute('');	
	QUnit.assert.equal(result.length, 0, 'there are no tokens on text "".');

	result = tkz.execute("123.456.7 The quick brown fox jumps over the lazy dog. don't panic.");
	QUnit.assert.equal(result.length, 14, 'there are 14 tokens on text "123.456.7 The quick brown fox jumps over the lazy dog. don\'t panic.".');
	QUnit.assert.equal(result[0].value, '123.456.7', '0: 123.456.7');
	QUnit.assert.equal(result[1].value, 'The', '1: The');
	QUnit.assert.equal(result[2].value, 'quick', '2: quick');
	QUnit.assert.equal(result[3].value, 'brown', '3: brown');
	QUnit.assert.equal(result[4].value, 'fox', '4: fox');
	QUnit.assert.equal(result[5].value, 'jumps', '5: jumps');
	QUnit.assert.equal(result[6].value, 'over', '6: over');
	QUnit.assert.equal(result[7].value, 'the', '7: the');
	QUnit.assert.equal(result[8].value, 'lazy', '8: lazy');
	QUnit.assert.equal(result[9].value, 'dog', '9: dog');
	QUnit.assert.equal(result[10].value, '.', '10: .');
	QUnit.assert.equal(result[11].value, "don't", "11: don't");
	QUnit.assert.equal(result[12].value, 'panic', '12: panic');
	QUnit.assert.equal(result[13].value, '.', '13: .');
});

QUnit.test('tokenizer - getFeatureMatrix()', function() {
	var tkz = new nat.tokenizer();
	var result = tkz.getFeatureMatrix('');	
	QUnit.assert.equal(result.length, 0, 'there are no tokens on text "".');

	result = tkz.getFeatureMatrix('123.456.7 The quick brown fox jumps over the lazy dog.');
	var qty = 0;
	for(var m in result) {
		qty++;
	}
	QUnit.assert.equal(qty, 10, 'there are 10 unique tokens on text "123.456.7 The quick brown fox jumps over the lazy dog." when hashing from lower property.');
	QUnit.assert.equal(result['123.456.7'], 1, '123.456.7: 1 ocurrence.');
	QUnit.assert.equal(result['the'], 2, 'the: 2 ocurrences.');
	QUnit.assert.equal(result['quick'], 1, 'quick: 1 ocurrence.');
	QUnit.assert.equal(result['brown'], 1, 'brown: 1 ocurrence.');
	QUnit.assert.equal(result['fox'], 1, 'fox: 1 ocurrence.');
	QUnit.assert.equal(result['jumps'], 1, 'jumps: 1 ocurrence.');
	QUnit.assert.equal(result['over'], 1, 'over: 1 ocurrence.');
	QUnit.assert.equal(result['lazy'], 1, 'lazy: 1 ocurrence.');
	QUnit.assert.equal(result['dog'], 1, 'dog: 1 ocurrence.');

	result = tkz.getFeatureMatrix('123.456.7 The quick brown fox jumps over the lazy dog.', {hashLower: false});
	var qty = 0;
	for(var m in result) {
		qty++;
	}
	QUnit.assert.equal(qty, 11, 'there are 11 unique tokens on text "123.456.7 The quick brown fox jumps over the lazy dog." when hashing from value property.');
	QUnit.assert.equal(result['123.456.7'], 1, '123.456.7: 1 ocurrence.');
	QUnit.assert.equal(result['The'], 1, 'The: 1 ocurrence.');
	QUnit.assert.equal(result['the'], 1, 'the: 1 ocurrence.');
	QUnit.assert.equal(result['quick'], 1, 'quick: 1 ocurrence.');
	QUnit.assert.equal(result['brown'], 1, 'brown: 1 ocurrence.');
	QUnit.assert.equal(result['fox'], 1, 'fox: 1 ocurrence.');
	QUnit.assert.equal(result['jumps'], 1, 'jumps: 1 ocurrence.');
	QUnit.assert.equal(result['over'], 1, 'over: 1 ocurrence.');
	QUnit.assert.equal(result['lazy'], 1, 'lazy: 1 ocurrence.');
	QUnit.assert.equal(result['dog'], 1, 'dog: 1 ocurrence.');
});

QUnit.test('tokenFrequency - absolute()', function() {
	var fd = new nat.tokenFrequency();
	var result = fd.absolute('');	
	QUnit.assert.equal(result.length, 0, 'there are no tokens on text "".');

	result = fd.absolute('123.456.7 The quick brown fox jumps over the lazy dog.');
	var qty = 0;
	for(var m in result) {
		qty++;
	}
	QUnit.assert.equal(qty, 10, 'there are 10 unique tokens on text "123.456.7 The quick brown fox jumps over the lazy dog." when hashing from lower property.');
	QUnit.assert.equal(result['123.456.7'], 1, '123.456.7: 1 ocurrence.');
	QUnit.assert.equal(result['the'], 2, 'the: 2 ocurrences.');
	QUnit.assert.equal(result['quick'], 1, 'quick: 1 ocurrence.');
	QUnit.assert.equal(result['brown'], 1, 'brown: 1 ocurrence.');
	QUnit.assert.equal(result['fox'], 1, 'fox: 1 ocurrence.');
	QUnit.assert.equal(result['jumps'], 1, 'jumps: 1 ocurrence.');
	QUnit.assert.equal(result['over'], 1, 'over: 1 ocurrence.');
	QUnit.assert.equal(result['lazy'], 1, 'lazy: 1 ocurrence.');
	QUnit.assert.equal(result['dog'], 1, 'dog: 1 ocurrence.');
});

QUnit.test('tokenFrequency - relative()', function() {
	var fd = new nat.tokenFrequency();
	var result = fd.relative('');	
	QUnit.assert.equal(result.length, 0, 'there are no tokens on text "".');

	result = fd.relative('123.456.7 The quick brown fox jumps over the lazy dog.');
	var qty = 0;
	for(var m in result) {
		qty++;
	}
	QUnit.assert.equal(qty, 10, 'there are 10 unique tokens on text "123.456.7 The quick brown fox jumps over the lazy dog." when hashing from lower property.');
	QUnit.assert.equal(result['123.456.7'], 1/11, '123.456.7: 1 ocurrence.');
	QUnit.assert.equal(result['the'], 2/11, 'the: 2 ocurrences.');
	QUnit.assert.equal(result['quick'], 1/11, 'quick: 1 ocurrence.');
	QUnit.assert.equal(result['brown'], 1/11, 'brown: 1 ocurrence.');
	QUnit.assert.equal(result['fox'], 1/11, 'fox: 1 ocurrence.');
	QUnit.assert.equal(result['jumps'], 1/11, 'jumps: 1 ocurrence.');
	QUnit.assert.equal(result['over'], 1/11, 'over: 1 ocurrence.');
	QUnit.assert.equal(result['lazy'], 1/11, 'lazy: 1 ocurrence.');
	QUnit.assert.equal(result['dog'], 1/11, 'dog: 1 ocurrence.');
});

QUnit.test('syllableFrequency - absolute()', function() {
	var fd = new nat.syllableFrequency({
		language: 'pt'
	});
	var result = fd.absolute('');	
	QUnit.assert.equal(result.length, 0, 'there are no tokens on text "".');

	result = fd.absolute('123.456.7 abracadabra pé de cabra');
	var qty = 0;
	for(var m in result) {
		qty++;
	}
	QUnit.assert.equal(qty, 6, 'there are 6 unique tokens on text "123.456.7 abracadabra pé de cabra" when hashing from lower property.');
	QUnit.assert.equal(result['a'], 1, 'a: 1 ocurrences.');
	QUnit.assert.equal(result['bra'], 3, 'bra: 3 ocurrences.');
	QUnit.assert.equal(result['ca'], 2, 'ca: 2 ocurrences.');
	QUnit.assert.equal(result['da'], 1, 'da: 1 ocurrences.');
	QUnit.assert.equal(result['pé'], 1, 'pé: 1 ocurrences.');
	QUnit.assert.equal(result['de'], 1, 'de: 1 ocurrences.');
});

QUnit.test('syllableFrequency - relative()', function() {
	var fd = new nat.syllableFrequency({
		language: 'pt'
	});
	var result = fd.relative('');	
	QUnit.assert.equal(result.length, 0, 'there are no tokens on text "".');

	result = fd.relative('123.456.7 abracadabra pé de cabra');
	var qty = 0;
	for(var m in result) {
		qty++;
	}
	QUnit.assert.equal(qty, 6, 'there are 6 unique tokens on text "123.456.7 abracadabra pé de cabra" when hashing from lower property.');
	QUnit.assert.equal(result['a'], 1/9, 'a: 1 ocurrences.');
	QUnit.assert.equal(result['bra'], 3/9, 'bra: 3 ocurrences.');
	QUnit.assert.equal(result['ca'], 2/9, 'ca: 2 ocurrences.');
	QUnit.assert.equal(result['da'], 1/9, 'da: 1 ocurrences.');
	QUnit.assert.equal(result['pé'], 1/9, 'pé: 1 ocurrences.');
	QUnit.assert.equal(result['de'], 1/9, 'de: 1 ocurrences.');
});

QUnit.test('charFrequency - absolute()', function() {
	var fd = new nat.charFrequency();
	var result = fd.absolute('');	
	QUnit.assert.equal(result.length, 0, 'there are no tokens on text "".');

	result = fd.absolute('123.456.789-90 The quick brown fox jumps over the lazy dog.');
	var qty = 0;
	for(var m in result) {
		qty++;
	}
	QUnit.assert.equal(qty, 39, 'there are 39 unique tokens on text "123.456.789-90 The quick brown fox jumps over the lazy dog." when hashing from lower property.');
	QUnit.assert.equal(result[' '], 9, ' : 9 ocurrence.');
	QUnit.assert.equal(result['.'], 3, '.: 3 ocurrence.');
	QUnit.assert.equal(result['-'], 1, '-: 1 ocurrence.');

	QUnit.assert.equal(result['1'], 1, '1: 1 ocurrence.');
	QUnit.assert.equal(result['2'], 1, '2: 1 ocurrence.');
	QUnit.assert.equal(result['3'], 1, '3: 1 ocurrence.');
	QUnit.assert.equal(result['4'], 1, '4: 1 ocurrence.');
	QUnit.assert.equal(result['5'], 1, '5: 1 ocurrence.');
	QUnit.assert.equal(result['6'], 1, '6: 1 ocurrence.');
	QUnit.assert.equal(result['7'], 1, '7: 1 ocurrence.');
	QUnit.assert.equal(result['8'], 1, '8: 1 ocurrence.');
	QUnit.assert.equal(result['9'], 2, '9: 2 ocurrence.');
	QUnit.assert.equal(result['0'], 1, '0: 1 ocurrence.');
	
	QUnit.assert.equal(result['a'], 1, 'a: 1 ocurrence.');
	QUnit.assert.equal(result['b'], 1, 'b: 1 ocurrence.');
	QUnit.assert.equal(result['c'], 1, 'c: 1 ocurrence.');
	QUnit.assert.equal(result['d'], 1, 'd: 1 ocurrence.');
	QUnit.assert.equal(result['e'], 3, 'e: 3 ocurrence.');
	QUnit.assert.equal(result['f'], 1, 'f: 1 ocurrence.');
	QUnit.assert.equal(result['g'], 1, 'g: 1 ocurrence.');
	QUnit.assert.equal(result['h'], 2, 'h: 2 ocurrence.');
	QUnit.assert.equal(result['i'], 1, 'i: 1 ocurrence.');
	QUnit.assert.equal(result['j'], 1, 'j: 1 ocurrence.');
	QUnit.assert.equal(result['k'], 1, 'k: 1 ocurrence.');
	QUnit.assert.equal(result['l'], 1, 'l: 1 ocurrence.');
	QUnit.assert.equal(result['m'], 1, 'm: 1 ocurrence.');
	QUnit.assert.equal(result['n'], 1, 'n: 1 ocurrence.');
	QUnit.assert.equal(result['o'], 4, 'o: 4 ocurrence.');
	QUnit.assert.equal(result['p'], 1, 'p: 1 ocurrence.');
	QUnit.assert.equal(result['q'], 1, 'q: 1 ocurrence.');
	QUnit.assert.equal(result['r'], 2, 'r: 2 ocurrence.');
	QUnit.assert.equal(result['s'], 1, 's: 1 ocurrence.');
	QUnit.assert.equal(result['t'], 2, 't: 2 ocurrence.');
	QUnit.assert.equal(result['u'], 2, 'u: 2 ocurrence.');
	QUnit.assert.equal(result['v'], 1, 'v: 1 ocurrence.');
	QUnit.assert.equal(result['w'], 1, 'w: 1 ocurrence.');
	QUnit.assert.equal(result['x'], 1, 'x: 1 ocurrence.');
	QUnit.assert.equal(result['y'], 1, 'y: 1 ocurrence.');
	QUnit.assert.equal(result['z'], 1, 'z: 1 ocurrence.');
});

QUnit.test('charFrequency - relative()', function() {
	var fd = new nat.charFrequency();
	var result = fd.relative('');	
	QUnit.assert.equal(result.length, 0, 'there are no tokens on text "".');

	result = fd.relative('123.456.789-90 The quick brown fox jumps over the lazy dog.');
	var qty = 0;
	for(var m in result) {
		qty++;
	}
	QUnit.assert.equal(qty, 39, 'there are 39 unique tokens on text "123.456.789-90 The quick brown fox jumps over the lazy dog." when hashing from lower property.');
	QUnit.assert.equal(result[' '], 9/59, ' : 9 ocurrence.');
	QUnit.assert.equal(result['.'], 3/59, '.: 3 ocurrence.');
	QUnit.assert.equal(result['-'], 1/59, '-: 1 ocurrence.');

	QUnit.assert.equal(result['1'], 1/59, '1: 1 ocurrence.');
	QUnit.assert.equal(result['2'], 1/59, '2: 1 ocurrence.');
	QUnit.assert.equal(result['3'], 1/59, '3: 1 ocurrence.');
	QUnit.assert.equal(result['4'], 1/59, '4: 1 ocurrence.');
	QUnit.assert.equal(result['5'], 1/59, '5: 1 ocurrence.');
	QUnit.assert.equal(result['6'], 1/59, '6: 1 ocurrence.');
	QUnit.assert.equal(result['7'], 1/59, '7: 1 ocurrence.');
	QUnit.assert.equal(result['8'], 1/59, '8: 1 ocurrence.');
	QUnit.assert.equal(result['9'], 2/59, '9: 2 ocurrence.');
	QUnit.assert.equal(result['0'], 1/59, '0: 1 ocurrence.');
	
	QUnit.assert.equal(result['a'], 1/59, 'a: 1 ocurrence.');
	QUnit.assert.equal(result['b'], 1/59, 'b: 1 ocurrence.');
	QUnit.assert.equal(result['c'], 1/59, 'c: 1 ocurrence.');
	QUnit.assert.equal(result['d'], 1/59, 'd: 1 ocurrence.');
	QUnit.assert.equal(result['e'], 3/59, 'e: 3 ocurrence.');
	QUnit.assert.equal(result['f'], 1/59, 'f: 1 ocurrence.');
	QUnit.assert.equal(result['g'], 1/59, 'g: 1 ocurrence.');
	QUnit.assert.equal(result['h'], 2/59, 'h: 2 ocurrence.');
	QUnit.assert.equal(result['i'], 1/59, 'i: 1 ocurrence.');
	QUnit.assert.equal(result['j'], 1/59, 'j: 1 ocurrence.');
	QUnit.assert.equal(result['k'], 1/59, 'k: 1 ocurrence.');
	QUnit.assert.equal(result['l'], 1/59, 'l: 1 ocurrence.');
	QUnit.assert.equal(result['m'], 1/59, 'm: 1 ocurrence.');
	QUnit.assert.equal(result['n'], 1/59, 'n: 1 ocurrence.');
	QUnit.assert.equal(result['o'], 4/59, 'o: 4 ocurrence.');
	QUnit.assert.equal(result['p'], 1/59, 'p: 1 ocurrence.');
	QUnit.assert.equal(result['q'], 1/59, 'q: 1 ocurrence.');
	QUnit.assert.equal(result['r'], 2/59, 'r: 2 ocurrence.');
	QUnit.assert.equal(result['s'], 1/59, 's: 1 ocurrence.');
	QUnit.assert.equal(result['t'], 2/59, 't: 2 ocurrence.');
	QUnit.assert.equal(result['u'], 2/59, 'u: 2 ocurrence.');
	QUnit.assert.equal(result['v'], 1/59, 'v: 1 ocurrence.');
	QUnit.assert.equal(result['w'], 1/59, 'w: 1 ocurrence.');
	QUnit.assert.equal(result['x'], 1/59, 'x: 1 ocurrence.');
	QUnit.assert.equal(result['y'], 1/59, 'y: 1 ocurrence.');
	QUnit.assert.equal(result['z'], 1/59, 'z: 1 ocurrence.');
});


QUnit.test('firstLetterFrequency - absolute()', function() {
	var fd = new nat.firstLetterFrequency();
	var result = fd.absolute('');	
	QUnit.assert.equal(result.length, 0, 'there are no tokens on text "".');

	result = fd.absolute('123.456.789-90 The quick brown fox jumps over the lazy dog.');
	var qty = 0;
	for(var m in result) {
		qty++;
	}
	QUnit.assert.equal(qty, 8, 'there are 8 letters');
	QUnit.assert.equal(result['t'], 2, ' : 2 words.');
	QUnit.assert.equal(result['b'], 1, 'b: 1 ocurrence.');
	QUnit.assert.equal(result['d'], 1, 'd: 1 ocurrence.');
	QUnit.assert.equal(result['f'], 1, 'f: 1 ocurrence.');
	QUnit.assert.equal(result['j'], 1, 'j: 1 ocurrence.');
	QUnit.assert.equal(result['l'], 1, 'l: 1 ocurrence.');
	QUnit.assert.equal(result['o'], 1, 'o: 1 ocurrence.');
	QUnit.assert.equal(result['q'], 1, 'q: 1 ocurrence.');
});

QUnit.test('firstLetterFrequency - relative()', function() {
	var fd = new nat.firstLetterFrequency();
	var result = fd.relative('');	
	QUnit.assert.equal(result.length, 0, 'there are no tokens on text "".');

	result = fd.relative('123.456.789-90 The quick brown fox jumps over the lazy dog.');
	var qty = 0;
	for(var m in result) {
		qty++;
	}
	QUnit.assert.equal(qty, 8, 'there are 8 letters');
	QUnit.assert.equal(result['t'], 2/9, 't: 2 words.');
	QUnit.assert.equal(result['b'], 1/9, 'b: 1 ocurrence.');
	QUnit.assert.equal(result['d'], 1/9, 'd: 1 ocurrence.');
	QUnit.assert.equal(result['f'], 1/9, 'f: 1 ocurrence.');
	QUnit.assert.equal(result['j'], 1/9, 'j: 1 ocurrence.');
	QUnit.assert.equal(result['l'], 1/9, 'l: 1 ocurrence.');
	QUnit.assert.equal(result['o'], 1/9, 'o: 1 ocurrence.');
	QUnit.assert.equal(result['q'], 1/9, 'q: 1 ocurrence.');
});


QUnit.test('wordLengthFrequency - absolute()', function() {
	var fd = new nat.wordLengthFrequency();
	var result = fd.absolute('');	
	QUnit.assert.equal(result.length, 0, 'there are no tokens on text "".');

	result = fd.absolute('123.456.7 abracadabra pé de cabra');
	var qty = 0;
	for(var m in result) {
		qty++;
	}
	QUnit.assert.equal(qty, 12, 'there are 6 unique tokens on text "123.456.7 abracadabra pé de cabra" when hashing from lower property.');
	QUnit.assert.equal(result[1], 0, '1: 0 ocurrences.');
	QUnit.assert.equal(result[2], 2, '2: 2 ocurrences.');
	QUnit.assert.equal(result[3], 0, '3: 0 ocurrences.');
	QUnit.assert.equal(result[4], 0, '4: 0 ocurrences.');
	QUnit.assert.equal(result[5], 1, '5: 1 ocurrences.');
	QUnit.assert.equal(result[6], 0, '6: 0 ocurrences.');
	QUnit.assert.equal(result[7], 0, '7: 0 ocurrences.');
	QUnit.assert.equal(result[8], 0, '8: 0 ocurrences.');
	QUnit.assert.equal(result[9], 1, '9: 1 ocurrences.');
	QUnit.assert.equal(result[10], 0, '10: 0 ocurrences.');
	QUnit.assert.equal(result[11], 1, '11: 1 ocurrences.');
});

QUnit.test('wordLengthFrequency - relative()', function() {
	var fd = new nat.wordLengthFrequency();
	var result = fd.relative('');	
	QUnit.assert.equal(result.length, 0, 'there are no tokens on text "".');

	result = fd.relative('123.456.7 abracadabra pé de cabra');
	var qty = 0;
	for(var m in result) {
		qty++;
	}
	QUnit.assert.equal(qty, 12, 'there are 6 unique tokens on text "123.456.7 abracadabra pé de cabra" when hashing from lower property.');
	QUnit.assert.equal(result[1], 0/5, '1: 0 ocurrences.');
	QUnit.assert.equal(result[2], 2/5, '2: 2 ocurrences.');
	QUnit.assert.equal(result[3], 0/5, '3: 0 ocurrences.');
	QUnit.assert.equal(result[4], 0/5, '4: 0 ocurrences.');
	QUnit.assert.equal(result[5], 1/5, '5: 1 ocurrences.');
	QUnit.assert.equal(result[6], 0/5, '6: 0 ocurrences.');
	QUnit.assert.equal(result[7], 0/5, '7: 0 ocurrences.');
	QUnit.assert.equal(result[8], 0/5, '8: 0 ocurrences.');
	QUnit.assert.equal(result[9], 1/5, '9: 1 ocurrences.');
	QUnit.assert.equal(result[10], 0/5, '10: 0 ocurrences.');
	QUnit.assert.equal(result[11], 1/5, '11: 1 ocurrences.');
});

QUnit.test('editDistance - jaro()', function() {
	var ed = new nat.editDistance();
	QUnit.assert.equal(ed.jaro('erick', 'erick'), 1, "jaro('erick', 'erick')=1");
	QUnit.assert.equal(ed.jaro('ERICK', 'erick'), 0, "jaro('ERICK', 'erick')=0");
	QUnit.assert.equal(ed.jaro('erick', 'eric'), 0.9333333333333332, "ed.jaro('erick', 'eric')=0.9333333333333332");
	QUnit.assert.equal(ed.jaro('erick', 'erich'), 0.8666666666666667, "ed.jaro('erick', 'erich')=0.8666666666666667");
	QUnit.assert.equal(ed.jaro('erick', 'eirck'), 0.9333333333333332, "jaro('erick', 'eirck')=0.9333333333333332");
	QUnit.assert.equal(ed.jaro('erick', 'ricke'), 0.8666666666666667, "jaro('erick', 'ricke')=0.8666666666666667");
	QUnit.assert.equal(ed.jaro('erick', 'spike'), 0.6, "jaro('erick', 'spike')=0.6");

	QUnit.assert.equal(ed.jaro('estapafúrdia', 'fundo'), 0, "jaro('estapafúrdia', 'fundo')=0");
	QUnit.assert.equal(ed.jaro('aba', 'anastácia'), 0.6296296296296297, "jaro('aba', 'anastácia')=0.6296296296296297");
	QUnit.assert.equal(ed.jaro('aba', 'antagônica'), 0.6222222222222222, "jaro('aba', 'antagônica')=0.6222222222222222");
	QUnit.assert.equal(ed.jaro('ama', 'pijama'), 0.5, "jaro('ama', 'pijama')=0.5");

	QUnit.assert.equal(ed.jaro('impressiona', 'empreciona'), 0.7590909090909091, "jaro('impressiona', 'empreciona')=0.7272727272727273");
});

QUnit.test('editDistance - jaroWinkler()', function() {
	var ed = new nat.editDistance();
	QUnit.assert.equal(ed.jaroWinkler('erick', 'erick'), 1, "jaroWinkler('erick', 'erick')=1");
	QUnit.assert.equal(ed.jaroWinkler('ERICK', 'erick'), 0, "jaroWinkler('ERICK', 'erick')=0");
	QUnit.assert.equal(ed.jaroWinkler('erick', 'eric'), 0.9533333333333333, "ed.jaroWinkler('erick', 'eric')=0.9533333333333333");
	QUnit.assert.equal(ed.jaroWinkler('erick', 'erich'), 0.9066666666666667, "ed.jaroWinkler('erick', 'erich')=0.9066666666666667");
	QUnit.assert.equal(ed.jaroWinkler('erick', 'eirck'), 0.94, "jaroWinkler('erick', 'eirck')=0.94");
	QUnit.assert.equal(ed.jaroWinkler('erick', 'ricke'), 0.8666666666666667, "jaroWinkler('erick', 'ricke')=0.8666666666666667");
	QUnit.assert.equal(ed.jaroWinkler('erick', 'spike'), 0.6, "jaroWinkler('erick', 'spike')=0.6");

	QUnit.assert.equal(ed.jaroWinkler('estapafúrdia', 'fundo'), 0, "jaroWinkler('estapafúrdia', 'fundo')=0");
	QUnit.assert.equal(ed.jaroWinkler('aba', 'anastácia'), 0.6666666666666667, "jaroWinkler('aba', 'anastácia')=0.6666666666666667");
	QUnit.assert.equal(ed.jaroWinkler('aba', 'antagônica'), 0.66, "jaroWinkler('aba', 'antagônica')=0.66");
	QUnit.assert.equal(ed.jaroWinkler('ama', 'pijama'), 0.5, "jaroWinkler('ama', 'pijama')=0.5");

	QUnit.assert.equal(ed.jaroWinkler('impressiona', 'empreciona'), 0.7590909090909091, "jaroWinkler('impressiona', 'empreciona')=0.7590909090909091");
});

QUnit.test('editDistance - levenshteinDistance()', function() {
	var ed = new nat.editDistance();
	QUnit.assert.equal(ed.levenshteinDistance('erick', 'erick'), 0, "levenshteinDistance('erick', 'erick')=0");
	QUnit.assert.equal(ed.levenshteinDistance('ERICK', 'erick'), 5, "levenshteinDistance('ERICK', 'erick')=5");
	QUnit.assert.equal(ed.levenshteinDistance('erick', 'eric'), 1, "ed.levenshteinDistance('erick', 'eric')=1");
	QUnit.assert.equal(ed.levenshteinDistance('erick', 'erich'), 1, "ed.levenshteinDistance('erick', 'erich')=1");
	QUnit.assert.equal(ed.levenshteinDistance('erick', 'eirck'), 1, "levenshteinDistance('erick', 'eirck')=1");
	QUnit.assert.equal(ed.levenshteinDistance('erick', 'ricke'), 2, "levenshteinDistance('erick', 'ricke')=2");
	QUnit.assert.equal(ed.levenshteinDistance('erick', 'spike'), 4, "levenshteinDistance('erick', 'spike')=4");

	QUnit.assert.equal(ed.levenshteinDistance('estapafúrdia', 'fundo'), 10, "levenshteinDistance('estapafúrdia', 'fundo')=10");
	QUnit.assert.equal(ed.levenshteinDistance('aba', 'anastácia'), 7, "levenshteinDistance('aba', 'anastácia')=7");
	QUnit.assert.equal(ed.levenshteinDistance('aba', 'antagônica'), 8, "levenshteinDistance('aba', 'antagônica')=8");
	QUnit.assert.equal(ed.levenshteinDistance('ama', 'pijama'), 3, "levenshteinDistance('ama', 'pijama')=3");

	QUnit.assert.equal(ed.levenshteinDistance('impressiona', 'empreciona'), 3, "levenshteinDistance('impressiona', 'empreciona')=3");
});

QUnit.test('editDistance - levenshtein()', function() {
	var ed = new nat.editDistance();
	QUnit.assert.equal(ed.levenshtein('erick', 'erick'), 1, "levenshtein('erick', 'erick')=1");
	QUnit.assert.equal(ed.levenshtein('ERICK', 'erick'), 0, "levenshtein('ERICK', 'erick')=0");
	QUnit.assert.equal(ed.levenshtein('erick', 'eric'), 0.8, "ed.levenshtein('erick', 'eric')=0.8");
	QUnit.assert.equal(ed.levenshtein('erick', 'erich'), 0.8, "ed.levenshtein('erick', 'erich')=0.8");
	QUnit.assert.equal(ed.levenshtein('erick', 'eirck'), 0.8, "levenshtein('erick', 'eirck')=0.8");
	QUnit.assert.equal(ed.levenshtein('erick', 'ricke'), 0.6, "levenshtein('erick', 'ricke')=0.6");
	QUnit.assert.equal(ed.levenshtein('erick', 'spike'), 0.2, "levenshtein('erick', 'spike')=0.2");

	QUnit.assert.equal(ed.levenshtein('estapafúrdia', 'fundo'), 0.16666666666666666667, "levenshtein('estapafúrdia', 'fundo')=0.16666666666666666667");
	QUnit.assert.equal(ed.levenshtein('aba', 'anastácia'), 0.2222222222222222, "levenshtein('aba', 'anastácia')=0.2222222222222222");
	QUnit.assert.equal(ed.levenshtein('aba', 'antagônica'), 0.2, "levenshtein('aba', 'antagônica')=0.2");
	QUnit.assert.equal(ed.levenshtein('ama', 'pijama'), 0.5, "levenshtein('ama', 'pijama')=0.5");

	QUnit.assert.equal(ed.levenshtein('impressiona', 'empreciona'), 0.7272727272727273, "levenshtein('impressiona', 'empreciona')=0.7272727272727273");
});

QUnit.test('syllables[pt] - split()', function() {
	var sy = new nat.syllables('pt');
	QUnit.assert.equal(sy.split(null), null, "can't split null");
	QUnit.assert.equal(sy.split([]), null, "can't split array");
	QUnit.assert.equal(sy.split(function(){}), null, "can't split function");
	QUnit.assert.equal(sy.split(true), null, "can't split boolean");
	QUnit.assert.equal(sy.split(new Date()), null, "can't split date");
	QUnit.assert.equal(sy.split(33), null, "can't split number");

	QUnit.assert.equal(sy.split('a').join('.'), 'a', "a");
	QUnit.assert.equal(sy.split('as').join('.'), 'as', "as");
	QUnit.assert.equal(sy.split('alma').join('.'), 'al.ma', "al.ma");
	QUnit.assert.equal(sy.split('amparo').join('.'), 'am.pa.ro', "am.pa.ro");
	QUnit.assert.equal(sy.split('arte').join('.'), 'ar.te', "ar.te");
	QUnit.assert.equal(sy.split('antena').join('.'), 'an.te.na', "an.te.na");
	QUnit.assert.equal(sy.split('asteca').join('.'), 'as.te.ca', "as.te.ca");
	QUnit.assert.equal(sy.split('avestruz').join('.'), 'a.ves.truz', "a.ves.truz");
	QUnit.assert.equal(sy.split('transporte').join('.'), 'trans.por.te', "trans.por.te");
	QUnit.assert.equal(sy.split('transportadora').join('.'), 'trans.por.ta.do.ra', "trans.por.ta.do.ra");
	QUnit.assert.equal(sy.split('fantástico').join('.'), 'fan.tás.ti.co', "fan.tás.ti.co");
	QUnit.assert.equal(sy.split('guarda-chuva').join('.'), 'guar.da.-.chu.va', "guar.da.-.chu.va");
	QUnit.assert.equal(sy.split('achocolatado').join('.'), 'a.cho.co.la.ta.do', "a.cho.co.la.ta.do");
	QUnit.assert.equal(sy.split('xadrez').join('.'), 'xa.drez', "xa.drez");
	QUnit.assert.equal(sy.split('axadrezado').join('.'), 'a.xa.dre.za.do', "a.xa.dre.za.do");
	QUnit.assert.equal(sy.split('calha').join('.'), 'ca.lha', "ca.lha");
	QUnit.assert.equal(sy.split('abobalhado').join('.'), 'a.bo.ba.lha.do', "a.bo.ba.lha.do");
	QUnit.assert.equal(sy.split('encrespado').join('.'), 'en.cres.pa.do', "en.cres.pa.do");
	QUnit.assert.equal(sy.split('dragão').join('.'), 'dra.gão', "dra.gão");
	QUnit.assert.equal(sy.split('pindamonhangaba').join('.'), 'pin.da.mo.nhan.ga.ba', "pin.da.mo.nhan.ga.ba");
	QUnit.assert.equal(sy.split('pedra').join('.'), 'pe.dra', "pe.dra");
	QUnit.assert.equal(sy.split('pedras').join('.'), 'pe.dras', "pe.dras");
	QUnit.assert.equal(sy.split('tecla').join('.'), 'te.cla', "te.cla");
	QUnit.assert.equal(sy.split('acre').join('.'), 'a.cre', "a.cre");
	QUnit.assert.equal(sy.split('acrescentar').join('.'), 'a.cres.cen.tar', "a.cres.cen.tar");
	QUnit.assert.equal(sy.split('voo').join('.'), 'vo.o', "vo.o");
	QUnit.assert.equal(sy.split('ostracismo').join('.'), 'os.tra.cis.mo', "os.tra.cis.mo");
	QUnit.assert.equal(sy.split('paraguai').join('.'), 'pa.ra.guai', "pa.ra.guai");
	QUnit.assert.equal(sy.split('paranapiacaba').join('.'), 'pa.ra.na.pi.a.ca.ba', "pa.ra.na.pi.a.ca.ba");
	QUnit.assert.equal(sy.split('piano').join('.'), 'pi.a.no', "pi.a.no");
	QUnit.assert.equal(sy.split('saudade').join('.'), 'sau.da.de', "sau.da.de");
	QUnit.assert.equal(sy.split('vaidade').join('.'), 'vai.da.de', "vai.da.de");
	QUnit.assert.equal(sy.split('anhangabaú').join('.'), 'a.nhan.ga.ba.ú', "a.nhan.ga.ba.ú");
});
