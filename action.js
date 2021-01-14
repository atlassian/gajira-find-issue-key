const _ = require('lodash')
const Jira = require('./common/net/Jira')

const issueIdRegEx = /([a-zA-Z0-9]+-[0-9]+)/g

const eventTemplates = {
  branch: '{{event.ref}}',
  commits: "{{event.commits.map(c=>c.message).join(' ')}}",
}

module.exports = class {
  constructor ({ githubEvent, argv, config }) {
    this.Jira = new Jira({
      baseUrl: config.baseUrl,
      token: config.token,
      email: config.email,
    })

    this.config = config
    this.argv = argv
    this.githubEvent = githubEvent
  }

  async execute () {
    if (this.argv.string) {
      const foundIssues = await this.findIssueKeyIn(this.argv.string)

      if (foundIssues.length > 0) return foundIssues
    }

    if (this.argv.from) {
      const template = eventTemplates[this.argv.from]

      if (template) {
        const searchStr = this.preprocessString(template)
        const foundIssues = await this.findIssueKeyIn(searchStr)

        if (foundIssues.length > 0) return foundIssues
      }
    }
  }

  async findIssueKeyIn (searchStr) {
    const match = searchStr.match(issueIdRegEx)

    console.log(`Searching in string: \n ${searchStr}`)

    if (!match) {
      console.log(`String does not contain issueKeys`)

      return
    }

    const issues = []
    for (const issueKey of match) {
      const issue = await this.Jira.getIssue(issueKey)

      if (issue) {
        issues.push(issue)
      }
    }
    // de-dupe
    let uniqueItems = [...new Set(issues)]
    return uniqueItems
  }

  preprocessString (str) {
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g
    const tmpl = _.template(str)

    return tmpl({ event: this.githubEvent })
  }
}
