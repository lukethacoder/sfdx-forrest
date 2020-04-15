#!/usr/bin/env node
import chalk from 'chalk'
import shell from 'shelljs'

import { env } from './env'
import { log } from './helpers'
;(async () => {
  shell.cd('scripts')
  // loop over each plan and execute them
  shell
    .ls(`${env.NAMESPACE}/plan-${env.SF_OBJECT}-*.json`)
    .forEach(function (file, key) {
      let cli_push_cmd = `sfdx force:data:tree:import -u ${env.SF_DESTINATION} --plan ${env.NAMESPACE}/plan-${env.SF_OBJECT}-${key}.json`
      log(chalk.gray(`About to run command of: ${cli_push_cmd}`))
      shell.exec(cli_push_cmd, function () {
        log(
          chalk.green(`Successfully imported ${env.NAMESPACE}/${key}-plan.json`)
        )
      })
    })
})()
