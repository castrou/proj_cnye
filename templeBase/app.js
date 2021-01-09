const { ipcRenderer } = require("electron");
const ZodiacSign = require('./ZodiacSign')
const { signs } = require('./types')
// todo implement this into a class with reactivity
let state = {};
let wrap;
let activeSignUI;

const rerenderActiveSigns = () => {
    if (!activeSignUI) {
        activeSignUI = document.getElementById("activeSign");
    }
    activeSignUI.innerText = Object.values(state)
        .filter((sign) => sign.isActive)
        .map((activeSign) => activeSign.sign)
        .join(", ");
};

const toggleSignActive = (sign) => {
    state[sign] = state[sign].toggleActive();
    rerenderActiveSigns();
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
    const buttons = signs.map((sign) => {
        state[sign] = new ZodiacSign(sign);
        wrap.appendChild(state[sign].node);
        return state[sign].node;
    });
    return buttons;
};
loadZodiacButtons();
