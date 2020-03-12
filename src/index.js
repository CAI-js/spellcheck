const leven = require('@caijs/leven');

class SpellCheck {
  constructor(settings = {}) {
    this.settings = settings;
    if (this.settings.minLength === undefined) {
      this.settings.minLength = 4;
    }
    if (this.settings.normalize === undefined) {
      this.settings.normalize = true;
    }
    this.setFeatures(this.settings.features || {});
  }

  setFeatures(features) {
    this.features = features;
    this.featuresByLength = {};
    this.featureList = Object.keys(this.features);
    for (let i = 0; i < this.featureList.length; i += 1) {
      const feature = this.featureList[i];
      const { length } = feature;
      if (!this.featuresByLength[length]) {
        this.featuresByLength[length] = [];
      }
      this.featuresByLength[length].push(feature);
    }
  }

  checkToken(token, distance) {
    if (this.features[token]) {
      return token;
    }
    if (token.length < this.settings.minLength) {
      return token;
    }
    let best;
    let distanceBest = Infinity;
    let freq = 0;
    const start = token.length - distance - 1;
    for (let i = start; i < token.length + distance; i += 1) {
      const currentFeatures = this.featuresByLength[i + 1];
      if (currentFeatures) {
        for (let j = 0; j < currentFeatures.length; j += 1) {
          const feature = currentFeatures[j];
          const similar = leven(token, feature, true, this.settings.normalize);
          if (similar <= distance) {
            if (similar < distanceBest) {
              best = feature;
              distanceBest = similar;
              freq = this.features[feature];
            } else if (similar === distanceBest) {
              if (this.features[feature] > freq) {
                best = feature;
                distanceBest = similar;
                freq = this.features[feature];
              } else if (
                this.features[feature] === freq &&
                Math.abs(best.length - token.length) >
                  Math.abs(feature.length - token.length)
              ) {
                best = feature;
                distanceBest = similar;
                freq = this.features[feature];
              }
            }
          }
        }
      }
    }
    return best || token;
  }

  check(tokens, distance) {
    if (!Array.isArray(tokens)) {
      const keys = Object.keys(tokens);
      const processed = this.check(keys, distance);
      const obj = {};
      for (let i = 0; i < processed.length; i += 1) {
        obj[processed[i]] = tokens[keys[i]];
      }
      return obj;
    }
    const result = [];
    for (let i = 0; i < tokens.length; i += 1) {
      result.push(this.checkToken(tokens[i], distance));
    }
    return result;
  }
}

SpellCheck.info = {
  name: 'spellcheck',
}

module.exports = SpellCheck;
