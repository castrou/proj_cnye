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
void setup() {
	// Begin functions
	Serial.begin(9600);
	EEPROM.begin(1);

	delay(2000);
	// Check EEPROM memory for zodiac
	if ((eepVal = EEPROM.read(0)) >= ZOD_OX && eepVal <= ZOD_RAT) {
		lamp.zodiac = (Zodiac_t) eepVal;
		Serial.print("Fetched zodiac: ");
		Serial.println(eepVal);
	} else {
		lamp.zodiac = ZOD_OX;
		EEPROM.write(0, lamp.zodiac);
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

	if (status) {  
		signal ^= 1;  
		if (lamp.client.readBytes(recv, LINE_STR_SIZE)) {
			Serial.println(recv);
		}
		
		digitalWrite(LED_BUILTIN, signal);
		delay(50);
	}
	Serial.print("Zodiac: ");
	Serial.println(EEPROM.read(0));
	delay(100);
}