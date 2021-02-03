#ifndef LAMP_H
#define LAMP_H

#include <WiFi.h>
#include "IRremote.h"
#include "../../include/zodiac.h"

#define IR_PIN      5

typedef enum LedCol_t {
    LED_RED=0xF720DF,
    LED_GREEN1=0xF7A05F,
    LED_BLUE1=0xF7609F,
    LED_WHITE=0xF7E01F,
    LED_ORANGE1=0xF710EF,
    LED_ORANGE2=0xF730CF,
    LED_ORANGE3=0xF708F7,
    LED_YELLOW=0xF728D7,
    LED_GREEN2=0xF7B04F,
    LED_BLUE2=0xF78877,
    LED_BLUE3=0xF7A857,
    LED_BLUE4=0xF7906F,
    LED_PURPLE1=0xF7708F,
    LED_PURPLE2=0xF748B7,
    LED_PINK=0xF76897,
} LedCol_t;

 
typedef enum LedMode_t {
    LED_ON=0xF7C03F,
    LED_OFF=0xF740BF,
    LED_SPEEDUP=0xF700FF,
    LED_SPEEDDOWN=0xF7807F,
    LED_FLASH=0xF7D02F,
    LED_STROBE=0xF7F00F,
    LED_FADE=0xF7C837,
    LED_SMOOTH=0xF7E817,
} LedMode_t;

class Lamp {
	public:
        // Constructor
        Lamp ();
        // Public Variables
		WiFiClient client;
		Zodiac_t zodiac;
        // Public functions
		void led_set_col(LedCol_t colour);
        void led_mode(LedMode_t mode);

	private:
        // Private variables
        IRsend irsend;
        // Private functions
};


#endif // LAMP_H