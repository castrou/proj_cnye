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
    wrap = document.getElementById("zodiac-button-wrap");
    activeSignUI = document.getElementById("activeSign");
    const buttons = signs.map((sign) => {
        // create activeSigns list

        const listElement = createListElement(sign);
        const buttonElement = createButtonElement(sign);
        const ipcHandler = new IPCRenderHandler(sign);

        activeSignUI.appendChild(listElement);

        const zodiacSign = new ZodiacSign(
            sign,
            listElement,
            buttonElement,
            ipcHandler
        )

        const registerOnEvent = REGISTER_ON.makeName(sign)
        const registerOnHandler = REGISTER_ON.makeHandler(() => {
            zodiacSign.toggleUIOn()
        })
        const registerOffEvent = REGISTER_OFF.makeName(sign)
        const registerOffHandler = REGISTER_OFF.makeHandler(() => {
            zodiacSign.toggleUIOff()
        })

        const regsiterColorEvent = REGISTER_COLOR_SET.makeName(sign)
        const registerColorHandler = REGISTER_COLOR_SET.makeHandler((args) => {
            zodiacSign.setColor(args.color)
        })

        zodiacSign.ipcHandler.registerHandler(registerOnEvent, registerOnHandler)
        zodiacSign.ipcHandler.registerHandler(registerOffEvent, registerOffHandler)
        zodiacSign.ipcHandler.registerHandler(regsiterColorEvent, registerColorHandler)

        state[sign] = zodiacSign;

        // create buttons
        wrap.appendChild(buttonElement);
        return zodiacSign.node;
    });
    return buttons;
};

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
