import moment from 'moment'
import {getLocale} from '#/main/app/intl/locale'

// configure moment
// this may be not the better place to do it
moment.locale(getLocale())

/**
 * Gets the date format expected by the server API.
 *
 * @return {string}
 */
function getApiFormat() {
  return 'YYYY-MM-DD[T]HH:mm:ss'
}

/**
 * Gets the display format of the current user.
 * For now it uses the format of the current locale.
 *
 * @param {boolean} long     - gets the full text date, otherwise gets the short digit format.
 * @param {boolean} withTime - appends time format.
 */
function getDisplayFormat(long = false, withTime = false) {
  let displayFormat
  if (long) {
    displayFormat = moment.localeData().longDateFormat('ll') // Sep 4, 1986
  } else {
    displayFormat = moment.localeData().longDateFormat('L') // 09/04/1986
  }

  if (withTime) {
    // appends time (time format is the same for long and short format)
    displayFormat += ' ' + moment.localeData().longDateFormat('LT')
  }

  return displayFormat
}

/**
 * Gets formated date from Date object
 * @param {Date} date
 * @returns {string} formatted date
 */
function dateToDisplayFormat(date) {
  return moment(date).format(getDisplayFormat())
}

function isValidDate(value, format = null) {
  if (format) {
    return moment(value, format, true).isValid()
  } else {
    return moment(value).isValid()
  }
}

/**
 * Converts a date from the displayed format to the API one.
 *
 * @param {string}  displayDate - the display date to convert.
 * @param {boolean} long        - does the display date use the full text format ?
 * @param {boolean} withTime    - has it time ?
 *
 * @return {string} - the date in api format.
 */
function apiDate(displayDate, long = false, withTime = false) {
  let date = moment(displayDate, getDisplayFormat(long, withTime))
  if (withTime) {
    // This is causing a lost of 2 hours in date field of a form
    // date = date.utc()
  }

  return date.format(getApiFormat())
}

/**
 * Converts a date from the api format to the displayed one.
 *
 * @param {string}  apiDate  - the api date to convert.
 * @param {boolean} long     - does the display date use the full text format ?
 * @param {boolean} withTime - has it time ?
 *
 * @return {string} - the date in display format.
 */
function displayDate(apiDate, long = false, withTime = false) {
  return moment.utc(apiDate).format(getDisplayFormat(long, withTime))
}

/**
 * Returns a date object based on api received date
 * @param {String} apiDate
 * @returns {Date | false} - Returns a date object or false if apiDate is not valid
 */
function apiToDateObject(apiDate) {
  return isValidDate(apiDate, getApiFormat()) && moment(apiDate, getApiFormat()).toDate()
}

/**
 * Gets API now value.
 * @param {boolean} local
 * @return {string}
 */
function now(local = true) {
  return local ? moment().utc().local().format(getApiFormat()) : moment().utc().format(getApiFormat())
}

function computeElapsedTime(startDate) {
  const diff = moment().utc().diff(moment(startDate).utc())
  const duration = moment.duration(diff)

  return duration._data.seconds + duration._data.minutes * 60 + duration._data.hours * 3600 + duration._data.days * 86400
}

function getTimeDiff(startDate, endDate) {
  const diff = moment(endDate).utc().diff(moment(startDate).utc())
  const duration = moment.duration(diff)

  return duration._data.seconds + duration._data.minutes * 60 + duration._data.hours * 3600 + duration._data.days * 86400
}

function nowAdd(addition, local = true) {
  return local ? moment().utc().local().add(addition).format(getApiFormat()) : moment().utc().add(addition).format(getApiFormat())
}

export {
  getApiFormat,
  getDisplayFormat,
  isValidDate,
  apiDate,
  displayDate,
  now,
  apiToDateObject,
  dateToDisplayFormat,
  computeElapsedTime,
  getTimeDiff,
  nowAdd
}
