import { IntlMessages } from 'use-intl'

const defaultLangugae = 'en'

type I18nData = {
  messages: IntlMessages
  now: number
}

export default function getI18n(
  page: string,
  locale = defaultLangugae
): I18nData {
  return {
    messages: {
      ...require(`../i18n/${page}/${locale}.json`),
      ...require(`../i18n/shared/${locale}.json`),
    },
    now: new Date().getTime(),
  }
}
