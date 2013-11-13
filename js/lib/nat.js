// nat.js
// a NLP (natural language processing) toolkit in javascript
//
// a small toolkit which will help you apply some NLP techniques
// in javascript. with nat.js you will be able to tokenize,
// calculate frequency distribution, apply some algorithms to
// string comparison and make syllable splitting.
//
// NOTE: nat.js is designed to work on the portuguese language. if
// you liked it, you could help extend it to other languages.
//
// The MIT License (MIT)
//
// Copyright (c) 2013 Erick Fernandes
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
var nat = nat || (function (){

	var util = {
		// is it an array?
		isArray: function(v) {
			if(v != null && typeof v == 'object') {
				return typeof v.push != 'undefined';
			}
			return false;
		},
		// is it a digit?
		isDigit: function (v) {
			if (v == '' || v == null ) return false;
			v = v.toString().charAt(0);
			return (v >= '0' && v <= '9');
		},
		// is it an alpha?
		isAlpha: function (v) {
			if (v == '' || v == null || v.toLowerCase == null ) return false;
			v = v.toString().toLowerCase().charAt(0);
			return (v >= 'a' && v <= 'z')
				|| (v >= 'A' && v <= 'Z')
				|| (v == '_')
				|| ('áàäãâéèëêíìïîóòöõôúùüûçñ'.indexOf(v) >= 0);
		},
		// is it an end of line?
		isEndOfLine: function(v) {
			if (v == '' || v == null || v.toLowerCase == null ) return false;
			v = v.toString().charCodeAt(0);
			return v == 13 || v == 10;
		},
		// is it a blank?
		isBlank: function (v) {
			if (v == '' || v == null || v.toLowerCase == null  ) return false;
			v = v.charCodeAt(0);
			return v <= 32;
		},
		// is it a symbol?
		isSymbol: function (v) {
			if (v == '' || v == null || v.toLowerCase == null  ) return false;
			return '.,;:+-—–*<>ªº()[]{},=?!@#$%&=’´`~^"“”\'/|¢£¬†'.indexOf(v)>= 0;
		}
	}
	
	//-------------------------------------------------------------------------
	// tokens of a text can be classified in one of these types
	var TokenTypes = {
		EOF : 1,
		UNKNOW: 2,
		SYMBOL: 3,
		EOL: 4,
		BLANK: 5,
		ALPHA: 6,
		ALPHALIKE: 7,
		NUMBER: 8,
		NUMBERLIKE: 9
	};
	
	//-------------------------------------------------------------------------
	// scanner
	// basic text manipulation
	var scanner = function(text) {
		this._text = text;
		this._position = 0;
	};
	
	scanner.prototype = {
		// is it the end of the text?
		isEnd: function(offset) {
			offset = offset || 0;
			return ((this._position + offset) >= this._text.length);
		},
		// get the current char and moves forward for the next position
		getChar: function () {
			if (this.isEnd()) return '';
			var pos = this._position++
			return this._text.charAt(pos);
		},
		// inpects char at the specified position (current position + offset)
		seeChar: function (offset) {
			offset = offset || 0;
			if (this.isEnd(offset)) return '';
			return this._text.charAt(this._position + offset);
		},
		_eofState: function(c) {
			return {
				value: '',
				lower: '',
				type: TokenTypes.EOF
			};
		},
		_symbolState: function(c) {
			return {
				value: c,
				lower: c,
				type: TokenTypes.SYMBOL
			};
		},
		_eolState: function(c) {
			// let's ignore subsequent EOL
			while (util.isEndOfLine(this.seeChar())) {
				this.getChar();
			}
			return {
				value: '',
				lower: '',
				type: TokenTypes.EOL
			};
		},
		_blankState: function(c) {
			// let's ignore subsequent blanks
			while (util.isBlank(this.seeChar())) {
				this.getChar();
			}
			return {
				value: ' ',
				lower: ' ',
				type: TokenTypes.BLANK
			};
		},
		_alphaState: function(c) {
			var type = TokenTypes.ALPHA;
			var buffer = [c];
			var loop = true;
			do {
				c = this.seeChar();
				if (util.isAlpha(c)) {
					buffer.push(this.getChar());
				}
				else if ( c == '' ) {
					loop = false;
				}
				// it's not a pure alpha anymore
				else if (util.isDigit(c) || '/-ºª'.indexOf(c) >= 0 ) {
					buffer.push(this.getChar());
					type = TokenTypes.ALPHALIKE;
				}
				// it's not a pure alpha anymore
				else if(c == '.' && (util.isDigit(this.seeChar(1)) || util.isAlpha(this.seeChar(1))) ){
					type = TokenTypes.ALPHALIKE;
					buffer.push(this.getChar());
				}
				else {
					loop = false;
				}
			} while (loop);
			var value = buffer.join('');
			return {
				value: value,
				lower: value.toLowerCase(),
				type: type
			};
		},
		_numberState: function(c) {
			var type = TokenTypes.NUMBER;
			var buffer = [c];
			var loop = true;
			do {
				c = this.seeChar();
				if (util.isDigit(c)) {
					buffer.push(this.getChar());
				}
				else if ( c == '' ) {
					loop = false;
				}
				// it's not a pure number anymore
				else if('/-ºª'.indexOf(c)>=0) {
					type = TokenTypes.NUMBERLIKE;
					buffer.push(this.getChar());
				}
				// it's not a pure number anymore
				else if(c == '.' && (util.isDigit(this.seeChar(1)) || util.isAlpha(this.seeChar(1))) ){
					type = TokenTypes.NUMBERLIKE;
					buffer.push(this.getChar());
				}
				else {
					loop = false;
				}
			} while (loop);

			var value = buffer.join('');
			return {
				value: value,
				lower: value.toLowerCase(),
				type: type
			};
		},
		// getToken
		getToken: function () {
			var c = this.getChar();
			var result = {
				value: c,
				lower: c,
				type: TokenTypes.UNKNOWN
			};
			
			// basic state machine
			if ( c == '' ) {
				result = this._eofState(c);
			}
			else if ( util.isSymbol(c) ) {
				result = this._symbolState(c);
			}
			else if (util.isEndOfLine(c)) {
				result = this._eolState(c);
			}
			else if (util.isBlank(c)) {
				result = this._blankState(c);
			}
			else if (util.isAlpha(c)) {
				result = this._alphaState(c);
			}
			else if (util.isDigit(c)) {
				result = this._numberState(c);
			}
			return result;
		}
	};
	
	//-------------------------------------------------------------------------
	// tokenizer
	var tokenizer = function(){};	
	tokenizer.prototype = {
		// tokenize a given text
		execute: function(text) {
			var sc = new scanner(text);			
			var tokens = [];
			while (!sc.isEnd()) {
				var tkn = sc.getToken();
				if (tkn.type != TokenTypes.EOF) {
					if (tkn.type != TokenTypes.BLANK) {
						tokens.push(tkn);
					}
				}
				else break;
			}
			return tokens;
		},
		// the feature matrix of a text is an array containing one
		// ocurrence of each token		
		getFeatureMatrix: function(val, opt) {
			opt = opt || {};
			var hashLower = opt.hashLower == null? true : opt.hashLower;
			var keyProperty = hashLower ? 'lower' : 'value';
			
			var tokens = null;
			if ( typeof(val) == 'string' ) {
				tokens = this.execute(val);
			}
			else if (isArray(val)) {
				tokens = val;
			}
			else {
				tokens = [];
			}

			// counts ocurrences of each token in the text
			var result = [];
			for(var i in tokens) {
				var tkn = tokens[i];
				var hash = tkn[keyProperty];
				var qty = (result[hash] || 0);
				qty++;
				result[hash] = qty;
			}
			return result;
		}
	};
	
	//-------------------------------------------------------------------------
	// freqDistr: frequency distribution
	var freqDistr = function(){};
	freqDistr.prototype = {
		// absolute counting
		absolute: function(text, opt) {
			opt = opt || {};
			opt.hashLower = opt.hashLower == null? true : opt.hashLower;
			var tkz = new tokenizer();
			var result = tkz.getFeatureMatrix(text, opt);
			return result;
		},
		// relative = absolute / total_tokens
		relative: function(text, opt) {
			opt = opt || {};
			opt.hashLower = opt.hashLower == null? true : opt.hashLower;
			var result = this.absolute(text, opt);
			var total = 0;
			for(var m in result) {
				total += result[m];
			}
			for(var m in result) {
				result[m] = result[m] / total;
			}
			return result;
		}
	};
	
	//-------------------------------------------------------------------------
	// edit distance
	// a set of algorithms to compare two strings
	var editDistance = function(){};
	editDistance.prototype = {
		// make sure you are comparing two strings
		_basicValidation: function(str1, str2) {
			// ensures comparison on two strings
			if ( typeof str1 != 'string' || typeof str2 != 'string' ) return 0;
			
			// at least one of the strings is empty
			if ( Math.min(str1.length, str2.length) == 0 )
				return (str1.length == str2.length) ? 1 : 0;
			
			return 1;
		},		
		// calculates edit distance using Jaro algorithm
		// source: http://people.rit.edu/rmb5229/320/project3/media/source/jaro_winkler.c
		jaro: function(str1, str2){
			if ( this._basicValidation(str1, str2) == 0 ) return 0;

			// max distance between two chars to be considered matching
			var matchDistance = Math.floor(Math.max(str1.length, str2.length)/2)-1;
			
			var str1Matches = new Array(str1.length);
			var str2Matches = new Array(str2.length);
			
			// number of matches and transpositions
			var matches = 0;
			var transpositions = 0;
			
			// find the matches
			for (var i = 0; i < str1.length; i++) {
				// start and end take into account the match distance
				var start = Math.max(0, i - matchDistance);
				var end = Math.min(i + matchDistance + 1, str2.length);

				// add comments...
				for (var k = start; k < end; k++) {
					// if str2 already has a match continue
					if (str2Matches[k]) continue;
					// if str1 and str2 are not
					if (str1.charAt(i) != str2.charAt(k)) continue;
					// otherwise assume there is a match
					str1Matches[i] = true;
					str2Matches[k] = true;
					matches++;
					break;
				}
			}

			// if there are no matches return 0
			if (matches == 0) {
				return 0.0;
			}

			// count transpositions
			var k = 0;
			for (var i = 0; i < str1.length; i++) {
				// if there are no matches in str1 continue
				if (!str1Matches[i]) continue;
				// while there is no match in str2 increment k
				while (!str2Matches[k]) k++;
				// increment transpositions
				if (str1.charAt(i) != str2.charAt(k)) transpositions++;
				k++;
			}

			// divide the number of transpositions by two as per the algorithm specs
			// this division is valid because the counted transpositions include both
			// instances of the transposed characters.
			transpositions /= 2.0;

			// return the jaro distance
			return ((matches / str1.length) +
				(matches / str2.length) +
				((matches - transpositions) / matches)) / 3.0;
		},
		// the Jaro-Winkler algorithm applies a multiplier when some of
		// the first characters are equal
		jaroWinkler: function(str1, str2) {
			// compute the jaro distance
			var dist = this.jaro(str1, str2);
			
			if ( dist == 0 ) return 0;

			// finds the number of common terms in the first 3 strings, max 3.
			var prefixLength = 0;
			if (str1.length != 0 && str2.length != 0){
				var i1 = 0, i2 = 0;
				while (prefixLength < 3 && str1.charAt(i1++) == str2.charAt(i2++)){
					prefixLength++;
				}
			}

			// 0.1 is the default scaling factor
			return dist + prefixLength * 0.1 * (1 - dist);		
		},
		//http://www.merriampark.com/ld.htm, http://www.mgilleland.com/ld/ldjavascript.htm, Damerau–Levenshtein distance (Wikipedia)
		levenshteinDistance: function(s, t) {
			if ( this._basicValidation(s, t) == 0 ) return 0;

			var d = []; //2d matrix

			// Step 1
			var n = s.length;
			var m = t.length;

			if (n == 0) return m;
			if (m == 0) return n;

			//Create an array of arrays in javascript (a descending loop is quicker)
			for (var i = n; i >= 0; i--) d[i] = [];

			// Step 2
			for (var i = n; i >= 0; i--) d[i][0] = i;
			for (var j = m; j >= 0; j--) d[0][j] = j;

			// Step 3
			for (var i = 1; i <= n; i++) {
				var s_i = s.charAt(i - 1);
				// Step 4
				for (var j = 1; j <= m; j++) {
					//Check the jagged ld total so far
					if (i == j && d[i][j] > 4) return n;

					var t_j = t.charAt(j - 1);
					var cost = (s_i == t_j) ? 0 : 1; // Step 5

					//Calculate the minimum
					var mi = d[i - 1][j] + 1;
					var b = d[i][j - 1] + 1;
					var c = d[i - 1][j - 1] + cost;

					if (b < mi) mi = b;
					if (c < mi) mi = c;

					d[i][j] = mi; // Step 6

					//Damerau transposition
					if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
						d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
					}
				}
			}

			// Step 7
			return d[n][m];
		},
		levenshtein: function(str1, str2) {
			if ( this._basicValidation(str1, str2) == 0 ) return 0;
			var maxLength = Math.max(str1.length, str2.length);
			return (maxLength - this.levenshteinDistance(str1, str2))/maxLength;
		}
	};
	
	//-------------------------------------------------------------------------
	// split a word in its syllables (portuguese)
	// some hints:
	// - a syllable always contains a vowel;
	// - this vowel can be alone (amor=a.mor), preceded by consonants
	//   (protótipo=pro.tó.ti.po), succeed by consonant
	//   (transporte=trans.por.te)
	// - there can be digraphs (dígrafo, in portuguese) like [ch], [qu], [gu],
	//   [lh], [nh], [cr], [br], [ps], [ad] and others.
	var rxValid = /[\wáéíóúàèìòùâêêôûäëïöüçñ\-]+/i;
	var syllables = function(){}
	syllables.prototype = {
		_isVowel: function(c) {
			var res = 'aeiouáéíóúàèìòùâêêôûäëïöüãõ'.indexOf(c)>=0;
			return res;
		},
		_getChar: function(str, position) {
			if ( position < str.length ) {
				return str.charAt(position);
			}
			return '';
		},
		split: function(str) {
			if ( typeof str != 'string' ) return null;
			if ( !rxValid.test(str) ) return null;
			
			if ( str.indexOf('-') >= 0 ) {
				var parts = str.split('-');
				
				var res = [];
				for(var p in parts) {
					res = res.concat(this.split(parts[p]));
					res.push('-');
				}
				if ( res.length > 0 ) {
					res.splice(res.length-1, 1);
				}
				return res;
			}
			
			var result = [];
			if ( str.length == 0 ) return result;
			var buffer = [];
			var i = -1;
			while ( i < str.length ) {
				i++;
				var c = this._getChar(str, i);
				if ( c == '' ) break;
				
				buffer.push(c);
				
				if ( !this._isVowel(c)) continue;
				
				var windowOfChars = [
					c,
					this._getChar(str, i+1).toLowerCase(),
				    this._getChar(str, i+2).toLowerCase(),
				    this._getChar(str, i+3).toLowerCase(),				
				    this._getChar(str, i+4).toLowerCase()
				];
				
				if ( windowOfChars[1] == '' ) continue;
				
				// like in veem, leem, voo, enjoo
				if ( (c == 'e' && windowOfChars[1] == 'e' )
					 ||(c == 'o' && windowOfChars[1] == 'o' ) ) {
					result.push(buffer.join(''));
					buffer = [];
					continue;
				}
				
				// like in piano
				if ( 'iu'.indexOf(c) >= 0 ) {
					if ( 'aeo'.indexOf(windowOfChars[1]) >= 0 ) {
						var syl = buffer.join('');
						if ( syl != 'qu' && syl != 'gu' ) {
							result.push(buffer.join(''));
							buffer = [];
							continue;
						}
					}
				}
				
				// non-accented vowel
				if ( 'aeiou'.indexOf(windowOfChars[1]) >= 0 ) continue;
				
				// any other vowel
				if ( this._isVowel(windowOfChars[1]) ) {
					result.push(buffer.join(''));
					buffer = [];
					continue;
				}
				
				// these letters can be attracted by the vowel, as in '[al]ma',
				// '[am]paro', '[an]tena', '[ar]te', '[as]teca', 'avestr[uz]'
				if ( 'lmnrsz'.indexOf(windowOfChars[1]) >= 0 ){
					if ( windowOfChars[2] == '' || (!this._isVowel(windowOfChars[2]) && 'hlr'.indexOf(windowOfChars[2])<0 ) ) {
						buffer.push(this._getChar(str, i+1));
						i++;
						if ( windowOfChars[1] == 'n' && windowOfChars[2] == 's' && !this._isVowel(windowOfChars[3]) ) {
							buffer.push(this._getChar(str, i+1));
							i++;
						}
					}
					result.push(buffer.join(''));
					buffer = [];
					continue;
				}
				else {
					// windowOfChars[1]
					// ABCDEFGHIJKLMNOPQRSTUVWXYZ
					//  ### ###  #    ##  # #####
					if ( windowOfChars[2] == '' || (!this._isVowel(windowOfChars[2]) && 'hlr'.indexOf(windowOfChars[2])<0 ) ) {
						buffer.push(this._getChar(str, i+1));
						i++;
						if ( windowOfChars[1] == 'n' && windowOfChars[2] == 's' ) {
							buffer.push(this._getChar(str, i+1));
							i++;
						}
					}
					result.push(buffer.join(''));
					buffer = [];
					continue;
				}
			}
			if ( buffer.length > 0 ) {
				result.push(buffer.join(''));
			}
			
			return result;
		}
	};
	
	return {
		TokenTypes: TokenTypes,
		util: util,
		scanner: scanner,
		tokenizer: tokenizer,
		freqDistr: freqDistr,
		editDistance: editDistance,
		syllables: syllables
	};
}());
