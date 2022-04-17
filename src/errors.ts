import createHttpError from 'http-errors';

export const createUserNotFoundError = (id: number) => {
  return createHttpError(401, `Not found user: id = ${id}`);
};
