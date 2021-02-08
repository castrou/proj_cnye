#include <Arduino.h>
#include <WiFi.h>
#include <EEPROM.h>

#include "zodiac.h"
#include "lamp.h"

/* Debugging and Setup */
#define SETUP			0
#define THIS_ZODIAC		ZOD_OX

/* Defines and Macros */
#define LINE_STR_SIZE	80


/* Global variables */
int signal = 1;
int status;
int eepVal;
const char *ssid = "AndroidAP3888";
const char *pwd = "bpep0558";
char recv[LINE_STR_SIZE];

IPAddress server(192,168,43,33);
Lamp lamp;

char path[] = "/";
char host[] = "192.168.43.33";

/* Functions */
std::string client_read(WiFiClient *rxClient) {
	
	std::string rx;
	char c;
	rx.clear();

	while (rxClient->connected()) {
		do {
			c = rxClient->read();
			if (c == '\0') continue;
			if (c >= 255) continue;
			if (c != '\r' && c != '\n' && c < ((int) 32)) continue;
			rx.push_back(c);
		} while (c != '\n');

		Serial.print("RECV: ");
		Serial.println(rx.c_str());
		break;
	}

	return rx;
}

void setup() {
	// Begin functions
	Serial.begin(9600);
	EEPROM.begin(1);

	delay(2000);

	/* Zodiac Setup/Check */
	#if SETUP == 1
	lamp.zodId = THIS_ZODIAC;
	EEPROM.write(0, lamp.zodId);
	EEPROM.commit();
	Serial.println("Setting zodiac: OX");
	Serial.println(eepVal);
	#endif //SETUP
	
	// Check EEPROM memory for zodiac
	if ((eepVal = EEPROM.read(0)) >= ZOD_OX && eepVal <= ZOD_RAT) {
		lamp.zodId = (Zodiac_t) eepVal;
		Serial.print("Fetched zodiac: ");
		Serial.println(zodiacs[eepVal].name.c_str());
	} else {
		Serial.println("Node needs to be initialised");
		while (true);
	}

	// Initialisation
	pinMode (LED_BUILTIN, OUTPUT);			
	
	// Connect to wifi
	while (WiFi.status() != WL_CONNECTED) {
		WiFi.begin(ssid, pwd);
		Serial.println("Attempting to connect...");
		// delay(500);
	}
	digitalWrite(LED_BUILTIN, signal);
	Serial.println("WiFi Connection Established");

	// Connect to web socket server
	if ((status = lamp.wfClient.connect(server, 42069))) {
		Serial.println("Connected to server");
		lamp.wsClient.path = path;
		lamp.wsClient.host = host;
		/* Try handshake */
		if (lamp.wsClient.handshake(lamp.wfClient)) {
			Serial.println("Handshake succesfull");
			status = 1;
		} else {
			Serial.println("Handshake failed");
			status = 0;
		}
	}
}

void loop() {
	std::string recv;
	String buffer;
	bool relevantRx;

	if (status) {
		// Reset
		relevantRx = false;
		recv.clear();

		/* Get Zodiac */
		if (lamp.wfClient.connected()) {
			lamp.wsClient.getData(buffer);
			Serial.print("Buffer: ");
			Serial.println(buffer);
			recv = buffer.c_str();
		}
		// while (lamp.wfClient.available()) {
		// 	// recv = client_read(&(lamp.client));
		// 	if (lamp.isMyZodiac(recv)) relevantRx = true; // is it our zod?
		// 	else relevantRx = false;	// no
		// }

		/* Get command */
		if (relevantRx && recv.length() > 1) {
			lamp.process_cmd(recv);
		}
		
		signal ^= 1;
		digitalWrite(LED_BUILTIN, signal); // a lil heartbeat so we know it ok (probs delet for final)
		delay(50);
	}

	delay(100);
}