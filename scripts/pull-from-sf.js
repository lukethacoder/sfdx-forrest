#!/usr/bin/env node
import path from 'path'
import { writeJson } from 'fs-extra'
import chalk from 'chalk'
import shell from 'shelljs'
import { log } from './helpers'

shell.cd('scripts')
// loop over each plan and execute them
shell.exec(`sfdx force:data:tree:import -u ${env.SF_DESTINATION} \
    --plan ${env.NAMESPACE}-${key}-plan.json`).code !== 0

log(chalk.green(`Successfully created records`))

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
