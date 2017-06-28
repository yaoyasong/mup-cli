
function firstLowerCase(str) {
  return str.replace(/^\S/g, s => s.toLowerCase());
}

function firstUpperCase(str) {
  return str.replace(/^\S/g, s => s.toUpperCase());
}

module.exports = {
  firstLowerCase,
  firstUpperCase
};
