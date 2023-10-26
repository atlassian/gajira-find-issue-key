---------
⚠️ This repository isn’t maintained anymore.
---------

# Jira Find Issue Key
Extract issue key from string

> ##### Only supports Jira Cloud. Does not support Jira Server (hosted)

## Usage

> ##### Note: this action requires [Jira Login Action](https://github.com/marketplace/actions/jira-login)

To find an issue key inside github event (branch):
```yaml
- name: Find in commit messages
  uses: atlassian/gajira-find-issue-key@v3
  with:
    string: ${{ github.event.ref }}
```

Or do the same using shortcut `from`:
```yaml
- name: Find in commit messages
  uses: atlassian/gajira-find-issue-key@v3
  with:
    from: branch
```

To find an issue key inside commit messages:
```yaml
- name: Find in commit messages
  uses: atlassian/gajira-find-issue-key@v3
  with:
    from: commits
```

----
## Action Spec:

### Environment variables
- None

### Inputs
- `string` - Provide a string to extract issue key from
- `from` - Find from predefined place (should be either 'branch', or 'commits')

### Outputs
- `issue` - Key of the found issue

### Reads fields from config file at $HOME/jira/config.yml
- None

### Writes fields to config file at $HOME/jira/config.yml
- `issue` - a key of a found issue

### Writes fields to CLI config file at $HOME/.jira.d/config.yml
- `issue` - a key of a found issue
