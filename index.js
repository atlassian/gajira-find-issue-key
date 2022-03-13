const fs = require('fs')
const YAML = require('yaml')
const core = require('@actions/core')

const cliConfigPath = `${process.env.HOME}/.jira.d/config.yml`
const configPath = `${process.env.HOME}/jira/config.yml`
const Action = require('./action')

// eslint-disable-next-line import/no-dynamic-require
const githubEvent = require(process.env.GITHUB_EVENT_PATH)
const config = YAML.parse(fs.readFileSync(configPath, 'utf8'))

async function exec () {
  try {
    const result = await new Action({
      githubEvent,
      argv: parseArgs(),
      config,
    }).execute()

    if (result) {
      console.log(`Detected issueKey: ${result.key}`)
      console.log(`Saving ${result.key} to ${cliConfigPath}`)
      console.log(`Saving ${result.key} to ${configPath}`)

      // Expose created issue's key as an output
      core.setOutput('key', result.key)
      core.setOutput('issue', result.issue)

      const yamledResult = YAML.stringify(result)
      const extendedConfig = Object.assign({}, config, result)

      fs.writeFileSync(configPath, YAML.stringify(extendedConfig))

      return fs.appendFileSync(cliConfigPath, yamledResult)
    }

    console.log('No issue keys found.')
  } catch (error) {
    core.setFailed(error.toString())
  }
}

function parseArgs () {
  return {
    string: core.getInput('string') || config.string,
    from: core.getInput('from'),
    fields: core.getInput('fields')
  }
}

exec()
