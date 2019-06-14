# Git

### Table of Contents

* [Individual](#individual)
* [Team](#team)
* [Format](#format)

***

## Individual

```bash
$ git init
```

```bash
$ git add .

$ git add -A

$ git add <FILE_NAME|FOLDER_NAME>
```

```bash
$ git commit -m "[<TICKET>] <TYPE>(<SCOPE>): <SUBJECT>"

$ git commit --amend -m "[<TICKET>] <TYPE>(<SCOPE>): <SUBJECT>"
```

```bash
$ git status
```

```bash
$ git diff
```

```bash
$ git log
$ git log -<NUMBER>

$ git log -p
$ git log -p -<NUMBER>
```

```bash
# remove tracked file
$ git rm --cached <FILE_NAME>

# remove tracked folder
$ git rm --cached -r <FOLDER_NAME>
```

```bash
$ git reset --hard HEAD

$ git reset --hard HEAD^0

$ git reset --hard HEAD <COMMIT_ISH>
```

```bash
# remove untracked files
$ git clean -df

# remove untracked files, including `.gitignore` files
$ git clean -dfx -e '.*'
```

## Team

```bash
$ git clone <HTTPS_URL|SSH_KEY>
```

```bash
$ git checkout <BRANCH_NAME>

$ git checkout -b <BRANCH_NAME>

$ git checkout -- .
```

```bash
# show a list
$ git branch

# remove
$ git branch -D <BRANCH_NAME>

# rename
$ git branch -m <OLD_NAME> <NEW_NAME>
```

```bash
$ git merge <BRANCH_NAME>
```

```bash
$ git remote -v

$ git remote add <SHORT_NAME> <HTTPS_URL|SSH_KEY>
```

```bash
$ git push <SHORTNAME> <BRANCH_NAME>
```

```bash
$ git fetch
```

```bash
$ git pull

$ git remote add upstream <HTTPS_URL|SSH_KEY>
$ git pull upstream master
```

```bash
$ git stash
# or
$ git stash save

# see all stashes
$ git stash list

$ git stash apply
# or
$ git stash apply stash@{0}

$ git stash drop stash@{<INDEX_NUMBER>}

$ git stash pop
# or
$ git stash pop stash@{0}

# create a branch from a stash
$ git stash branch <BRANCH_NAME>
```

```bash
# get commits and apply
$ git cherry-pick <COMMIT_ISH>
```

```bash
$ git tag

$ git tag -a <VERSION> -m <MESSAGE>
```

## Format

```txt
[ticket] <type>(<scope>): <subject>
```

### Ticket

Issue ticket number.

### Type

Must be one of the following:

* build: Changes that affect the build system or external dependencies
* ci: Changes to our CI configuration files and scripts
* docs: Documentation only changes
* feat: A new feature
* fix: A bug fix
* perf: A code change that improves performance
* refactor: A code change that neither fixes a bug nor adds a feature
* style: Changes that do not affect the meaning of the code
* test: Adding missing tests or correcting existing tests
* release: Release a new version
* revert: Revert commits

### Scope

Feature modules.

### subject

What has been done.
