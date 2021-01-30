#include "lamp.h"
#include "IRremote.h"

Lamp::Lamp() { 
    irsend.timerPwmPin = 5;
}
void Lamp::led_set_col(LedCol_t colour) {
    irsend.sendNEC(colour, 32);
}

void Lamp::led_mode(LedMode_t mode) {
    irsend.sendNEC(mode, 32);
}