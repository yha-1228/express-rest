const config = {
  secretOrPrivateKey: process.env.JWT_SERCRET_OR_PRYVATE_KEY || `iouzvy97iobvgfpaNEanH¥n`,
  algorithm: 'HS256',
  expiresIn: `${process.env.JWT_LIMIT}s` || '60s',
};

export default config;
