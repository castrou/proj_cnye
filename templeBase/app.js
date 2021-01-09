const { ipcRenderer } = require("electron");

// todo implement this into a class with reactivity 
const signs = [
    "Rat",
    "Ox",
    "Tiger",
    "Rabbit",
    "Dragon",
    "Snake",
    "Horse",
    "Sheep",
    "Monkey",
    "Rooster",
    "Dog",
    "Pig",
];
const STATUS_CLASSES = {
	nodeselect: {
		root: 'nodeselect',
		offline: 'offline',
		online: 'online',
		loading: 'loading'
	}
}
let activeSigns = {};
let wrap;
let activeSignUI;
const rerenderActiveSigns = () => {
    if (!activeSignUI) {
        activeSignUI = document.getElementById("activeSign");
    }
    activeSignUI.innerText = Object.entries(
        activeSigns
    ).filter((item) => {
		const [ _, isActive ] = item
		return isActive
	}).map(activeSign => activeSign[0]).join(', ');
};
const toggleSignActive = (sign) => {
	const button = document.getElementById(`node-${sign}`)
	activeSigns[sign] = !activeSigns[sign];
	button.classList.remove(STATUS_CLASSES.nodeselect.loading)
	if(activeSigns[sign]) {
		button.classList.add(STATUS_CLASSES.nodeselect.online)
		button.classList.remove(STATUS_CLASSES.nodeselect.offline)
	} else {
		button.classList.add(STATUS_CLASSES.nodeselect.offline)
		button.classList.remove(STATUS_CLASSES.nodeselect.online)
	}
	rerenderActiveSigns();
}
ipcRenderer.on('registered-zodiac-click', (event, arg) => {
	if(arg.success) {
		toggleSignActive(arg.sign)
	} else {
		console.log('error', arg.error)
	}
})
const loadZodiacButtons = () => {
    wrap = document.getElementById("zodiac-button-wrap");
    const buttons = signs.map((sign) => {
		const button = document.createElement("button");

        activeSigns[sign] = false;

        button.onclick = function () {
			ipcRenderer.send("zodiac-clicked", sign);
			button.classList.add(STATUS_CLASSES.nodeselect.loading);
		 };
        button.innerText = sign;
        button.classList.add(STATUS_CLASSES.nodeselect.root);
		button.classList.add(STATUS_CLASSES.nodeselect.offline);
		button.id = `node-${sign}`
        wrap.appendChild(button);
        return button;
    });
    return buttons;
};
loadZodiacButtons();
