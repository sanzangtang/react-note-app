import sanitize from 'sanitize-html';

const sanitizeConfig = {
  allowedTags: [],
  allowedAttributes: [],
  textFilter: function(text) {
    return text + ' ';
  }
};

const sanitizeHTMl = html => {
  return sanitize(html, sanitizeConfig);
};

export default sanitizeHTMl;
