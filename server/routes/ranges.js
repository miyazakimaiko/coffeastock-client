require("dotenv").config();
const db = require("../db");
const { validationResult } = require('express-validator');
const { rangeItemValidator } = require("../utils/validators");
const { reorderRangeListItems } = require("../helper/reorderRangeItems");
const { 
  getGetRangeBaseQuery, 
  getGetNextIdBaseQuery,
  getUpdateNextIdBaseQuery,
  getInsertRangeBaseQuery,
  getDeleteRangeBaseQuery,
  getFindEntryByIdBaseQuery
} = require("../utils/baseQueries");
const { reorderRangeItems } = require("../helper/reorderRangeItems");
const { CustomException } = require('../utils/customExcetions');

module.exports = (app) => {
  const endpoint = process.env.API_ENDPOINT;

  // Create custom ranges for a user
  app.post(endpoint + "/user/:userid", async (req, res, next) => {
    try {
      const existingUser = await db.query(`SELECT * FROM USERS WHERE user_id = $1`, [req.params.userid])
      if (existingUser.rows.length !== 0) {
        CustomException(409, "This user already has a row.")
      }

      await db.query(`
        INSERT INTO
        USERS (
          user_id,
          origin_range,
          farm_range, 
          variety_range, 
          process_range, 
          roaster_range, 
          method_range, 
          water_range, 
          grinder_range,
          palate_range,
          aroma_range
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *`,
        [
          req.params.userid,
          JSON.stringify(req.body.origin_range), 
          JSON.stringify(req.body.farm_range), 
          JSON.stringify(req.body.variety_range), 
          JSON.stringify(req.body.process_range), 
          JSON.stringify(req.body.roaster_range), 
          JSON.stringify(req.body.method_range), 
          JSON.stringify(req.body.water_range), 
          JSON.stringify(req.body.grinder_range),
          JSON.stringify(req.body.palate_range),
          JSON.stringify(req.body.aroma_range)
        ]
      );
      res.status(200).json('User ranges are set.');

    } catch (error) {
      next(error);
    }
  });

  // Get all custom range of a user
  app.get(endpoint + "/user/:userid/ranges", async (req, res, next) => {
    try {
      const results = await db.query(`
      SELECT
        origin_range,
        farm_range,
        variety_range,
        process_range,
        roaster_range,
        method_range,
        grinder_range,
        water_range,
        palate_range,
        aroma_range
      FROM users WHERE user_id = $1`, 
      [req.params.userid]);

      if(results.rows.length === 0) {
        CustomException(404, "Not Found")
      }
      const rangeItemsList = results.rows[0];
      const orderedRangeList = reorderRangeListItems(rangeItemsList)
      res.status(200).json(orderedRangeList);

    } catch (error) {
      next(error);
    }
  });

  // Get specified range
  app.get(endpoint + "/user/:userid/range/:rangename", async (req, res, next) => {
    const baseQuery = getGetRangeBaseQuery(req.params.rangename)
    try {
      const results = await db.query(baseQuery, [req.params.userid]);
      const rangeItems = results['rows'][0]['items']
      const orderedRange = reorderRangeItems(rangeItems)
      res.status(200).json(orderedRange);
    } catch (error) { next(error); }
  });

  // Find a specified entry
  app.get(endpoint + "/user/:userid/range/:rangename/:id", async (req, res, next) => {
    let found = false;
    const baseQuery = getFindEntryByIdBaseQuery(req.params.rangename);
    try {
      const results = await db.query(baseQuery, [req.params.userid]);
      results.rows.forEach(entry => {
        if (entry['id'] === req.params.id) found = true;
      });
      res.status(200).json(found);
    } catch (error) { next(error); }
  });

  // Add new entry in the specified range 
  app.post(endpoint + "/user/:userid/range/:rangename", 
  rangeItemValidator,
  async (req, res, next) => {

    try {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        CustomException(422, errors.array()[0]['msg'])
      }
  
      const baseQuery = getGetRangeBaseQuery(req.params.rangename);
      const range = await db.query(baseQuery, [req.params.userid]);
      const rangeItems = range.rows[0].items;
      let uniqueName = true;

      for (const key of Object.keys(rangeItems)) {
        if (rangeItems[key].label === req.body.label) {
          uniqueName = false;
        }
      }

      if (!uniqueName) {
        CustomException(422, 'An entry with the same name already exists.')
      } 
      else {
        await db.query('BEGIN')

        // get the ID of the last entry to create new ID
        const bqGetNextId = getGetNextIdBaseQuery(req.params.rangename)
        const idResult = await db.query(bqGetNextId, [req.params.userid]);
        const newid = idResult.rows[0].nextid;

        if (parseInt(newid) > 150) {
          CustomException(422, 'Failed to add due to the maximum number of entries.')
        }

        // Update the next_id
        const bqUpdateNextId = getUpdateNextIdBaseQuery(req.params.rangename)
        await db.query(bqUpdateNextId, [newid + 1, req.params.userid]);

        // Insert new entry
        const newData = {}
        newData[newid] = {...req.body, value: newid, inUse: 0}
        const bqInsertRange = getInsertRangeBaseQuery(req.params.rangename)
        const result = await db.query(bqInsertRange,[newData, req.params.userid]);
        
        await db.query('COMMIT')

        res.status(200).json(result.rows[0][req.params.rangename + '_range']['items']);
      }
    } catch (error) {
      next(error);
    }
  }); 

  // Edit an entry in a specified range 
  app.post(endpoint + "/user/:userid/range/:rangename/:id", 
  rangeItemValidator,
  async (req, res, next) => {

    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        CustomException(422, errors.array()[0]['msg'])
      }

      // Ensure the entry exists
      let entryExists = false;
      const bqFindEntry = getFindEntryByIdBaseQuery(req.params.rangename);
      const results = await db.query(bqFindEntry, [req.params.userid]);
      results.rows.forEach(entry => {
        if (entry.id === req.params.id) {
          entryExists = true;
        }
      });
      if (!entryExists) {
        CustomException(500, 'Entry with the ID does not exist.')
      }
      // Validate the uniqueness of the new name
      let uniqueName = true;
      const bqGetRange = getGetRangeBaseQuery(req.params.rangename)
      const data = await db.query(bqGetRange, [req.params.userid]);
      for (const key of Object.keys(data.rows[0]['items'])) {
        if (data.rows[0]['items'][key].label === req.body.label && key !== req.params.id) {
          uniqueName = false;
        }
      }
      if (!uniqueName) {
        CustomException(500, 'An entry with the same name already exists.')
      } 
      else {
        // Insert new entry to overwrite existing one
        const newData = {}
        newData[req.params.id] = req.body
        const bqInsertRange = getInsertRangeBaseQuery(req.params.rangename)
        const result = await db.query(bqInsertRange,[newData, req.params.userid]);

        const range = result.rows[0][req.params.rangename + '_range']['items']
        const reorderedRange = reorderRangeItems(range)
        res.status(200).json(reorderedRange);
      }
    } catch (error) {
      next(error);
    }
  }); 

  // Delete an entry from specified range
  app.post(endpoint + "/user/:userid/range/:rangename/delete/:id", async (req, res, next) => {
    try {
      if (req.body.inUse > 0) {
        CustomException(422, `This entry is tagged with ${req.body.inUse} item(s), therefore cannot be deleted.`)
      }
      const bqDeleteRange = getDeleteRangeBaseQuery(req.params.rangename)
      const result = await db.query(bqDeleteRange, [req.body.value, req.params.userid]);

      res.status(200).json(result.rows[0][req.params.rangename + '_range']['items']);
    } catch (error) {
      next(error)
    }
  });
}