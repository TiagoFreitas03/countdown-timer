import { useState, FormEvent, useEffect } from 'react'

import { Sidebar } from './components/Sidebar'
import { IEvent } from './interfaces/IEvent'
import { isDateValid, isTimeValid } from './utils/validations'
import { dateToString, stringToDate } from './utils/convertions'
import './styles/app.css'

export function App() {
	const [name, setName] = useState('')
	const [date, setDate] = useState('')
	const [time, setTime] = useState('00:00:00')

	const [now, setNow] = useState(Math.floor(Date.now() / 1000))
	const [events, setEvents] = useState<IEvent[]>([])

	useEffect(() => {
		setDate(dateToString(new Date(), 'dd/mm/yyyy'))
		const localEvents = localStorage.getItem('events')

		if (localEvents) {
			const parsedEvents = JSON.parse(localEvents) as IEvent[]
			setEvents(parsedEvents)
		}
	}, [])

	useEffect(() => {
		setTimeout(() => {
			setNow(Math.floor(Date.now() / 1000))
		}, 1000)
	}, [now])

	useEffect(() => {
		if (events.length > 0) {
			localStorage.setItem('events', JSON.stringify(events))
		} else {
			localStorage.removeItem('events')
		}
	}, [events])

	function handleCreateEventFormSubmit(event: FormEvent) {
		event.preventDefault()

		if (name === '')
			return alert('Informe o nome do evento')

		if (!isDateValid(date) || !isTimeValid(time))
			return alert('Data e/ou hora inválida')

		const d = stringToDate(date, time)

		if (Date.now() >= d.getTime())
			return alert('Selecione uma data/hora maior que a atual')

		const e = {
			name,
			timestamp: Math.floor(d.getTime() / 1000),
			date: dateToString(d, 'full')
		}

		setEvents([...events, e])
		setName('')
		setDate(dateToString(new Date(), 'dd/mm/yyyy'))
		setTime('00:00:00')
	}

	function removeEvent(index: number) {
		const aux = events.slice()
		aux.splice(index, 1)
		setEvents(aux)
	}

	return (
		<div className='container'>
			<main>
				<h1>Cadastre seu evento</h1>

				<form onSubmit={handleCreateEventFormSubmit}>
					<label>Nome: </label>
					<input type="text" value={name} onChange={e => setName(e.target.value)} />

					<div className='input-group'>
						<label>Data: </label>
						<input type="date" value={date} onChange={e => setDate(e.target.value)} />

						<label>Hora: </label>
						<input type="time" value={time} onChange={e => setTime(e.target.value)} step={1} />
					</div>

					<button type="submit" id="start">Iniciar</button>
				</form>
			</main>

			<Sidebar events={events} now={now} removeEvent={(pos) => removeEvent(pos)} />
		</div>
	)
}
