export function trans(...args) {
  return window.Translator.trans(...args)
}

export function t(message) {
  return trans(message, {}, 'platform')
}

export function tex(message, domain = 'message') {
  return trans(message, {}, domain)
}
