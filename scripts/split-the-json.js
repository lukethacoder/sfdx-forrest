#!/usr/bin/env node
import path from 'path'
import { writeJson, readFileSync, mkdirp } from 'fs-extra'
import chalk from 'chalk'

import { env } from './env'
import { chunk, log } from './helpers'
;(async () => {
  // check + create the namespaced directory
  mkdirp(path.resolve(__dirname, `${env.NAMESPACE}`))

  // get the json file
  let json_raw = readFileSync(
    path.resolve(__dirname, `${env.NAMESPACE}-${env.SF_OBJECT}s.json`)
  )
  let data_raw = JSON.parse(json_raw).records

  const chunky = chunk(data_raw, env.CHUNK_BY_X_RECORDS)

  chunky.forEach((xAmountOfRecords, key) => {
    // write the json records data
    writeJson(
      path.resolve(__dirname, `${env.NAMESPACE}/${env.SF_OBJECT}-${key}.json`),
      { records: xAmountOfRecords },
      function(err) {
        if (err) {
          return log(err)
        }
        log(chalk.green(`${env.SF_OBJECT}-${key}.json file was saved!`))
      }
    )
    // write the json plan data
    writeJson(
      path.resolve(
        __dirname,
        `${env.NAMESPACE}/plan-${env.SF_OBJECT}-${key}.json`
      ),
      [
        {
          sobject: env.SF_OBJECT,
          saveRefs: true,
          resolveRefs: false,
          files: [`${env.SF_OBJECT}-${key}.json`],
        },
      ],
      function(err) {
        if (err) {
          return log(err)
        }
        log(chalk.green(`${env.SF_OBJECT}-${key}.json file was saved!`))
      }
    )
  })
  log(
    chalk.magentaBright(
      `Successfully chunked ${data_raw.length} files into ${chunky.length} chunked files.`
    )
  )
})()
