#!/usr/bin/env node
import path from 'path'
import { writeFile, readFile, writeJson, readFileSync } from 'fs-extra'
import chalk from 'chalk'
import shell from 'shelljs'

const log = console.log

function chunk(arr, len) {
  var chunks = [],
    i = 0,
    n = arr.length

  while (i < n) {
    chunks.push(arr.slice(i, (i += len)))
  }

  return chunks
}

function splitUpTheDangArray() {
  let json_denman = readFileSync(path.resolve(__dirname, 'denman-export.json'))
  let data_denman = JSON.parse(json_denman).records

  const chunky = chunk(data_denman, 190)

  chunky.forEach((lotOf200Items, key) => {
    writeJson(
      path.resolve(__dirname, `export-${key}.json`),
      { records: lotOf200Items },
      function(err) {
        if (err) {
          return log(err)
        }
        log(chalk.green(`export-${key}.json file was saved!`))
      }
    )
  })
}

splitUpTheDangArray()
