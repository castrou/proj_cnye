import express from 'express';
import { createServer } from 'http'
import wsService from './ws.service'
import { signs, colors, modes } from './types'
import { log } from './utils'
import { config } from 'dotenv'
import head, { ListNode } from './steps'

config()

const app = express()
const server = createServer(app)

let cursor = head.next;

app.use(express.json())

app.put('/api/:sign/color/:action', (req, res) => {
	const { sign, action } = req.params;
	const parsedSign = sign.toUpperCase();
	const parsedAction = action.toUpperCase();
	if (
		signs.findIndex(zodiacSign => zodiacSign === parsedSign) < 0 ||
		colors.findIndex(color => color === parsedAction) < 0
	) {
		res.status(403).send('bad request')
	} else {
		wsService.sendZodiacCommand(parsedSign, 'COLOUR', parsedAction);
		log(`Set ${parsedSign} to ${parsedAction}`)
		res.status(202).send('ok')
	}
})
app.put('/api/:sign/mode/:action', (req, res) => {
	const { sign, action } = req.params;
	const parsedSign = sign.toUpperCase();
	const parsedAction = action.toUpperCase();
	if (
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
app.get('/api/step', (req, res) => {
	if (cursor) {
		res.status(200).send({ currentStep: cursor.value })
	} else {
		res.status(404).send({ message: 'ran out of steps' })
	}
})
app.post('/api/step/next', (req, res) => {
	if (cursor) {
		if (cursor.next) {
			const next = cursor.next;
			cursor = next;
			res.status(202).send({ currentStep: cursor.value })
		} else {
			res.status(404).send({
				message: 'ran out of steps',
				currentStep: cursor.value
			})
		}
	} else {
		res.status(404).send({
			message: 'ran out of steps\nPOST api/step/reset to reset state',
		})
	}
})
app.post('/api/step/back', (req, res) => {
	if (cursor) {
		if (cursor.previous && cursor.previous.value !== 'nothing') {
			const prev = cursor.previous;
			cursor = prev;
			res.status(202).send({ currentStep: cursor.value })
		} else {
			res.status(404).send({
				message: 'ran out of steps',
				currentStep: cursor.value
			})
		}
	} else {
		res.status(404).send({
			message: 'ran out of steps\nPOST api/step/reset to reset state',
		})
	}
})
app.post('/api/step/reset', (req, res) => {
	if(cursor) {
		cursor = cursor.reset().next
		res.status(205)
	} else {
		res.status(500).send({ message: 'uWu i did a fucky' })
	}
})
app.put('/api/step/execute', (req, res) => {
	if(cursor) {
		const commandStr = cursor.value
		const commands = commandStr.split(' ');
		commands.forEach(command => {
			wsService.emitStringToClients(command)
		})
		res.status(200).send({ message: 'executed', currentStep: cursor.value })
	} else {
		res.status(501).send({ message: 'no step to execute'})
	}
})
app.post('/api/step/executeNext', (req, res) => {
	if(cursor) {
		const commandStr = cursor.value
		const commands = commandStr.split(' ');
		commands.forEach(command => {
			wsService.emitStringToClients(command)
		})
		res.status(200).send({ message: 'executed', currentStep: cursor.value })
	} else {
		res.status(501).send({ message: 'no step to execute'})
	}
})

const PORT = process.env.SERVER_PORT || 7071
server.listen(PORT, () => {
	console.log(`listening on port: ${PORT}`)
})
