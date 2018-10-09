"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("../util");

const Cache = {
  cache: {
    token: null,
    signedToken: null
  },

  init() {
    if (typeof window !== 'undefined') {
      const cookies = (0, _util.getCookies)();

      if (cookies['_m_h5_tk'] && cookies['_m_h5_tk_enc']) {
        this.cache = {
          token: [`_m_h5_tk=${cookies['_m_h5_tk']}`, `_m_h5_tk_enc=${cookies['_m_h5_tk_enc']}`],
          signedToken: cookies['_m_h5_tk'].split('_')[0],
          expire: +new Date() + 10 * 365 * 24 * 60 * 60 * 1000 // 浏览器环境 此字段无效 以cookie有效期为准

        };
      }
    }
  },

  setCache({
    token,
    signedToken
  }) {
    this.cache = {
      token,
      signedToken,
      expire: +new Date() + 24 * 60 * 60 * 1000 // 1天有效 浏览器环境此字段无效
      // 浏览器环境 存cookie

    };

    if (typeof window !== 'undefined') {
      token.forEach(item => {
        const arr = item.split('=');
        (0, _util.setCookie)(arr[0], arr[1]);
      });
    }
  }

};
Cache.init();
var _default = Cache;
exports.default = _default;