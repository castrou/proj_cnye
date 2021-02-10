import express from 'express';
import { createServer } from 'http'
import wsService from './ws.service'
import { signs, colors, modes } from './types'
import { log } from './utils'
import { config } from 'dotenv'
import { stepList } from './steps'

config()

const app = express()
const server = createServer(app)

app.use(express.json())

app.put('/api/zodiac/:sign/color/:action', (req, res) => {
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
app.put('/api/zodiac/:sign/mode/:action', (req, res) => {
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
  res.status(200).send({
    prev: stepList.previousStep,
    currrent: stepList.currentStep,
    next: stepList.nextStep
  })
})
app.post('/api/step/next', (req, res) => {
  if (stepList.moveForward()) {
    res.status(202).send({
      prev: stepList.previousStep,
      current: stepList.currentStep,
      next: stepList.nextStep
    })
  } else {
    res.status(404).send({
      message: 'ran out of steps',
      prev: stepList.previousStep,
      current: stepList.currentStep,
      next: stepList.nextStep
    })
  }
})
app.post('/api/step/back', (req, res) => {
  if (stepList.moveBack()) {
    res.status(202).send({
      prev: stepList.previousStep,
      current: stepList.currentStep,
      next: stepList.nextStep
    })
  } else {
    res.status(404).send({
      message: 'ran out of steps',
      prev: stepList.previousStep,
      current: stepList.currentStep,
      next: stepList.nextStep
    })
  }
})

app.post('/api/ALL/OFF', (req, res) => {
  wsService.emitStringToClients('ALL-MODE-OFF')
  res.status(205).send({
    message: "ALL-OFF"
  })
})

app.post('/api/ALL/ON', (req, res) => {
  wsService.emitStringToClients('ALL-MODE-ON')
  res.status(205).send({
    message: "ALL-ON"
  })
})

app.post('/api/step/reset', (req, res) => {
  stepList.reset()
  wsService.emitStringToClients('ALL-MODE-OFF')
  res.status(205).send({
    message: "reset",
    prev: stepList.previousStep,
    current: stepList.currentStep,
    next: stepList.nextStep
  })
})

app.put('/api/step/execute', (req, res) => {
  const commandStr = stepList.currentStep
  const commands = commandStr.split(' ');
  commands.forEach(command => {
    wsService.emitStringToClients(command)
  })
  res.status(200).send({
    message: 'executed',
    prev: stepList.previousStep,
    current: stepList.currentStep,
    next: stepList.nextStep
  })
})

app.post('/api/step/executePrev', (req, res) => {
  if (stepList.moveBack()) {
    const commandStr = stepList.currentStep
    const commands = commandStr.split(' ');
    commands.forEach(command => {
      wsService.emitStringToClients(command)
    })
    res.status(200).send({
      message: 'executed',
      prev: stepList.previousStep,
      current: stepList.currentStep,
      next: stepList.nextStep
    })
  } else {
    res.status(404).send({
      message: 'ran out of steps',
      prev: stepList.previousStep,
      current: stepList.currentStep,
      next: stepList.nextStep
    })
  }
})

app.post('/api/step/executeNext', (req, res) => {
  if (stepList.moveForward()) {
    const commandStr = stepList.currentStep
    const commands = commandStr.split(' ');
    commands.forEach(command => {
      wsService.emitStringToClients(command)
    })
    res.status(200).send({
      message: 'executed',
      prev: stepList.previousStep,
      current: stepList.currentStep,
      next: stepList.nextStep
    })
  } else {
    res.status(404).send({
      message: 'ran out of steps',
      prev: stepList.previousStep,
      current: stepList.currentStep,
      next: stepList.nextStep
    })
  }
})

const PORT = process.env.SERVER_PORT || 7071
server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})
