# @caijs/spellcheck

[![Build Status](https://travis-ci.com/CAI-js/spellcheck.svg?branch=master)](https://travis-ci.com/CAI-js/spellcheck)
[![Coverage Status](https://coveralls.io/repos/github/CAI-js/spellcheck/badge.svg?branch=master)](https://coveralls.io/github/CAI-js/spellcheck?branch=master)
[![NPM version](https://img.shields.io/npm/v/@caijs/spellcheck.svg?style=flat)](https://www.npmjs.com/package/@caijs/spellcheck)
[![NPM downloads](https://img.shields.io/npm/dm/@caijs/spellcheck.svg?style=flat)](https://www.npmjs.com/package/@caijs/spellcheck)

This library perform an spell check correction based on a dictionary of frequencies.

Important: this library does not includes any dictionary, as is intended to be used as NLP support building the dictionary based on the utterances used to train.

## Installation

In your project folder run:

```bash
$ npm install @caijs/spellcheck
```

## Spell Check a word

```javascript
const SpellCheck = require('@caijs/spellcheck');

const spellCheck = new SpellCheck({
  features: {
    working: 5,
    wording: 2,
    person: 5,
    other: 6
  }
});

const fixed = spellCheck.checkToken('worling', 1);
console.log(fixed); // working
```

The second parameter is the maximum levenshtein distance between the words. If not provided it assumes 0 so no spell checking is done. It should return "working" and not "wording" because the length is equal but the frequency of the word "working" is greater.

## Spell Check an array of words

```javascript
const SpellCheck = require('./src');

const spellCheck = new SpellCheck({
  features: {
    working: 5,
    wording: 2,
    person: 5,
    other: 6
  }
});

const actual = spellCheck.check(['other', 'peraon', 'is', 'worling', 'on', 'that'], 1);
console.log(actual); // [ 'other', 'person', 'is', 'working', 'on', 'that' ]
```

