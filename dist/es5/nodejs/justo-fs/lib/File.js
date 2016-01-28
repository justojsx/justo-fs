"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();var _get = function get(_x3, _x4, _x5) {var _again = true;_function: while (_again) {var object = _x3, property = _x4, receiver = _x5;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {var parent = Object.getPrototypeOf(object);if (parent === null) {return undefined;} else {_x3 = parent;_x4 = property;_x5 = receiver;_again = true;desc = parent = undefined;continue _function;}} else if ("value" in desc) {return desc.value;} else {var getter = desc.get;if (getter === undefined) {return undefined;}return getter.call(receiver);}}};function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var _fs = require(
"fs");var _fs2 = _interopRequireDefault(_fs);var _fsExtra = require(
"fs-extra");var _fsExtra2 = _interopRequireDefault(_fsExtra);var _path = require(
"path");var _path2 = _interopRequireDefault(_path);var _jsYaml = require(
"js-yaml");var _jsYaml2 = _interopRequireDefault(_jsYaml);var _Entry2 = require(
"./Entry");var _Entry3 = _interopRequireDefault(_Entry2);var 




File = (function (_Entry) {_inherits(File, _Entry);function File() {_classCallCheck(this, File);_get(Object.getPrototypeOf(File.prototype), "constructor", this).apply(this, arguments);}_createClass(File, [{ key: "exists", value: 



























































































    function exists() {
      return _fs2["default"].existsSync(this.path) && _fs2["default"].statSync(this.path).isFile();} }, { key: "create", value: 





    function create() {var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var res = undefined;


      if (this.exists() && opts.hasOwnProperty("overwrite") && !opts.overwrite) {
        res = false;} else 
      {
        var content = undefined;


        if (opts.content) {
          if (typeof opts.content == "object") content = JSON.stringify(opts.content);else 
          content = opts.content;} else 
        {
          content = "";}



        _fs2["default"].writeFileSync(this.path, content, "utf8");
        res = true;}



      return res;} }, { key: "createFrom", value: 








    function createFrom(files) {var opts = arguments.length <= 1 || arguments[1] === undefined ? { header: "", separator: "", footer: "" } : arguments[1];

      if (typeof files == "string") files = [files];


      this.create();


      if (opts.header) this.appendText(opts.header);

      for (var i = 0, written = false; i < files.length; ++i) {
        var file = new File(files[i]);

        if (file.exists()) {
          if (written && opts.separator) this.appendText(opts.separator);
          _fs2["default"].appendFileSync(this.path, _fs2["default"].readFileSync(file.path));
          written = true;}}



      if (opts.footer) this.appendText(opts.footer);} }, { key: "appendText", value: 







    function appendText(text) {
      _fs2["default"].appendFileSync(this.path, text, "utf8");} }, { key: "truncate", value: 





    function truncate() {
      _fs2["default"].writeFileSync(this.path, "", "utf8");} }, { key: "ext", get: function get() {return _path2["default"].extname(this.path);} }, { key: "size", get: function get() {return _fs2["default"].statSync(this.path).size;} }, { key: "text", get: function get() {return _fs2["default"].readFileSync(this.path, "utf8");}, set: function set(txt) {_fs2["default"].writeFileSync(this.path, txt, "utf8");} }, { key: "json", get: function get() {var con;con = _fsExtra2["default"].readJsonSync(this.path, { throws: false });if (typeof con != "object") throw new Error("The '" + this.path + "' file is not a JSON file.");return con;}, set: function set(obj) {if (typeof obj != "object") {throw new Error(util.inspect(obj) + " is not an object.");}_fsExtra2["default"].writeJsonSync(this.path, obj);} }, { key: "yaml", get: function get() {var con;try {con = _jsYaml2["default"].safeLoad(_fs2["default"].readFileSync(this.path, "utf8"));} catch (e) {}if (typeof con != "object") throw new Error("The '" + this.path + "' is not a YAML file.");return con;}, set: function set(obj) {if (typeof obj != "object") {throw new Error(util.inspect(obj) + " is not an object.");}_fs2["default"].writeFileSync(this.path, _jsYaml2["default"].safeDump(obj), "utf8");} }]);return File;})(_Entry3["default"]);exports["default"] = File;module.exports = exports["default"];
