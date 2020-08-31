# Jira Find Issue Key
Extract issue key from string

For examples on how to use this, check out the [gajira-demo](https://github.com/atlassian/gajira-demo) repository
> ##### Only supports Jira Cloud. Does not support Jira Server (hosted)

## Usage

> ##### Note: this action requires [Jira Login Action](https://github.com/marketplace/actions/jira-login)

To find an issue key inside commit messages:
```yaml
- name: Find in commit messages
  uses: atlassian/gajira-find-issue-key@master
  with:
    from: commits
```

----
## Action Spec:

### Environment variables
- None

### Inputs
- `event` - Provide jsonpath for the GitHub event to extract issue from
- `string` - Provide a string to extract issue key from
- `from` - Find from predefined place (should be either 'branch', or 'commits', default is 'commits')

### Outputs
- `issue` - Key of the found issue

### Reads fields from config file at $HOME/jira/config.yml
- None

### Writes fields to config file at $HOME/jira/config.yml
- `issue` - a key of a found issue

### Writes fields to CLI config file at $HOME/.jira.d/config.yml
- `issue` - a key of a found issue
