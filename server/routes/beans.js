require("dotenv").config();
const db = require("../db");
const { validationResult } = require('express-validator');
const { beanValidator } = require("../utils/validators");
const { CustomException } = require("../utils/customExcetions");
const { getUniqueItemInFirstArgArray } = require("../helper/compareArrays");
const { getIncrementCountInUseBaseQuery, 
        getDecrementCountInUseBaseQuery } = require("../utils/baseQueries");
const { DatabaseError } = require("pg");

const beanRangeKeys = ['origin', 'farm', 'variety', 'process', 'roaster', 'aroma']

module.exports = (app) => {
  const endpoint = process.env.API_ENDPOINT;

  // Get all beans of a user
  app.get(endpoint + "/user/:userid/beans", 
  async (req, res, next) => {
    try {
      const results = await db.query(`
      SELECT * FROM beans WHERE user_id = $1`, 
      [req.params.userid]);

      const result = results.rows.reduce((current, bean) => {
        return {...current, [bean.bean_id]: {...bean, value: bean.bean_id } }
      }, {}) 
      
      res.status(200).json(result);
      
    } catch (error) {
      next(error);
    }
  });

  // Get a bean of a user
  app.get(endpoint + "/user/:userid/bean/:beanid", 
  async (req, res, next) => {
    try {
      const results = await db.query(`
      SELECT * FROM beans WHERE user_id = $1 AND bean_id = $2`, 
      [req.params.userid, req.params.beanid]);
      res.status(200).json(results.rows[0]);
      
    } catch (error) {
      next(error);
    }
  });

  // create a bean of a user
  app.post(endpoint + "/user/:userid/bean", 
    beanValidator,
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        CustomException(422, errors.array()[0]['msg'])
      }

      try {
        await db.query('BEGIN')

        for await (const rangeKey of beanRangeKeys) {
          const rangeItemIds = req.body[rangeKey]
          if (rangeItemIds.length > 0) {
            const baseQuery = getIncrementCountInUseBaseQuery(rangeKey, rangeItemIds);
            await db.query(baseQuery, [req.params.userid])
          }
        }

        const blendBeanIdList = Object.keys(req.body.blend_ratio)
        const blendBeanId1 = blendBeanIdList[0] ? blendBeanIdList[0] : null;
        const blendBeanId2 = blendBeanIdList[1] ? blendBeanIdList[1] : null;
        const blendBeanId3 = blendBeanIdList[2] ? blendBeanIdList[2] : null;
        const blendBeanId4 = blendBeanIdList[3] ? blendBeanIdList[3] : null;
        const blendBeanId5 = blendBeanIdList[4] ? blendBeanIdList[4] : null;
        
        const insertBeanResult = await db.query(
          `INSERT INTO BEANS (
            user_id,
            label,
            single_origin,
            blend_ratio,
            blend_bean_id_1,
            blend_bean_id_2,
            blend_bean_id_3,
            blend_bean_id_4,
            blend_bean_id_5,    
            origin, 
            farm, 
            variety, 
            process, 
            altitude,
            grade,
            harvest_period,
            roaster,
            roast_level,
            roast_date,
            aroma,
            memo,
            recipe_seq
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
          RETURNING *
          `,
          [
            req.params.userid,         // $1
            req.body.label,            // $2
            req.body.single_origin,    // $3
            req.body.blend_ratio,      // $4
            blendBeanId1,              // $5
            blendBeanId2,              // $6
            blendBeanId3,              // $7
            blendBeanId4,              // $8
            blendBeanId5,              // $9
            req.body.origin,           // $10
            req.body.farm,             // $11
            req.body.variety,          // $12
            req.body.process,          // $13
            req.body.altitude,         // $14
            req.body.grade,            // $15
            req.body.harvest_period,   // $16
            req.body.roaster,          // $17
            req.body.roast_level,      // $18
            req.body.roast_date,       // $19
            req.body.aroma,            // $20
            req.body.memo,             // $21
            1,                         // $22
          ]
        )

        res.status(200).json(insertBeanResult.rows);
          
      } catch (error) {
        db.query('ROLLBACK');
        next(error)
      }

      await db.query('COMMIT');
    }
  ); 
  
  // update beans of a user
  app.post(endpoint + "/user/:userid/bean/:beanid",
    beanValidator,
    async (req, res, next) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        CustomException(422, errors.array()[0]['msg'])
      }
      
      try {
        await db.query('BEGIN')

        let result = await db.query(
          `SELECT * FROM beans
            WHERE user_id = $1 AND bean_id = $2
          `, [
            req.params.userid,
            req.params.beanid
          ]);
  
        if(result.rows.length === 0) {
          CustomException(404, 'Not Found')
        }

        const currentBeanData = result.rows[0]

        for (const rangeKey of beanRangeKeys) {
          if(req.body[rangeKey]) {
            const currentRangeIdList = currentBeanData[rangeKey]
            const newRangeIdList = req.body[rangeKey]
  
            const removedRangeIdList = getUniqueItemInFirstArgArray(currentRangeIdList, newRangeIdList)
            const addedRangeIdList = getUniqueItemInFirstArgArray(newRangeIdList, currentRangeIdList)
  
            if (removedRangeIdList.length > 0) {
              for (const removedRangeId of removedRangeIdList) {
                const baseQuery = getDecrementCountInUseBaseQuery(rangeKey, removedRangeId);
                try {
                  await db.query(baseQuery, [req.params.userid])
                } catch (error) {
                  next(error)
                }
              }
            }
            if (addedRangeIdList.length > 0) {
              for (const addeddRangeId of addedRangeIdList) {
                const baseQuery = getIncrementCountInUseBaseQuery(rangeKey, addeddRangeId);
                try {
                  await db.query(baseQuery, [req.params.userid])
                } catch (error) {
                  next(error)
                }
              }
            }
          }
        }

        const blendBeanIdList = Object.keys(req.body.blend_ratio)
        const blendBeanId1 = blendBeanIdList[0] ? blendBeanIdList[0] : null;
        const blendBeanId2 = blendBeanIdList[1] ? blendBeanIdList[1] : null;
        const blendBeanId3 = blendBeanIdList[2] ? blendBeanIdList[2] : null;
        const blendBeanId4 = blendBeanIdList[3] ? blendBeanIdList[3] : null;
        const blendBeanId5 = blendBeanIdList[4] ? blendBeanIdList[4] : null;

        result = await db.query(
          `UPDATE beans 
            SET 
              label = $1, 
              single_origin = $2, 
              blend_ratio = $3,
              blend_bean_id_1 = $4,
              blend_bean_id_2 = $5,
              blend_bean_id_3 = $6,
              blend_bean_id_4 = $7,
              blend_bean_id_5 = $8,    
              origin = $9, 
              farm = $10, 
              variety = $11, 
              process = $12, 
              grade = $13,
              harvest_period = $14, 
              roaster = $15, 
              roast_level = $16, 
              roast_date = $17,
              aroma = $18,
              memo = $19
            WHERE user_id = $20 AND bean_id = $21 
            RETURNING *
          `,
          [
            req.body.label,            // $1
            req.body.single_origin,    // $2
            req.body.blend_ratio,      // $3
            blendBeanId1,              // $4
            blendBeanId2,              // $5
            blendBeanId3,              // $6
            blendBeanId4,              // $7
            blendBeanId5,              // $8
            req.body.origin,           // $9
            req.body.farm,             // $10
            req.body.variety,          // $11
            req.body.process,          // $12
            req.body.grade,            // $13
            req.body.harvest_period,   // $14
            req.body.roaster,          // $15
            req.body.roast_level,      // $16
            req.body.roast_date,       // $17
            req.body.aroma,            // $18
            req.body.memo,             // $19
            req.params.userid,         // $20
            req.params.beanid          // $21
          ]
        );
        res.status(200).json(result.rows);

      } catch (error) {
        db.query('ROLLBACK')
        next(error);
      }

      await db.query('COMMIT')
    }
  )

  // delete bean
  app.post(endpoint + "/user/:userid/bean/delete/:beanid", async (req, res, next) => {
    try {
      await db.query('BEGIN')

      const results = await db.query(
        `DELETE FROM beans WHERE user_id = $1 AND bean_id = $2`,
        [req.params.userid, req.params.beanid]
      );

      for (const rangeKey of beanRangeKeys) {
        if(req.body[rangeKey].length > 0) {
          for await (const id of req.body[rangeKey]) {
            const decrementCountInUseBaseQuery = getDecrementCountInUseBaseQuery(rangeKey, id);
            await db.query(decrementCountInUseBaseQuery, [req.params.userid])
          }
        }
      }
      res.status(200).json(results.rows);

    } catch (error) {
      db.query('ROLLBACK')

      if (error instanceof DatabaseError && error.code === '23503') {
        error.message = 'This item is tagged with other item(s) therefore cannot be deleted.'
      }
      next(error)
    }

    await db.query('COMMIT')
  });
}