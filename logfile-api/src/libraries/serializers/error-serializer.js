const ERROR_UNPROCESSABLE_ENTITY = 'E_UNPROCESSABLE_ENTITY';
const STATUS_UNPROCESSABLE_ENTITY = 422;

const toUnprocessableEntityError = (title, detail) => ({
  code: ERROR_UNPROCESSABLE_ENTITY,
  status: STATUS_UNPROCESSABLE_ENTITY,
  title,
  detail,
});

module.exports = {
  toUnprocessableEntityError,
}