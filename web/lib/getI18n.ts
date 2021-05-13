export default function getI18n(page: string, locale?: string) {
	return {
		messages: {
			...require(`../i18n/${page}/${locale}.json`),
			...require(`../i18n/shared/${locale}.json`)
		},
		now: new Date().getTime()
	}
}