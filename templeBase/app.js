const ZodiacSign = require("./src/zodiac/ZodiacSign");
const { signs } = require("./src/types");
const {
    createListElement,
    createButtonElement,
} = require("./src/zodiac/elements");
const { IPCRenderHandler, handlers } = require("./src/zodiac/ipcRenderer");
const { REGISTER_ON, REGISTER_OFF, REGISTER_COLOR_SET } = handlers

let state = {};
let wrap;
let activeSignUI;

const loadZodiacButtons = () => {
    // wraps the buttons
    wrap = document.getElementById("zodiac-button-wrap");

    // Active Indicators
    activeSignUI = document.getElementById("activeSign");

    const buttons = signs.map((sign) => {
        // Active Indicator for the zodiac sign
        const listElement = createListElement(sign);
        activeSignUI.appendChild(listElement);

        // Button element including color selection 
        const buttonElement = createButtonElement(sign);

        // Event handler
        const ipcHandler = new IPCRenderHandler(sign);

        // This class contains most of the logic
        // of the app
        const zodiacSign = new ZodiacSign(
            sign,
            listElement,
            buttonElement,
            ipcHandler
        )
        const events = [
            {...REGISTER_ON, onSuccess: () => zodiacSign.toggleUIOn()},
            {...REGISTER_OFF, onSuccess: () => zodiacSign.toggleUIOff()},
            {...REGISTER_ON, onSuccess: (args) => zodiacSign.setColor(args.color)},
        ]
        registerIPCHandlerEvents(zodiacSign, events)
        state[sign] = zodiacSign;

        // create buttons
        wrap.appendChild(buttonElement);
        return zodiacSign.node;
    });
    return buttons;
};
const registerIPCHandlerEvents = (zodiacSign, events) => {
    events.forEach(event => {
        const { ipcHandler, sign } = zodiacSign;
        const { onError, onSuccess } = event
        const eventName = event.makeName(sign);
        const eventHandler = event.makeHandler(onSuccess, onError)
        ipcHandler.registerHandler(eventName, eventHandler)
    })
}

function switchOnAll() {
    Object.values(state).forEach((horoscope) => {
        if (!horoscope.isActive) {
            horoscope.setUILoading()
            horoscope.ipcHandler.sendSwitchOn();
        }
    });
}
function switchOffAll() {
    Object.values(state).forEach((horoscope) => {
        if (horoscope.isActive) {
            horoscope.setUILoading()
            horoscope.ipcHandler.sendSwitchOff();
        }
    });
}
loadZodiacButtons();
