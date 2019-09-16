var client = require('./contentful-config').client

export const getThankyou = function getData (url) {
  return (
    client
      .getEntries({ content_type: 'thankYouReferPages', 'fields.url': url })
      .then(response => response.items)
      // eslint-disable-next-line no-console
      .catch(err => console.error(err))
  )
}

export const getEnrollmentQuestions = function getData (url) {
  return (
    client
      .getEntries({ content_type: 'enrollmentQuestions' })
      .then(response => response.items)
      // eslint-disable-next-line no-console
      .catch(err => console.error(err))
  )
}

export const getWebSiteSettings = function getData (url) {
  return (
    client
      .getEntries({ content_type: 'websiteSettings' })
      .then(response => response.items)
      // eslint-disable-next-line no-console
      .catch(err => console.error(err))
  )
}

export const getStudy = function getData (url) {
  return (
    client
      .getEntries({ content_type: 'studies', 'fields.studyName': 'Swab & Send Study' })
      .then(response => response.items)
      // eslint-disable-next-line no-console
      .catch(err => console.error(err))
  )
}
