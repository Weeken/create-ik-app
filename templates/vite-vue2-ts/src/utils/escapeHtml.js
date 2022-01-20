const escapeRE = /["'&<>]/
const unescapeRE = /(&quot;|&amp;|&#39;|&lt;|&gt;)/

export function escapeHtml(string) {
  const str = '' + string
  const match = escapeRE.exec(str)

  if (!match) {
    return str
  }

  let html = ''
  let escaped = ''
  let index = 0
  let lastIndex = 0
  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escaped = '&quot;'
        break
      case 38: // &
        escaped = '&amp;'
        break
      case 39: // '
        escaped = '&#39;'
        break
      case 60: // <
        escaped = '&lt;'
        break
      case 62: // >
        escaped = '&gt;'
        break
      default:
        continue
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index)
    }

    lastIndex = index + 1
    html += escaped
  }

  return lastIndex !== index ? html + str.substring(lastIndex, index) : html
}

export function unescapeHtml(string) {
  let str = '' + string
  const matches = unescapeRE.exec(str)

  if (!matches) {
    return str
  }

  let html = ''
  let unescape = ''
  let index = 0

  while (unescapeRE.exec(str) || str.length > 0) {
    const match = unescapeRE.exec(str)

    if (!match && str.length > 0) {
      html += str
      str = ''
      continue
    }

    index = match.index
    switch (match[0]) {
      case `&lt;`:
        unescape = `<`
        break
      case `&gt;`:
        unescape = `>`
        break
      case `&quot;`:
        unescape = `"`
        break
      case `&#39;`:
        unescape = `'`
        break
      case `&amp;`:
        unescape = `&`
        break
      default:
        continue
    }

    if (index === 0) {
      html += unescape
    } else {
      html += str.substring(0, index)
      html += unescape
    }
    str = str.substring(index + match[0].length)
  }

  return html
}
