#ifndef ZODIAC_H
#define ZODIAC_H

#include <string>

/* Zodiac IDs */
typedef enum Zodiac_t {
	ZOD_ALL,
	ZOD_OX,
	ZOD_TIGER,
	ZOD_RABBIT,
	ZOD_DRAGON,
	ZOD_SNAKE,
	ZOD_HORSE,
	ZOD_GOAT,
	ZOD_MONKE,
	ZOD_COCK,
	ZOD_DOG,
	ZOD_PIG,
	ZOD_RAT,
} Zodiac_t;

/* Zodiac name and ID pair */
typedef struct Zodiac {
	Zodiac_t id;
	std::string name;
} Zodiac;

/* List of zodiac pairs */
const Zodiac zodiacs[13] = {
	{ZOD_ALL, "ALL"},
	{ZOD_OX, "OX"},
	{ZOD_TIGER, "TIGER"},
	{ZOD_RABBIT, "RABBIT"},
	{ZOD_DRAGON, "DRAGON"},
	{ZOD_SNAKE, "SNAKE"},
	{ZOD_HORSE, "HORSE"},
	{ZOD_GOAT, "GOAT"},
	{ZOD_MONKE, "MONKEY"},
	{ZOD_COCK, "ROOSTER"},
	{ZOD_DOG, "DOG"},
	{ZOD_PIG, "PIG"},
	{ZOD_RAT, "RAT"},
};

#endif // ZODIAC_H