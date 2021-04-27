/* eslint-disable */
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function InvalidCharacterError(message) {
  this.message = message;
}

InvalidCharacterError.prototype = new Error();
InvalidCharacterError.prototype.name = 'InvalidCharacterError';

function InvalidTokenError(message) {
  this.message = message;
}

InvalidTokenError.prototype = new Error();
InvalidTokenError.prototype.name = 'InvalidTokenError';

function polyfill(input) {
  var str = String(input).replace(/=+$/, '');
  if (str.length % 4 === 1) {
    throw new InvalidCharacterError('"atob" failed: The string to be decoded is not correctly encoded');
  }
  for (
    // initialize result and counters
    var bc = 0, bs, buffer, idx = 0, output = '';
    // get next character
    buffer = str.charAt(idx++);

    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
    bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0

  ) {
    buffer = chars.indexOf(buffer);
  }
  return output;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(polyfill(str).replace(/(.)/g, function(m, p) {
    var code = p.charCodeAt(0).toString(16).toUpperCase();
    if (code.length < 2) {
      code = '0' + code;
    }
    return '%' + code;
  }));
}

function base64UrlDecode(str) {
  var output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw 'Illegal base64url string!';
  }
  try {
    return b64DecodeUnicode(output);
  } catch (err) {
    return polyfill(output);
  }
}

function jwtDecode(token, options) {
  if (typeof token !== 'string') {
    throw new InvalidTokenError('Invalid token specified');
  }

  options = options || {};

  var pos = options.header === true ? 0 : 1;
  try {
    return JSON.parse(base64UrlDecode(token.split('.')[pos]));
  } catch (e) {
    throw new InvalidTokenError('Invalid token specified: ' + e.message);
  }
}

export { jwtDecode };
