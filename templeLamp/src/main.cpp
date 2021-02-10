#include <Arduino.h>
#include <WiFi.h>
#include <EEPROM.h>

#include "zodiac.h"
#include "lamp.h"

/* Debugging and Setup */
#define DEBUG			1			// Enables heartbeat
#define SETUP			0			// 1: Writes THIS_ZODIAC to EEPROM
#define THIS_ZODIAC		ZOD_PIG		// Zodiac of node to be flashed

/* Defines and Macros */
#define LINE_STR_SIZE	80

/* Global variables */
int signal = 0;		// Onboard LED signal
int status;			// WiFi connection status
int eepVal;			// EEPROM value
const char *ssid = "aaaaa";
const char *pwd = "11111111";

IPAddress server(192,168,0,172);	// Socket server IP
Lamp lamp;						// Object for this lamp

char path[] = "/";				// I'm gonna be real idk what this is for
char host[] = "192.168.0.172";	// Should match server IP

/* Functions */
void setup() {
	/* Initialisation */
	Serial.begin(9600);
	EEPROM.begin(1);
	pinMode (LED_BUILTIN, OUTPUT);	

	/* Zodiac Setup/Check */
	#if SETUP == 1
	lamp.zodId = THIS_ZODIAC;
	EEPROM.write(0, lamp.zodId);
	EEPROM.commit();
	Serial.print("[EEPROM] Setting zodiac: ");
	Serial.println(zodiacs[THIS_ZODIAC].name.c_str());
	#endif //SETUP==1
	// Check EEPROM memory for zodiac
	if ((eepVal = EEPROM.read(0)) >= ZOD_OX && eepVal <= ZOD_RAT) {
		lamp.zodId = (Zodiac_t) eepVal;
		Serial.print("[EEPROM] Fetched zodiac: ");
		Serial.println(zodiacs[eepVal].name.c_str());
	} else { // For non-zodiac values
		Serial.println("[EEPROM] Node needs to be initialised");
		while (true); // Hang
	}
	
	WiFi.begin(ssid, pwd);

	while (WiFi.status() != WL_CONNECTED) {
		delay(500);
		Serial.print(".");
	}
	// signal ^= 1;
	// digitalWrite(LED_BUILTIN, signal); // Static on when Wifi connected
	Serial.println("[WiFi] WiFi Connection Established");

	// Connect to web socket server
	if ((status = lamp.wfClient.connect(server, 42069))) {
		Serial.println("[WiFiClient] Connected to server");
		lamp.wsClient.path = path;
		lamp.wsClient.host = host;
		/* Try handshake */
		if (lamp.wsClient.handshake(lamp.wfClient)) {
			Serial.println("[WebSocketClient] Handshake succesfull");
			status = 1;
		} else {
			Serial.println("[WebSocketClient] Handshake failed");
			status = 0;
		}
	}
}

void loop() {
	std::string recv;
	String buffer;
	bool relevantRx;
	 /* If connected to WiFi and Web Socket Server */
	if (status) {
		// Reset
		relevantRx = false;
		recv.clear();
		/* Get Data from Server */
		if (lamp.wfClient.connected()) {
			lamp.wsClient.getData(buffer);
		}
		/* Process Data */
		if (buffer.length() > 1) { // Make sure there is data
			Serial.print("RECV: "); 
			Serial.println(buffer);
			recv = buffer.c_str(); // Transfer data from String to std::string

			/* Check zodiac */
			if (!(recv.compare(0, zodiacs[0].name.length(), 
					zodiacs[0].name))) {
				//If ALL then relevant
				relevantRx = true;
			}
			else if (!(recv.compare(0, zodiacs[lamp.zodId].name.length(), 
					zodiacs[lamp.zodId].name))) {
				// If same zodiac then relevant
				relevantRx = true;
			}

			/* Process command if relevant */
			if (relevantRx) {
				Serial.println("Processing command...");
				lamp.process_cmd(recv);
			} else {
				Serial.println("Ignoring.");
			}
		}

		/* Heartbeat */
		#if DEBUG == 1
		signal ^= 1;
		digitalWrite(LED_BUILTIN, signal); // a lil heartbeat so we know it ok (probs delet for final)
		#endif // DEBUG==1
		delay(50);
	}

	delay(100);
}