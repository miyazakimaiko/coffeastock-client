const { body } = require('express-validator');
const { MAX_LENGTH, MAX_NUMBER } = require('./constants');
const { CustomException } = require('./customExcetions');

const rangeItemValidator = [
  body('label', 'Invalid Name').escape().isLength({ max: MAX_LENGTH.RANGES_LABEL }).optional({ nullable: false }),
  body('def', 'Invalid Details').escape().isLength({ max: MAX_LENGTH.RANGES_DEFINITION }).optional({ checkFalsy: true })
]

const beanValidator = [
  body('label', 'Invalid Name').not().isEmpty().escape().isLength({ max: MAX_LENGTH.BEANS_LABEL }),
  body('single_origin', 'Invalid Single Origin').not().isEmpty().isBoolean(),
  body('blend_ratio', 'Invalid Blend Ratio').isObject().optional({ checkFalsy: true }),
  body('origin', 'Invalid Origin').isObject({ strict: false }).optional({ checkFalsy: true }),
  body('farm', 'Invalid Farm').isObject({ strict: false }).optional({ checkFalsy: true }),
  body('variety', 'Invalid Variety').isObject({ strict: false }).optional({ checkFalsy: true }),
  body('process', 'Invalid Process').isObject({ strict: false }).optional({ checkFalsy: true }),
  body('roaster', 'Invalid Roaster').isObject({ strict: false }).optional({ checkFalsy: true }),
  body('aroma', 'Invalid Aroma').isObject({ strict: false }).optional({ checkFalsy: true }),
  body('roast_level', 'Invalid Roast Level').isFloat({ min: 0, max: MAX_NUMBER.BEANS_ROAST_LEVEL }).optional({ checkFalsy: true }),
  body('grade', 'Invalid Grade').isFloat({ min: 0, max: MAX_NUMBER.BEANS_GRADE }).optional({ checkFalsy: true }),
  body('roast_date', 'Invalid Roast Date').isDate().optional({ checkFalsy: true }),
  body('memo', 'Invalid Memo').escape().isLength({ max: MAX_LENGTH.COMMON_MEMO }).optional({ checkFalsy: true }),
  body('altitude').escape().isLength({ max: MAX_LENGTH.BEANS_ALTITUDE }).optional({ checkFalsy: true }),
  body('harvest_period').escape().isLength({ max: MAX_LENGTH.BEANS_HARVEST_PERIOD }).optional({ checkFalsy: true }),
]

const recipeValidator = [
  body('brew_date', 'Invalid Brew Date').isDate().optional({ checkFalsy: true }),
  body('grind_size', 'Invalid Grind Size').isFloat({ min: 0 }).optional({ checkFalsy: true }),
  body('grounds_weight', 'Invalid Grounds Weight').isFloat({ min: 0 }).optional({ checkFalsy: true }),
  body('water_weight', 'Invalid Water Weight').isFloat({ min: 0 }).optional({ checkFalsy: true }),
  body('water_temp', 'Invalid Water Temperature').isFloat({ min: 0 }).optional({ checkFalsy: true }),
  body('yield_weight', 'Invalid Yield Weight').isFloat({ min: 0 }).optional({ checkFalsy: true }),
  body('tds', 'Invalid TDS').isFloat({ min: 0 }).optional({ checkFalsy: true }),
  body('palate_rates', 'Invalid Palate Rates').isObject().optional({ checkFalsy: true }),
  body('method', 'Invalid Method').isObject({ strict: false }).optional({ checkFalsy: true }),
  body('grinder', 'Invalid Grinder').isObject({ strict: false }).optional({ checkFalsy: true }),
  body('water', 'Invalid Water').isObject({ strict: false }).optional({ checkFalsy: true }),
  body('memo', 'Invalid Memo').escape().isLength({ max: MAX_LENGTH.COMMON_MEMO }).optional({ checkFalsy: true }),
  body('extraction_time').custom(value => {
    let valid = String(value).match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/);
    if (valid || value === null) {
      return true
    } else {
      CustomException(400, 'Invalid Extraction Time')
    }
  })
]

module.exports = {
  rangeItemValidator,
  beanValidator,
  recipeValidator,
}

