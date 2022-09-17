/* 
* if changing any of its value, update on clinet side as well
*/

const MAX_LENGTH = {
  BEANS_LABEL: 40,
  BEANS_ALTITUDE: 60,
  BEANS_HARVEST_PERIOD: 60,
  RANGES_LABEL: 30,
  RANGES_DEFINITION: 400,
  COMMON_MEMO: 400,
}

const MAX_NUMBER = {
  BEANS_ROAST_LEVEL: 100.0,
  BEANS_GRADE: 100.0,
  RECIPES_GRIND_SIZE: 100.0,
  RECIPES_WATER_WEIGHT: 10000.0,
  RECIPES_GROUNDS_WEIGHT: 10000.0,
  RECIPES_YIELD_WEIGHT: 10000.0,
  RECIPES_TOTAL_RATE: 100.0,
  RECIPES_TDS: 20.0,
  PARATES_RATE: 10.0,
}

const MAX_TEMP = {
  CELCIUS: 100.0,
  FAHRENHEIT: 212.0,
  KELVIN: 373.15
}

const MAX_COUNT = {
  BEANS: {
    BLEND: 5,
    ROASTER: 5, 
    ORIGIN: 5,
    VARIETY: 5,
    FARM: 5,
    PROCESS: 5,
    AROMA: 20,
  },
  RECIPE: {
    PALATE: 20,
  }
}

const USER_TYPE = {
  TRIAL: {
    KEY: 'TRIAL',
    MAX_CAPACITY_IN_MB: 0.10, // 100kb
  },
  BASIC: {
    KEY: 'BASIC',
    MAX_CAPACITY_IN_MB: 100,
  },
  PREMIUM: {
    KEY: 'PREMIUM',
    MAX_CAPACITY_IN_MB: null,
  }
}

module.exports = {
  MAX_LENGTH,
  MAX_NUMBER,
  MAX_TEMP,
  MAX_COUNT,
  USER_TYPE,
}