/* eslint-disable import/no-extraneous-dependencies */

const Docma = require('docma');
const path = require('path');
const fs = require('fs');

const docma = new Docma();
const root = path.resolve(__dirname, '../../../');
const packages = fs.readdirSync(
  path.resolve(root, 'packages'),
)
  .filter((it) => it !== 'docs')
  .filter((it) => fs.lstatSync(
    path.resolve(root, 'packages', it),
  ).isDirectory());
const src = packages.reduce(
  (prev, it) => prev.concat([
    path.resolve(root, `packages/${it}/src/**/*.js`),
  ]),
  [
    `!${path.resolve(root, 'packages', '**', '__(tests|fixtures)__')}`,
    `!${path.resolve(root, 'packages', '**', '/*.(spec|fixture|test).js')}`,
  ],
);

docma.build({
  src,
  clean: true,
  debug: Docma.Debug.ALL,
  dest: path.resolve(root, 'packages', 'docs', 'public'),
  jsdoc: {
    undocumented: true,
    package: path.resolve(root, 'package.json'),
  },
  app: {
    title: 'NLG Documentation',
    server: Docma.ServerType.STATIC,
    routing: {
      method: Docma.RoutingMethod.PATH,
    },
  },
})
  .then(() => console.log('scuccess'))
  .catch(() => console.error('fail'));
