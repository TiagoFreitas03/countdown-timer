const MONTHS = [
	'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
	'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
]

type DateFormats = 'dd/mm/yyyy' | 'full'

export function dateToString(d: Date, format: DateFormats) {
	const [year, month, day] = [d.getFullYear(), d.getMonth(), d.getDate()]
	let dateStr = ''

	if (format === 'dd/mm/yyyy') {
		dateStr = [
			year,
			String(month + 1).padStart(2, '0'),
			String(day).padStart(2, '0')
		].join('-')
	} else {
		const [hours, minutes, seconds] = [d.getHours(), d.getMinutes(), d.getSeconds()]

		const h = String(hours).padStart(2, '0')
		const m = String(minutes).padStart(2, '0')
		const s = String(seconds).padStart(2, '0')

		dateStr = `${day} ${MONTHS[month]} ${year} às ${h}:${m}:${s}`
	}

	return dateStr
}

export function stringToDate(date: string, time?: string) {
	const [year, month, day] = date.split('-').map(x => Number(x))
	let [hours, minutes, seconds] = [0, 0, 0]

	if (time) {
		[hours, minutes, seconds] = time.split(':').map(x => isNaN(Number(x)) ? 0 : Number(x))
	}

	return new Date(year, month - 1, day, hours, minutes, seconds)
}
