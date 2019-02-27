# Jira Find Issue Key
Extract issue key from string

For examples on how to use this, check out the [gajira-demo](https://github.com/atlassian/gajira-demo) repository
> ##### Only supports Jira Cloud. Does not support Jira Server (hosted)

## Usage

> ##### Note: this action requires [Jira Login Action](https://github.com/marketplace/actions/jira-login)

To find an issue key inside commit messages:
```
action "Find in commit messages" {
  uses = "atlassian/gajira-find-issue-key@master"
  needs = ["Login"]
  args = "--from=commits"
}
```


Also you can use [lodash templates](https://lodash.com/docs/4.17.11#template) to retrieve fields from GitHub Event which triggered workflow, like: `{{event.ref}}` Here is an example:

```
action "Find in branch name" {
  uses = "atlassian/gajira-find-issue-key@master"
  needs = ["Login"]
  args = "{{event.ref}}"
}
```
which is the same as `--from=branch`

Or more complex one:

```
action "Find in commit messages" {
  uses = "atlassian/gajira-find-issue-key@master"
  needs = ["Login"]
  args = "{{event.commits.map(c=>c.message).join(' ')}}"
}
```
which is the same as `--from=commits`

----
## Action Spec:

### Environment variables
- None

### Arguments
- `--from=commits` - Detect issue key in commit messages from event
- `--from=branch` - Detect issue key in branch name
### Reads fields from config file at $HOME/jira/config.yml
- None

### Writes fields to config file at $HOME/jira/config.yml
- `issue` - a key of a found issue

### Writes fields to CLI config file at $HOME/.jira.d/config.yml
- `issue` - a key of a found issue
