require("dotenv").config();
const db = require("../db");

module.exports = (app) => {
  const endpoint = process.env.API_ENDPOINT;

  app.get(endpoint + "/units", async (req, res, next) => {
    try {
      const result = await db.query(`
        SELECT 'solid' AS type, * FROM unit_solid_weight
        UNION 
        SELECT 'fluid' AS type, * FROM unit_fluid_weight
        UNION 
        SELECT 'temp' AS type, * FROM unit_temperature
        ORDER BY type, id
      `);

      const resultObj = {};
      for (const unit of result.rows) {
        resultObj[unit.type + unit.id] = unit;
      }
      res.status(200).json(resultObj);

    } catch (err) {
      next(err);
    }
  });
}