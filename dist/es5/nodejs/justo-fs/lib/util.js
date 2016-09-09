"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.












exists = exists;exports.



























remove = remove;exports.











entry = entry;exports.



























copy = copy;exports.

















rename = rename;exports.





























chown = chown;exports.























chmod = chmod;var _fs = require("fs");var _fs2 = _interopRequireDefault(_fs);var _fsExtra = require("fs-extra");var fsx = _interopRequireWildcard(_fsExtra);var _path = require("path");var _path2 = _interopRequireDefault(_path);var _Dir = require("./Dir");var _Dir2 = _interopRequireDefault(_Dir);var _File = require("./File");var _File2 = _interopRequireDefault(_File);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function exists() {var entry, res;if (arguments.length === 0) {throw new Error("Invalid number of arguments. At least, expected one.");}entry = _path2.default.join.apply(_path2.default, arguments);try {_fs2.default.statSync(entry);res = true;} catch (e) {res = false;}return res;}function remove() {fsx.removeSync(_path2.default.join.apply(_path2.default, arguments));}function entry() {var ent, stat;ent = _path2.default.join.apply(_path2.default, arguments);try {stat = _fs2.default.statSync(ent);} catch (e) {}if (stat) {if (stat.isFile()) return new _File2.default(ent);else if (stat.isDirectory()) return new _Dir2.default(ent);} else {return undefined;}}function copy(src, dst) {var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];var e = entry(src);if (opts.force) {if (e) e.copyTo({ path: dst, ignore: opts.ignore });} else {if (e) e.copyTo({ path: dst, ignore: opts.ignore });else throw new Error(src + " doesn't exist.");}}function rename(from, to) {var res,e = entry(from);if (e) {e.name = to;res = true;} else {res = false;}return res;}function chown(path, user) {var group, opts;for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {rest[_key - 2] = arguments[_key];}if (rest.length === 1) {if (typeof rest[0] == "number") group = rest[0];else opts = rest[0];} else if (rest.length >= 2) {group = rest[0];opts = rest[1];}if (!opts) opts = {};entry(path).chown(user, group, opts);}function chmod(path, mode, opts) {
  entry(path).chmod(mode, opts);
}
