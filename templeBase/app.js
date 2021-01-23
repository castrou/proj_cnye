const ZodiacSign = require('./ZodiacSign')
const { signs } = require('./types')

let state = {};
let wrap;
let activeSignUI;

const loadZodiacButtons = () => {
    wrap = document.getElementById("zodiac-button-wrap");
    activeSignUI = document.getElementById('activeSign')
    const buttons = signs.map((sign) => {
        // create activeSigns list
        const listElement = document.createElement('li')
        listElement.id = `ui-node-${sign}`
        listElement.innerText = sign
        listElement.classList.add('ui-node')
        activeSignUI.appendChild(listElement)
        state[sign] = new ZodiacSign(sign, listElement);
        // create buttons
        wrap.appendChild(state[sign].node);
        return state[sign].node;
    });
    return buttons;
};

function switchOnAll() {
    Object.values(state).forEach(horoscope => {
        if(!horoscope.isActive) {
            horoscope.sendSwitchOn()
        }
    })
}
function switchOffAll() {
    Object.values(state).forEach(horoscope => {
        if(horoscope.isActive) {
            horoscope.sendSwitchOff()
        }
    })
}
loadZodiacButtons();