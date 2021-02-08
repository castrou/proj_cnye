import express from 'express';
import { createServer } from 'http'
import wsService from './ws.service'
import { signs, colors, modes } from './types'
import { log } from './utils'
import { config } from 'dotenv'

config()

const app = express()
const server = createServer(app)

app.use(express.json())

app.put('/api/:sign/color/:action', (req, res) => {
	const { sign, action } = req.params;
	const parsedSign = sign.toUpperCase();
	const parsedAction = action.toUpperCase();
	if(
		signs.findIndex(zodiacSign => zodiacSign === parsedSign) < 0 ||
		colors.findIndex(color => color === parsedAction) < 0
	) {
		res.status(403).send('bad request')
	} else {
		wsService.sendZodiacCommand(parsedSign, 'COLOR', parsedAction);
		log(`Set ${parsedSign} to ${parsedAction}`)
		res.status(202).send('ok')
	}
})
app.put('/api/:sign/mode/:action', (req, res) => {
	const { sign, action } = req.params;
	const parsedSign = sign.toUpperCase();
	const parsedAction = action.toUpperCase();
	if(
		signs.findIndex(zodiacSign => zodiacSign === parsedSign) < 0 ||
		modes.findIndex(mode => mode === parsedAction) < 0
	) {
		res.status(403).send('bad request')
	} else {
		wsService.sendZodiacCommand(parsedSign, 'MODE', parsedAction);
		log(`Set ${parsedSign} to ${parsedAction}`)
		res.status(202).send('ok')
	}
})

const PORT = process.env.SERVER_PORT || 7071
server.listen(PORT, () => {
	console.log(`listening on port: ${PORT}`)
})
