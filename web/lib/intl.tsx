import {
  Formats,
  IntlError,
  IntlErrorCode,
  IntlMessages,
  NextIntlProvider,
} from 'next-intl'
import { useRouter } from 'next/router'

interface Props {
  messages?: IntlMessages
  now: Date
  timezone?: string
}

const IntlProvider: React.FC<Props> = ({ messages, now, children }) => {
  const { locale } = useRouter()

  return (
    <NextIntlProvider
      messages={messages}
      locale={locale}
      formats={formats}
      now={new Date(now)}
      onError={onError}
      getMessageFallback={getMessageFallback}
      // TODO(soramon0): add server timezone
      // timeZone="Austria/Vienna"
    >
      {children}
    </NextIntlProvider>
  )
}

export default IntlProvider

const formats: Partial<Formats> = {
  dateTime: {
    short: {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    },
  },
}

function onError(error: IntlError) {
  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    // Missing translations are expected and should only log an error
    console.error(error)
  } else {
    // TODO(soramon0): send to report mechanism
    console.error('[INTL ERROR]:', error)
  }
}

function getMessageFallback({ namespace, key, error }: messageFallbackArgs) {
  const path = [namespace, key].filter((part) => part != null).join('.')

  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    return `${path} is not yet translated`
  } else {
    return `Dear developer, please fix this message: ${path}`
  }
}

type messageFallbackArgs = {
  namespace?: string
  key: string
  error: IntlError
}
