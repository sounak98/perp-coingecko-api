import app from './app';
import serverlessExpress = require('@vendia/serverless-express');

const contentTypes = [
  'application/javascript',
  'application/json',
  'application/octet-stream',
  'application/xml',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'text/comma-separated-values',
  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml',
];

export const handler = serverlessExpress({
  app,
  binarySettings: { contentTypes },
}).handler;
