import { useRouter } from 'next/router'
import { useTranslations } from 'use-intl'
import Cookies from 'js-cookie'

import Dropdown from '@/components/shared/Dropdown'
import IconFlag from '@/components/icons/Flag'

const LanguageSelector: React.VFC = () => {
  const t = useTranslations('Languages')
  const { locales, locale, pathname } = useRouter()

  const languages = locales?.map((locale) =>
    locale === 'en'
      ? { value: locale, label: t('english').toString() }
      : { value: locale, label: t('french').toString() }
  )

  const selectLanguage = (language: string) => {
    if (language === locale) {
      return
    }

    Cookies.set('NEXT_LOCALE', language)
    window.location.href = pathname
  }

  return (
    <Dropdown
      items={languages || []}
      label={<IconFlag flag={locale || 'en'} />}
      onSelect={selectLanguage}
      selectorLabel={t('selectorLabel').toString()}
    />
  )
}

export default LanguageSelector
