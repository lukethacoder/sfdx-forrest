#!/usr/bin/env node
import path from 'path'
import { rmdir, emptyDir } from 'fs-extra'
import chalk from 'chalk'
import { env } from './env'
import { log } from './helpers'

// Remove namespaced folder and contents
emptyDir(path.resolve(__dirname, `${env.NAMESPACE}`), (err) => {
  if (err) return log(chalk.red(err))

  rmdir(path.resolve(__dirname, `${env.NAMESPACE}`), (err) => {
    if (err) return log(chalk.red(err))
    log(chalk.green(`Successfully deleted /scripts/${env.NAMESPACE}`))
  })
})
