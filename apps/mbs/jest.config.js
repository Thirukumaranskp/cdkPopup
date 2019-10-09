module.exports = {
  name: 'mbs',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/mbs',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
