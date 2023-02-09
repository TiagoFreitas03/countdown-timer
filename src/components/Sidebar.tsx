import { IEvent } from '../interfaces/IEvent'
import '../styles/sidebar.css'

interface SidebarProps {
	events: IEvent[]
	now: number
	removeEvent: (pos: number) => void
}

const TITLES = ['Dias', 'Horas', 'Minutos', 'Segundos']

export function Sidebar({ events, now, removeEvent }: SidebarProps) {
	function formatRemaining(timestamp: number, pos: number) {
		const diff = timestamp - now

		if (diff <= 0) {
			alert(`Evento ${events[pos].name} finalizado`)
			removeEvent(pos)
			return [0, 0, 0, 0]
		}

		const days = Math.floor(diff / (60 * 60 * 24)),
			hours = Math.floor(diff % (60 * 60 * 24) / (60 * 60)),
			minutes = Math.floor(diff % (60 * 60) / 60),
			seconds = Math.floor(diff % 60)

		return [days, hours, minutes, seconds]
	}

	return (
		<aside>
			<h2>Eventos Iniciados</h2>

			{
				events.length > 0 ? (
					events.map((e, i) => {
						return (
							<div key={i} className="event-container">
								<div>
									<div className='event-header'>
										<h3>{e.name}</h3>
										<p>{e.date}</p>
									</div>

									<div className="countdown-container">
										{formatRemaining(e.timestamp, i).map((x, j) => {
											return (
												<span key={j} className="time-container">
													<p className="time">{x}</p>
													<p>{TITLES[j]}</p>
												</span>
											)
										})}
									</div>
								</div>

								<div>
									<button className='btn-close' onClick={() => removeEvent(i)}>&times;</button>
								</div>
							</div>
						)
					})
				) : ( <p>Nenhum evento iniciado...</p> )
			}
		</aside>
	)
}
