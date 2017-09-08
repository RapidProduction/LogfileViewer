const {
  includes,
  pickBy,
} = require('lodash');

class BaseController {
  constructor() {}

  whitelistParams(params, keys) {
    return pickBy(params, (v, k) => { return includes(keys, k); });
  }
}

module.exports = BaseController;