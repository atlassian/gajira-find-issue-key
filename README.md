# Jira Find Issue Key
Extract issue key from string

## Usage
```
action "Find in commit messages" {
  uses = "atlassian/gajira-find-issue-key@master"
  needs = ["Login"]
  args = "--from=commits"
}
```
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
