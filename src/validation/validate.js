const axios = require('axios')

const isValidField = (value) => {
    if (typeof value == "undefined" || typeof value == null) return false;
    if (typeof value == "string" && value.trim().length == 0) return false;
    return true;
  };

  const isValidUrl = (value) => {
    return (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(value))
  }
  
  module.exports = {isValidField, isValidUrl}

  