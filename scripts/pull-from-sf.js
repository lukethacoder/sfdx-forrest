#!/usr/bin/env node
import path from 'path'
import { readJson } from 'fs-extra'
import chalk from 'chalk'
import shell from 'shelljs'

import { log } from './helpers'
import { env } from './env'
;(async () => {
  shell.cd('scripts')

  // fetch fields list from the json file
  const FIELDS_JSON = await readJson(
    path.resolve(__dirname, `${env.SF_OBJECT}-fields.json`)
  )
  let query = `"SELECT ${FIELDS_JSON.fields} FROM ${env.SF_OBJECT}"`

  let cli_export_cmd = `sfdx force:data:tree:export -u ${env.SF_SOURCE} --query ${query} --prefix ${env.NAMESPACE} --plan`

  shell.exec(cli_export_cmd, function(code, stdout, stderr) {
    log(chalk.green(`Successfully pulled records`))
  })
})()
