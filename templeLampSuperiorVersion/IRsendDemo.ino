/*
 * IRremote: IRsendDemo - demonstrates sending IR codes with IRsend
 * An IR LED must be connected to Arduino PWM pin 3.
 * Version 0.1 July, 2009
 * Copyright 2009 Ken Shirriff
 * http://arcfn.com
 */

#include <IRremote.h>
#include <WiFi.h>

const char* ssid     = "Bruhh you want some ";
const char* password = "11111111";

WiFiServer server(80);

#define LED_RED   0xF720DF
#define LED_GREEN1   0xF7A05F
#define LED_BLUE1   0xF7609F
#define LED_WHITE   0xF7E01F
#define LED_ORANGE1   0xF710EF
#define LED_ORANGE2   0xF730CF
#define LED_ORANGE3   0xF708F7
#define LED_YELLOW   0xF728D7
#define LED_GREEN2   0xF7B04F
#define LED_BLUE2   0xF78877
#define LED_BLUE3   0xF7A857
#define LED_BLUE4   0xF7906F
#define LED_PURPLE1   0xF7708F
#define LED_PURPLE2   0xF748B7
#define LED_PINK   0xF76897

#define LED_ON    0xF7C03F
#define LED_OFF   0xF740BF
#define LED_SPEEDUP   0xF700FF
#define LED_SPEEDDOWN   0xF7807F
#define LED_FLASH   0xF7D02F
#define LED_STROBE   0xF7F00F
#define LED_FADE   0xF7C837
#define LED_SMOOTH   0xF7E817

byte SEND_PIN = 5;
IRsend irsend(SEND_PIN);


//int RECV_PIN = 14;
//IRrecv irrecv(RECV_PIN);
//decode_results results;

void setup()
{
  pinMode(2,OUTPUT);
  Serial.begin(115200);
//  Serial.println("Enabling IRin2");
//  irrecv.enableIRIn(); // Start the receiver
  delay(10);
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  setCpuFrequencyMhz(80);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  digitalWrite(2,HIGH);
  
  server.begin();
}


void loop() {
//	for (int i = 0; i < 3; i++) {
//		irsend.sendNEC(LED_FLASH, 32); //16236607 //F7C03F 
//    Serial.println("ON");
//    if (irrecv.decode(&results)) {
//      Serial.println(results.value, HEX);
//      irrecv.resume(); // Receive the next value
//    }
//		delay(40);
//	}
//	delay(2000); //2 second delay between each signal burst
// for (int i = 0; i < 3; i++) {
//    irsend.sendNEC(LED_FADE, 32); //16203967 //F740BF
//    Serial.println("OFF");
//    if (irrecv.decode(&results)) {
//      Serial.println(results.value, HEX);
//      irrecv.resume(); // Receive the next value
//    }
//    delay(40);
//  }
//  delay(2000); //2 second delay between each signal burst

  
  WiFiClient client = server.available();   // listen for incoming clients

  if (client) {                             // if you get a client,
    String req = client.readStringUntil('\r');
    client.flush();
    if (req.indexOf("/FADE") != -1){
      irsend.sendNEC(LED_FADE, 32);
      Serial.println("FADE");
    }
    else if (req.indexOf("/STROBE") != -1){
      irsend.sendNEC(LED_STROBE, 32);
      Serial.println("STROBE");
    }
    else if (req.indexOf("/ON") != -1){
      irsend.sendNEC(LED_ON, 32);
      Serial.println("ON");
      digitalWrite(2,HIGH);
    }
    else if (req.indexOf("/OFF") != -1){
      irsend.sendNEC(LED_OFF, 32);
      Serial.println("OFF");
      digitalWrite(2,LOW);
    }
    // close the connection:
    client.stop();
  }

  
}
