#include <Arduino.h>
#include <WiFi.h>
#include <EEPROM.h>

#include "zodiac.h"
#include "lamp.h"

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
	// Check EEPROM memory for zodiac
	if ((eepVal = EEPROM.read(0)) >= ZOD_OX && eepVal <= ZOD_RAT) {
		lamp.zodId = (Zodiac_t) eepVal;
		Serial.print("Fetched zodiac: ");
		Serial.println(zodiacs[eepVal].name.c_str());
	} else {
		lamp.zodId = ZOD_OX;
		EEPROM.write(0, lamp.zodId);
		EEPROM.commit();
		Serial.println("Setting zodiac: OX");
		Serial.println(eepVal);
	}

	// Initialisation
	pinMode (LED_BUILTIN, OUTPUT);			
	
	// Connect to wifi
	while (WiFi.status() != WL_CONNECTED) {
		Serial.println("Attempting to connect...");
		WiFi.begin(ssid, pwd);
		delay(500);
	}
	
	digitalWrite(LED_BUILTIN, signal);
	Serial.println("WiFi Connection Established");
	if ((status = lamp.client.connect(server, 42069))) {
		Serial.println("Connected to server");
	}
}

void loop() {
	std::string recv;
	char c;
	bool relevantRx;

	if (status) {
		// Reset
		relevantRx = false;
		recv.clear();

		/* Get Zodiac */
		while (lamp.client.available()) {
			recv = client_read(&(lamp.client));
			if (lamp.isMyZodiac(recv)) relevantRx = true; // is it our zod?
			else relevantRx = false;	// no
		}
		/* Get command */
		if (relevantRx) {
			lamp.process_cmd(recv);
		}
		
		digitalWrite(LED_BUILTIN, signal); // a lil heartbeat so we know it ok (probs delet for final)
		delay(50);
	}

	delay(100);
}