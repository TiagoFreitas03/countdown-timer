function isDateValid(variable: string) {
	if (!(/^\d{4}\-\d{1,2}\-\d{1,2}$/).test(variable))
		return false

	const [year, month, day] = variable.split('-').map(x => Number(x))

	if (year < 1000 || year > 3000 || month == 0 || month > 12)
		return false

	const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

	if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
		monthLength[1] = 29

	return day > 0 && day <= monthLength[month - 1]
}

function isTimeValid(time: string) {
	if (!(/^(\d{2}):(\d{2})(:\d{2})?$/).test(time))
		return false

	const [hours, minutes] = time.split(':').map(x => Number(x))

	if (hours < 0 || hours > 24)
		return false

	return minutes >= 0 && minutes <= 59
}

export { isDateValid, isTimeValid }
