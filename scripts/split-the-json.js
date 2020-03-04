#!/usr/bin/env node
import path from 'path'
import { writeJson, readFileSync } from 'fs-extra'
import chalk from 'chalk'

import { env } from './env'
import { chunk, log } from './helpers'

// get the json file
let json_raw = readFileSync(
  path.resolve(__dirname, `${env.JSON_FILE_TO_SPLIT}.json`)
)
let data_raw = JSON.parse(json_raw).records

const chunky = chunk(data_raw, env.CHUNK_BY_X_RECORDS)

chunky.forEach((xAmountOfRecords, key) => {
  // write the json records data
  writeJson(
    path.resolve(__dirname, `${env.NAMESPACE}-${key}.json`),
    { records: xAmountOfRecords },
    function(err) {
      if (err) {
        return log(err)
      }
      log(chalk.green(`${env.NAMESPACE}-${key}.json file was saved!`))
    }
  )
  // write the json plan data
  writeJson(
    path.resolve(__dirname, `${env.NAMESPACE}-${key}-plan.json`),
    [
      {
        sobject: 'Stock__c',
        saveRefs: true,
        resolveRefs: false,
        files: [`${env.NAMESPACE}-${key}.json`],
      },
    ],
    function(err) {
      if (err) {
        return log(err)
      }
      log(chalk.green(`${env.NAMESPACE}-${key}.json file was saved!`))
    }
  )
})
log(
  chalk.magentaBright(
    `successfully chunked ${data_raw.length} into ${chunky.length} files.`
  )
)
