const setCookie = (name, value, minutes) => {
  const date = new Date()
  const millisecondsUntilExpiry = minutes * 60 * 1000
  date.setTime(date.getTime() + millisecondsUntilExpiry)

  const expires = 'expires=' + date.toUTCString()
  document.cookie = name + '=' + value + '; ' + expires
}

const getCookie = (name) => {
  name += '='

  let cookies = document.cookie.split(';')
  let value

  cookies.forEach((cookie) => {

    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1)
    }

    if (cookie.indexOf(name) < 0)
    else value = cookie.substring(name.length, cookie.length)
  }

  return value || ''
}

module.exports = { setCookie, getCookie }
