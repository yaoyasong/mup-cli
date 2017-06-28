
function firstLowerCase(str) {
  return str.replace(/^\S/g, s => s.toLowerCase());
}

module.exports = {
  firstLowerCase
};
