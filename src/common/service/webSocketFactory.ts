interface IWSS {
	[name: string]: WebSocket
}

class WSFactory {
	private wss: IWSS = {}

	create = (name: string) => {
		const host = location.host
		const ws = new WebSocket(`ws://${host}/${name}`)
		this.wss = { [name]: ws }
		return ws
	}

	find = (name: string) => {
		return this.wss[name]
	}

	delete = (name: string) => {
		if (this.wss[name]) {
			this.wss[name].close()
			delete this.wss[name]
		}
	}
}

const wsFactory = new WSFactory()

export interface IWSResponse<T> {
	type: string
	data: T
}

export const WSFactoryCreate = (userId: string) => wsFactory.create(`webSocketServer/${userId}`)

export const WSFactoryFind = (userId: string) => wsFactory.find(`webSocketServer/${userId}`)

export const WSFactoryDelete = (userId: string) => wsFactory.delete(`webSocketServer/${userId}`)
