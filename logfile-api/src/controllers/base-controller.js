const {
  includes,
  pickBy,
} = require('lodash');

class BaseController {
  constructor() {}

  static whitelistParams(params, keys) {
    // return pickBy(params, (k, v) => { return includes(keys, k); });
    return params;
  }
}

module.exports = BaseController;