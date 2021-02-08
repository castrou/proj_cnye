#include "lamp.h"
#include "IRremote.h"

#define CMD_CNT 9
#define COL_CNT 15

typedef struct Command {
    std::string cmd;
    LedMode_t irVal;
} Command;

typedef struct Color {
    std::string col;
    LedCol_t irVal;
} Color;

Color colors[COL_CNT] = {
    {"RED", LED_RED},
    {"GREEN1", LED_GREEN1},
    {"BLUE1", LED_BLUE1},
    {"WHITE", LED_WHITE},
    {"ORANGE1", LED_ORANGE1},
    {"ORANGE2", LED_ORANGE2},
    {"ORANGE3", LED_ORANGE3},
    {"YELLOW", LED_YELLOW},
    {"GREEN2", LED_GREEN2},
    {"BLUE2", LED_BLUE2},
    {"BLUE3", LED_BLUE3},
    {"BLUE4", LED_BLUE4},
    {"PURPLE1", LED_PURPLE1},
    {"PURPLE2", LED_PURPLE2},
    {"PINK", LED_PINK},  
};

Command commands[CMD_CNT] = {
    {"COLOR",  (LedMode_t) 0},
    {"ON",  LED_ON},
    {"OFF",  LED_OFF},
    {"SPEEDUP",  LED_SPEEDUP},
    {"SPEEDDOWN",  LED_SPEEDDOWN},
    {"FLASH",  LED_FLASH},
    {"STROBE",  LED_STROBE},
    {"FADE",  LED_FADE},
    {"SMOOTH",  LED_SMOOTH},
};

Lamp::Lamp() { 
    irsend.timerPwmPin = 5;
}

void Lamp::led_set_col(LedCol_t colour) {
    irsend.sendNEC(colour, 32);
}

void Lamp::led_mode(LedMode_t mode) {
    irsend.sendNEC(mode, 32);
}

bool Lamp::isMyZodiac(std::string zodStr) {
    int isAll, isMine;
    isMine = !(zodStr.compare(0, zodiacs[zodId].name.length(), zodiacs[zodId].name));
    isAll = !(zodStr.compare(0, zodiacs[ZOD_ALL].name.length(), zodiacs[ZOD_ALL].name));
    return (isMine || isAll);
}

void Lamp::process_col(std::string colCmd) {
    std::string col;

    /* Trim 'COLOR-' command part */
    int tokenPos = colCmd.find_first_of('-', 0);
    col = colCmd.substr(tokenPos + 1, colCmd.length() - tokenPos);

    /* Check each colour */
    for (int i = 0; i < CMD_CNT; i++) {
        if (col.compare(0, colors[i].col.length(), colors[i].col)) continue;
        led_set_col(colors[i].irVal);
    }

}

void Lamp::process_cmd(std::string rxStr) {

    // Get rid of zodiac part
    std::string cmd = rxStr.substr(rxStr.find_first_of('-') + 1, rxStr.length());
    // Check each command for what it be
    for (int i = 0; i < CMD_CNT; i++) {
        if (cmd.compare(0, commands[i].cmd.length(), commands[i].cmd)) continue; // if they not the same
        if (commands[i].irVal) led_mode(commands[i].irVal); // modes have IR values - colors do not
        else process_col(cmd);
    }
}