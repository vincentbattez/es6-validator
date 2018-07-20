export const validator = {
  /**
   * 
   * @param {Object} options Liste remplaçant defaultOptions
   * @param {String} defaultOptions.validClass Class quand erreur champs
   * @param {String} defaultOptions.errorClass Class quand champs valide
   */
  defaultOptions: (options = {}) => {
    let defaultOptions = {
      'validClass': 'valid',
      'errorClass': 'error'
    }
    return Object.assign({}, defaultOptions, options); 
  },

  /**
   * 
   * @param {String} idForm ID formulaire du à initialiser
   */
  init: (idForm) => {
    const form     = document.getElementById(idForm);
    const allInput = form.querySelectorAll('.js-validator');
    const submit   = form.querySelector('[type="submit"]');


    allInput.forEach((inputParent) => {
      let input   = inputParent.querySelector('input, textarea, select');
      let allAttr = Array.prototype.slice.call(input.attributes);
      let attributes = {};
      
      /* - - - - - - - - - - - - *\
          $ SET LIST ATTRIBUTES
      \* - - - - - - - - - - - - */
      allAttr.forEach((attr) => {
        if (attr.name === "required")
          attributes.required = true;
        if (attr.name === "pattern") 
           attributes.regex = new RegExp(attr.value);
        if (attr.name === "type")
          attributes.type = attr.value;
        if (attr.name === "max" )
          attributes.max = parseInt(attr.value);
        if (attr.name === "min" )
          attributes.min = parseInt(attr.value);
        if (attr.name === "maxlength" )
          attributes.maxlength = parseInt(attr.value);
        if (attr.name === "minlength" )
          attributes.minlength = parseInt(attr.value);
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
      }) // on change
    }) // foreach allInput
  }, // init()


  /**
   * 
   * @param {Node}   inputParent Input parent (.js-validator)
   * @param {Node}   submit      Submit du formulaire initialisé
   * @param {Object} errors      Liste des erreurs
   */
  highlight: (inputParent, submit, errors) => {
    // Variables
    let input   = inputParent.querySelector('input, textarea, select');
    let idInput = input.getAttribute('id');
    let html = '';

    // Set error class
    inputParent.classList.remove(validator.defaultOptions().validClass);
    inputParent.classList.add(validator.defaultOptions().errorClass);
    inputParent.setAttribute('data-error', true);
    
    // Make message
    html += '<div class="message" id="message-'+ idInput +'">';
      Object.keys(errors).forEach((k) =>{
        html += '<span class="message__text error-'+ k +'">'+ errors[k] +'</span>';
      })
    html += '</div>';
    
    // Reset all messages
    validator.resetMessage(inputParent);
    // Add message
    input.insertAdjacentHTML("afterend", html);
    // Disabled submit    
    submit.disabled = true;
  },


  /**
   * 
   * @param {Node} inputParent Input parent (.js-validator)
   * @param {Node} submit      Submit du formulaire initialisé
   */
  unhighlight: (inputParent, submit) => {
    // Variables
    inputParent.classList.remove(validator.defaultOptions().errorClass);
    inputParent.classList.add(validator.defaultOptions().validClass);
    inputParent.removeAttribute('data-error', false);

    // Reset all messages
    validator.resetMessage(inputParent);
    // Enabled submit

    if (document.querySelectorAll('[data-error="true"]').length === 0) {
      submit.disabled = false;
    }
  },


  /**
   * 
   * @param {Node} inputParent Input parent (.js-validator)
   */
  resetMessage: (inputParent) => {
    if(inputParent.querySelectorAll('.message').length > 0) {
      inputParent.querySelectorAll('.message').forEach((message) => {message.remove();})
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
  check: (inputValue, attributes, inputParent, submit) => {
    let errors  = {};

    /*———————————————————————————————————*\
        $ REQUIRED
    \*———————————————————————————————————*/
    if(attributes.required != null) {
      if (inputValue != "") {
      }else {
        errors.required = "Le champs est requis";
      }
    }

    /*———————————————————————————————————*\
        $ TYPE
    \*———————————————————————————————————*/
    if(attributes.type != null) {
      /**
       * S'il y a un Regex OU type tel OU type text
       * Alors return true;
       */
      if (attributes.regex != null || attributes.type == "text" || attributes.type == "tel") {
      } else {

        // type="number"
        if (attributes.type == "number") {
          if (RegExp('[0-9]').test(parseInt(inputValue))) {
          }else {
            errors.type = "Veuillez saisir un nombre";
          }
        }

        // type="email"
        if (attributes.type == "email") {
          if (RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$').test(inputValue)) {
          }else {
            errors.type = "Veuillez saisir un e-mail valide";
          }
        }

        // type="date"
        if (attributes.type == "date") {
          if (RegExp('([0-9]{4})-([0-9]{2})-([0-9]{2})').test(inputValue)) {
          }else {
            errors.type = "Veuillez saisir une date valide";
          }
        }

        // type="month"
        if (attributes.type == "month") {
          if (RegExp('([0-9]{4})-([0-9]{2})').test(inputValue)) {
          }else {
            errors.type = "Veuillez saisir une date valide";
          }
        }

        // type="week"
        if (attributes.type == "week") {
          if (RegExp('([0-9]{4})-W([0-9]{2})').test(inputValue)) {
          }else {
            errors.type = "Veuillez saisir une date valide";
          }
        }

        // type="url"
        if (attributes.type == "url") {
          if (RegExp('(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?').test(inputValue)) {
          }else {
            errors.type = "Veuillez saisir une date valide";
          }
        }

        // type="color"
        if (attributes.type == "color") {
          if (RegExp('^#([0-9a-f]{3}|[0-9a-f]{6})$').test(inputValue)) {
          }else {
            errors.type = "Veuillez saisir une date valide";
          }
        }
      }

    } // type

    /*———————————————————————————————————*\
        $ REGEX
    \*———————————————————————————————————*/
    if(attributes.regex != null) {
      if (RegExp(attributes.regex).test(inputValue)) {
      }else {
        errors.regex = this.getAttribute('data-message-error');
      }
    }

    /*———————————————————————————————————*\
        $ MAX
    \*———————————————————————————————————*/
    if(attributes.max != null) {
      if (inputValue <= attributes.max) {
      }else {
        errors.max = "La valeur doit être inférieur ou égale à " + attributes.max;
      }
    }
    
    /*———————————————————————————————————*\
        $ MIN
    \*———————————————————————————————————*/
    if(attributes.min != null) {
      if (inputValue >= attributes.min) {
      }else {
        errors.min = "La valeur doit être supérieur ou égale à " + attributes.min;
      }
    }
    
    /*———————————————————————————————————*\
        $ MINLENGTH
    \*———————————————————————————————————*/
    if(attributes.minlength != null) {
      if (inputValue.length >= attributes.minlength) {
      }else {
        errors.minlength = "Le champs doit comporter au minimum " + attributes.minlength + " caractères";
      }
    }
    
    /*———————————————————————————————————*\
        $ MAXLENGTH
    \*———————————————————————————————————*/
    if(attributes.maxlength != null) {
      if (inputValue.length <= attributes.maxlength) {
      }else {
        errors.maxlength = "Le champs doit comporter au maximum " + attributes.maxlength + " caractères";
      }
    }

    /*———————————————————————————————————*\
        $ CHECK
    \*———————————————————————————————————*/
    if (Object.keys(errors).length > 0) {
      validator.highlight(inputParent, submit, errors);
    }else {
      validator.unhighlight(inputParent, submit);
    }
  },
}