const { ipcRenderer } = require("electron");
const ZodiacSign = require('./ZodiacSign')
const { signs } = require('./types')
// todo implement this into a class with reactivity
let state = {};
let wrap;
let activeSignUI;

const toggleSignActive = (sign) => {
    state[sign] = state[sign].toggleActive();
};
ipcRenderer.on("registered-zodiac-click", (event, arg) => {
    if (arg.success) {
        toggleSignActive(arg.sign);
    } else {
        console.log("error", arg.error);
    }
});

const loadZodiacButtons = () => {
    wrap = document.getElementById("zodiac-button-wrap");
    activeSign = document.getElementById('activeSign')
    const buttons = signs.map((sign) => {
        // create activeSigns list
        const listElement = document.createElement('li')
        listElement.id = `ui-node-${sign}`
        listElement.innerText = sign
        listElement.classList.add('ui-node')
        activeSign.appendChild(listElement)
        state[sign] = new ZodiacSign(sign, listElement);
        // create buttons
        wrap.appendChild(state[sign].node);
        return state[sign].node;
    });
    return buttons;
};
function switchOffAll() {
    Object.values(state).forEach(horoscope => {
    })
}
loadZodiacButtons();
