#!/usr/bin/env node
import chalk from 'chalk'
import shell from 'shelljs'
import { env } from './env'
import { log } from './helpers'

shell.cd('scripts')
// loop over each plan and execute them
shell
  .ls(`${env.NAMESPACE}/${env.SF_OBJECT}-*-plan.json`)
  .forEach(function(file, key) {
    if (
      shell.exec(`sfdx force:data:tree:import -u ${env.SF_DESTINATION} \
    --plan ${env.NAMESPACE}-${key}-plan.json`).code !== 0
    ) {
      shell.echo('Error: Git commit failed')
      shell.exit(1)
    }
  })
log(chalk.green(`Successfully created records`))
