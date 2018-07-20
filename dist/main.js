/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./script/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./script/components/validator.js":
/*!****************************************!*\
  !*** ./script/components/validator.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validator = void 0;

var _this = void 0;

var validator = {
  /**
   * 
   * @param {Object} options Liste remplaçant defaultOptions
   * @param {String} defaultOptions.validClass Class quand erreur champs
   * @param {String} defaultOptions.errorClass Class quand champs valide
   */
  defaultOptions: function defaultOptions() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var defaultOptions = {
      'validClass': 'valid',
      'errorClass': 'error'
    };
    return Object.assign({}, defaultOptions, options);
  },

  /**
   * 
   * @param {String} idForm ID formulaire du à initialiser
   */
  init: function init(idForm) {
    var form = document.getElementById(idForm);
    var allInput = form.querySelectorAll('.js-validator');
    var submit = form.querySelector('[type="submit"]');
    allInput.forEach(function (inputParent) {
      var input = inputParent.querySelector('input, textarea, select');
      var allAttr = Array.prototype.slice.call(input.attributes);
      var attributes = {};
      /* - - - - - - - - - - - - *\
          $ SET LIST ATTRIBUTES
      \* - - - - - - - - - - - - */

      allAttr.forEach(function (attr) {
        if (attr.name === "required") attributes.required = true;
        if (attr.name === "pattern") attributes.regex = new RegExp(attr.value);
        if (attr.name === "type") attributes.type = attr.value;
        if (attr.name === "max") attributes.max = parseInt(attr.value);
        if (attr.name === "min") attributes.min = parseInt(attr.value);
        if (attr.name === "maxlength") attributes.maxlength = parseInt(attr.value);
        if (attr.name === "minlength") attributes.minlength = parseInt(attr.value);
      });
      /* - - - - - - - - - - - - *\
          $ EVENT
      \* - - - - - - - - - - - - */

      input.addEventListener('change', function (e) {
        // Avoid revalidate the field when pressing one of the following keys
        // Shift       => 16
        // Ctrl        => 17
        // Alt         => 18
        // Caps lock   => 20
        // End         => 35
        // Home        => 36
        // Left arrow  => 37
        // Up arrow    => 38
        // Right arrow => 39
        // Down arrow  => 40
        // Insert      => 45
        // Num lock    => 144
        // AltGr key   => 225
        // var excludedKeys = [
        //   16, 17, 18, 20, 35, 36, 37,
        //     38, 39, 40, 45, 144, 225
        // ];
        // if (excludedKeys.indexOf(e.keyCode) != -1) return;
        validator.check(this.value, attributes, inputParent, submit);
      }); // on change
    }); // foreach allInput
  },
  // init()

  /**
   * 
   * @param {Node}   inputParent Input parent (.js-validator)
   * @param {Node}   submit      Submit du formulaire initialisé
   * @param {Object} errors      Liste des erreurs
   */
  highlight: function highlight(inputParent, submit, errors) {
    // Variables
    var input = inputParent.querySelector('input, textarea, select');
    var idInput = input.getAttribute('id');
    var html = ''; // Set error class

    inputParent.classList.remove(validator.defaultOptions().validClass);
    inputParent.classList.add(validator.defaultOptions().errorClass);
    inputParent.setAttribute('data-error', true); // Make message

    html += '<div class="message" id="message-' + idInput + '">';
    Object.keys(errors).forEach(function (k) {
      html += '<span class="message__text error-' + k + '">' + errors[k] + '</span>';
    });
    html += '</div>'; // Reset all messages

    validator.resetMessage(inputParent); // Add message

    input.insertAdjacentHTML("afterend", html); // Disabled submit    

    submit.disabled = true;
  },

  /**
   * 
   * @param {Node} inputParent Input parent (.js-validator)
   * @param {Node} submit      Submit du formulaire initialisé
   */
  unhighlight: function unhighlight(inputParent, submit) {
    // Variables
    inputParent.classList.remove(validator.defaultOptions().errorClass);
    inputParent.classList.add(validator.defaultOptions().validClass);
    inputParent.removeAttribute('data-error', false); // Reset all messages

    validator.resetMessage(inputParent); // Enabled submit

    if (document.querySelectorAll('[data-error="true"]').length === 0) {
      submit.disabled = false;
    }
  },

  /**
   * 
   * @param {Node} inputParent Input parent (.js-validator)
   */
  resetMessage: function resetMessage(inputParent) {
    if (inputParent.querySelectorAll('.message').length > 0) {
      inputParent.querySelectorAll('.message').forEach(function (message) {
        message.remove();
      });
    }
  },

  /**
   * 
   * @param {String}  inputValue           Value de l'input current
   * @param {Object}  attributes           Liste des attributes de l'input current
   * @param {Boolean} attributes.required   | Attribute required de l'input current
   * @param {Regex}   attributes.regex      | Attribute pattern de l'input current
   * @param {String}  attributes.type       | Attribute type de l'input current
   * @param {Number}  attributes.max        | Attribute max de l'input current
   * @param {Number}  attributes.min        | Attribute min de l'input current
   * @param {Number}  attributes.maxlength  | Attribute maxlength de l'input current
   * @param {Number}  attributes.minlength  | Attribute minlength de l'input current
   * @param {Node}    inputParent          Input parent (.js-validator)
   * @param {Node}    submit               Submit du formulaire initialisé
   */
  check: function check(inputValue, attributes, inputParent, submit) {
    var errors = {};
    /*———————————————————————————————————*\
        $ REQUIRED
    \*———————————————————————————————————*/

    if (attributes.required != null) {
      if (inputValue != "") {} else {
        errors.required = "Le champs est requis";
      }
    }
    /*———————————————————————————————————*\
        $ TYPE
    \*———————————————————————————————————*/


    if (attributes.type != null) {
      /**
       * S'il y a un Regex OU type tel OU type text
       * Alors return true;
       */
      if (attributes.regex != null || attributes.type == "text" || attributes.type == "tel") {} else {
        // type="number"
        if (attributes.type == "number") {
          if (RegExp('[0-9]').test(parseInt(inputValue))) {} else {
            errors.type = "Veuillez saisir un nombre";
          }
        } // type="email"


        if (attributes.type == "email") {
          if (RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$').test(inputValue)) {} else {
            errors.type = "Veuillez saisir un e-mail valide";
          }
        } // type="date"


        if (attributes.type == "date") {
          if (RegExp('([0-9]{4})-([0-9]{2})-([0-9]{2})').test(inputValue)) {} else {
            errors.type = "Veuillez saisir une date valide";
          }
        } // type="month"


        if (attributes.type == "month") {
          if (RegExp('([0-9]{4})-([0-9]{2})').test(inputValue)) {} else {
            errors.type = "Veuillez saisir une date valide";
          }
        } // type="week"


        if (attributes.type == "week") {
          if (RegExp('([0-9]{4})-W([0-9]{2})').test(inputValue)) {} else {
            errors.type = "Veuillez saisir une date valide";
          }
        } // type="url"


        if (attributes.type == "url") {
          if (RegExp('(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?').test(inputValue)) {} else {
            errors.type = "Veuillez saisir une date valide";
          }
        } // type="color"


        if (attributes.type == "color") {
          if (RegExp('^#([0-9a-f]{3}|[0-9a-f]{6})$').test(inputValue)) {} else {
            errors.type = "Veuillez saisir une date valide";
          }
        }
      }
    } // type

    /*———————————————————————————————————*\
        $ REGEX
    \*———————————————————————————————————*/


    if (attributes.regex != null) {
      if (RegExp(attributes.regex).test(inputValue)) {} else {
        errors.regex = _this.getAttribute('data-message-error');
      }
    }
    /*———————————————————————————————————*\
        $ MAX
    \*———————————————————————————————————*/


    if (attributes.max != null) {
      if (inputValue <= attributes.max) {} else {
        errors.max = "La valeur doit être inférieur ou égale à " + attributes.max;
      }
    }
    /*———————————————————————————————————*\
        $ MIN
    \*———————————————————————————————————*/


    if (attributes.min != null) {
      if (inputValue >= attributes.min) {} else {
        errors.min = "La valeur doit être supérieur ou égale à " + attributes.min;
      }
    }
    /*———————————————————————————————————*\
        $ MINLENGTH
    \*———————————————————————————————————*/


    if (attributes.minlength != null) {
      if (inputValue.length >= attributes.minlength) {} else {
        errors.minlength = "Le champs doit comporter au minimum " + attributes.minlength + " caractères";
      }
    }
    /*———————————————————————————————————*\
        $ MAXLENGTH
    \*———————————————————————————————————*/


    if (attributes.maxlength != null) {
      if (inputValue.length <= attributes.maxlength) {} else {
        errors.maxlength = "Le champs doit comporter au maximum " + attributes.maxlength + " caractères";
      }
    }
    /*———————————————————————————————————*\
        $ CHECK
    \*———————————————————————————————————*/


    if (Object.keys(errors).length > 0) {
      validator.highlight(inputParent, submit, errors);
    } else {
      validator.unhighlight(inputParent, submit);
    }
  }
};
exports.validator = validator;

/***/ }),

/***/ "./script/main.js":
/*!************************!*\
  !*** ./script/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _homepage = __webpack_require__(/*! ./pages/homepage */ "./script/pages/homepage.js");

/*———————————  Pages  ——————————————*/
document.addEventListener("DOMContentLoaded", function () {
  console.log("main start");
  (0, _homepage.homepage)();
  console.log("main end");
}); // Ready

/***/ }),

/***/ "./script/pages/homepage.js":
/*!**********************************!*\
  !*** ./script/pages/homepage.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.homepage = homepage;

var _validator = __webpack_require__(/*! ../components/validator */ "./script/components/validator.js");

/*———————————————————————————————————*\
    $ HOMEPAGE
\*———————————————————————————————————*/

/*
[Required] <body id="homepage"/> 
*/

/*———————————  Components  ——————————————*/
function homepage() {
  if (document.getElementById('homepage') !== null) {
    _validator.validator.defaultOptions({
      errorClass: 'danger',
      validClass: 'success'
    });

    _validator.validator.init('user-form');

    console.log(_validator.validator.defaultOptions());
  }
}

/***/ })

/******/ });
//# sourceMappingURL=main.js.map