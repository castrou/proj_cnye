import express from 'express';
import { createServer } from 'http'
import wsService from './ws.service'
import { signs, commands } from './types'
import { log } from './utils'
import { config } from 'dotenv'

config()

const app = express()
const server = createServer(app)

app.use(express.json())

app.put('/zodiac/:sign/:action', (req, res) => {
	const { sign, action } = req.params;
	const parsedSign = sign.toUpperCase();
	const parsedAction = action.toUpperCase();
	if(
		signs.findIndex(zodiacSign => zodiacSign === parsedSign) < 0 ||
		commands.findIndex(comm => comm === parsedAction) < 0
	) {
		res.status(403).send('bad request')
	} else {
		wsService.sendZodiacCommand(parsedSign, parsedAction);
		log('ok')
		res.status(202).send('ok')
	}
})

const PORT = process.env.SERVER_PORT || 3000
server.listen(PORT, () => {
	console.log(`listening on port: ${PORT}`)
})