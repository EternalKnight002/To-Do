/* eslint-disable */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn('companies', {
    website: { type: 'text' }
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('companies', 'website');
};
