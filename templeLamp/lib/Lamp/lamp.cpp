#include "lamp.h"
#include "IRremote.h"

#define CMD_CNT 9       // Number of commands
#define COL_CNT 15      // Number of colours

/* Command string and IR signal pair */
typedef struct Command {
    std::string cmd;
    LedMode_t irVal;
} Command;

/* Colour string and IR signal pair */
typedef struct Colour {
    std::string col;
    LedCol_t irVal;
} Colour;

/* List of colour pairs */
Colour colours[COL_CNT] = {
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

/* List of command pairs */
Command commands[CMD_CNT] = {
    {"COLOUR",  (LedMode_t) 0},
    {"MODE-ON",  LED_ON},
    {"MODE-OFF",  LED_OFF},
    {"MODE-SPEEDUP",  LED_SPEEDUP},
    {"MODE-SPEEDDOWN",  LED_SPEEDDOWN},
    {"MODE-FLASH",  LED_FLASH},
    {"MODE-STROBE",  LED_STROBE},
    {"MODE-FADE",  LED_FADE},
    {"MODE-SMOOTH",  LED_SMOOTH},
};

/* Lamp object constructor */
Lamp::Lamp() { 
    irsend.timerPwmPin = 5;
}

/** @brief: Sets LED colour using given signal val
 * @param colour: IR signal of associated colour
 * @return: None
 */
void Lamp::led_set_col(LedCol_t colour) {
    irsend.sendNEC(colour, 32);
}

/** @brief: Sets mode using given signal val
 * @param mode: IR signal of associated mode
 * @return: None
 */
void Lamp::led_mode(LedMode_t mode) {
    irsend.sendNEC(mode, 32);
}

/** @brief: Checks string to see if it starts with Lamp's zodiac name
 * @param zodStr: String to be checked
 * @return: true if Lamp's zodiac; false otherwise
 */
bool Lamp::isMyZodiac(std::string zodStr) {
    int isAll, isMine;
    isMine = !(zodStr.compare(0, zodiacs[zodId].name.length(), zodiacs[zodId].name));
    isAll = !(zodStr.compare(0, zodiacs[ZOD_ALL].name.length(), zodiacs[ZOD_ALL].name));
    return (isMine || isAll);
}

/** @brief: Sets LED to color mentioned in 'COLOUR-XXXXXXX' command string
 * @param colCmd: 'COLOUR-XXXXXXX' command string
 * @return: None
 */
void Lamp::process_col(std::string colCmd) {
    std::string col;

    /* Trim 'COLOR-' command part */
    int tokenPos = colCmd.find_first_of('-', 0);
    col = colCmd.substr(tokenPos + 1, colCmd.length() - tokenPos);

    /* Check each colour */
    for (int i = 0; i < COL_CNT; i++) {
        if (col.compare(0, colours[i].col.length(), colours[i].col)) continue; // If different: skip
        led_set_col(colours[i].irVal);
    }

}

/** @brief: Executes server command
 * @param rxStr: string received from server
 * @return: None
 */
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