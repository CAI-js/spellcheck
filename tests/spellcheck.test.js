const SpellCheck = require('../src');

describe('Similar Search', () => {
  describe('Constructor', () => {
    test('An instance can be created', () => {
      const spellCheck = new SpellCheck({
        features: { word: 1, more: 1, other: 2 },
      });
      expect(spellCheck).toBeDefined();
    });
  });

  describe('Set features', () => {
    test('Features can be changed with a method', () => {
      const spellCheck = new SpellCheck();
      spellCheck.setFeatures({ features: { word: 1, other: 2 } });
      const actual = spellCheck.checkToken('word', 1);
      expect(actual).toEqual('word');
    });
  });

  describe('Check token', () => {
    test('If the token already exists, return the token', () => {
      const spellCheck = new SpellCheck({ features: { word: 1, other: 2 } });
      const actual = spellCheck.checkToken('word', 1);
      expect(actual).toEqual('word');
    });
    test('If the token is smaller than 4 return then token', () => {
      const spellCheck = new SpellCheck({ features: { word: 1, other: 2 } });
      const actual = spellCheck.checkToken('wor', 1);
      expect(actual).toEqual('wor');
    });
    test('If exists a similar feature, return this similar feature', () => {
      const spellCheck = new SpellCheck({ features: { word: 1, other: 2 } });
      const actual = spellCheck.checkToken('world', 1);
      expect(actual).toEqual('word');
    });
    test('If not exists a similar feature, return this input token', () => {
      const spellCheck = new SpellCheck({ features: { word: 1, other: 2 } });
      const actual = spellCheck.checkToken('mandate', 1);
      expect(actual).toEqual('mandate');
    });
    test('If there are several similar features, return the one with more similar length', () => {
      const spellCheck = new SpellCheck({
        features: {
          wording: 1,
          workin: 1,
          workingo: 1,
          other: 2,
        },
      });
      const actual = spellCheck.checkToken('working', 1);
      expect(actual).toEqual('wording');
    });
  });

  describe('Check', () => {
    test('Check allows to test several words', () => {
      const spellCheck = new SpellCheck({
        features: {
          wording: 1,
          workin: 1,
          workingo: 1,
          other: 2,
        },
      });
      const actual = spellCheck.check(['this', 'is', 'working', 'otler'], 1);
      expect(actual).toEqual(['this', 'is', 'wording', 'other']);
    });
  });
});
