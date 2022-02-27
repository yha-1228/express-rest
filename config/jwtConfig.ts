const config = {
  secretOrPrivateKey: process.env.SERCRET_OR_PRYVATE_KEY || `iouzvy97iobvgfpaNEanH¥n`,
  algorithm: 'HS256',
  expiresIn: '60s',
};

export default config;
