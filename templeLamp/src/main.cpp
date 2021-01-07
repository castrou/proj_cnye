#include <Arduino.h>
#include <WiFi.h>
#include <EEPROM.h>

/* Defines and Macros */
#define EEPROM_SIZE		1
#define LINE_STR_SIZE	80

/* Global variables */
int signal = 1;
const char *ssid = "WiFi-ED71-5G";
const char *pwd = "07037368";
WiFiServer server(42069);

/* Functions */
void setup() {
	// Begin functions
	Serial.begin(9600);
	EEPROM.begin(EEPROM_SIZE);

	// Initialisation
	pinMode (LED_BUILTIN, OUTPUT);
	
	// Connect to wifi
	while (WiFi.status() != WL_CONNECTED) {
		Serial.println("Attempting to connect...");
		WiFi.begin(ssid, pwd);
		delay(500);
	}
	
	digitalWrite(LED_BUILTIN, signal);
	Serial.println("aasufhsdghsdg");
	server.begin();
}

void loop() {
	// put your main code here, to run repeatedly:
	WiFiClient client = server.available();   // listen for incoming clients

	if (client) {  
		signal ^= 1;  
		digitalWrite(LED_BUILTIN, signal);
	}
}