const ESCAPE_CODE = 27;
const EMAIL_REGEXP = /^([a-z0-9_\-.]{2,})@([\w\-.]+)\.([a-z]{2,})$/;
// eslint-disable-next-line no-useless-escape
const NAME_REGEXP = /^([А-ЯЁ][а-яё]+([\-/{1}]?[А-Я]{1}?[а-я]+?)?)$/;
const MONTH_NAME = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

export {
  ESCAPE_CODE,
  EMAIL_REGEXP,
  NAME_REGEXP,
  MONTH_NAME,
};
