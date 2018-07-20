/*———————————————————————————————————*\
    $ HOMEPAGE
\*———————————————————————————————————*//*
  [Required] <body id="homepage"/> 

*/

/*———————————  Components  ——————————————*/
import { validator } from "../components/validator";

export function homepage() {
  if (document.getElementById('homepage') !== null) {
    validator.defaultOptions({
      errorClass: 'danger',
      validClass: 'success',
    });

    validator.init('user-form');

    console.log(validator.defaultOptions());
  }
}