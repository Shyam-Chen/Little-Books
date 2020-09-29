# Git

---

### Table of Contents

- [Individual](#individual)
- [Team](#team)
- [Format](#format)

---

## Individual

```sh
$ git init
```

```sh
$ git config --local user.name
$ git config --local user.email

# setting
$ git config --local user.name <USER_NAME>
$ git config --local user.email <USER_EMAIL>
```

```sh
$ git add .

$ git add -A

$ git add <FILE_NAME|FOLDER_NAME>
```

```sh
$ git commit -m "[<TICKET>] <TYPE>(<SCOPE>): <SUBJECT>"

$ git commit --amend -m "[<TICKET>] <TYPE>(<SCOPE>): <SUBJECT>"
```

```sh
$ git status
```

```sh
$ git diff
```

```sh
$ git log
$ git log -<NUMBER>

$ git log -p
$ git log -p -<NUMBER>
```

```sh
# remove tracked file
$ git rm --cached <FILE_NAME>

# remove tracked folder
$ git rm --cached -r <FOLDER_NAME>
```

```sh
$ git reset --hard HEAD

$ git reset --hard HEAD^0

$ git reset --hard HEAD <COMMIT_ISH>
```

```sh
# remove untracked files
$ git clean -df

# remove untracked files, including `.gitignore` files
$ git clean -dfx -e '.*'
```

## Team

```sh
$ git clone <HTTPS_URL|SSH_KEY>
```

```sh
$ git checkout <BRANCH_NAME>

$ git checkout -b <BRANCH_NAME>

$ git checkout -- .
$ git checkout -- <PATH>
```

```sh
# show a list
$ git branch

# remove
$ git branch -D <BRANCH_NAME>

# rename
$ git branch -m <OLD_NAME> <NEW_NAME>
```

```sh
$ git merge <BRANCH_NAME>

# squash commits into one
$ git checkout master
$ git merge --squash <BRANCH_NAME>
$ git commit
```

```sh
$ git remote -v

$ git remote add <SHORT_NAME> <HTTPS_URL|SSH_KEY>

$ git remote rm <SHORT_NAME>
```

```sh
$ git push <SHORTNAME> <BRANCH_NAME>
```

```sh
$ git fetch
```

```sh
$ git pull

$ git remote add upstream <HTTPS_URL|SSH_KEY>
$ git pull upstream master
```

```sh
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

```sh
# get commits and apply
$ git cherry-pick <COMMIT_ISH>
```

```sh
$ git tag

$ git tag -a <VERSION> -m <MESSAGE>
```

## Format

```txt
[<TICKET>] <TYPE>(<SCOPE>): <SUBJECT>
```

### Ticket

Issue ticket number.

### Type

Must be one of the following:

- `feat` - Features, A new feature
- `fix` - Bug Fixes, A bug fix
- `docs` - Documentation, Documentation only changes
- `style` - Styles, Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor` - Code Refactoring, A code change that neither fixes a bug nor adds a feature
- `perf` - Performance Improvements, A code change that improves performance
- `test` - Tests, Adding missing tests or correcting existing tests
- `build` - Builds, Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- `ci` - Continuous Integrations, Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- `chore` - Chores, Other changes that don't modify src or test files
- `revert` - Reverts, Reverts a previous commit

### Scope

Feature modules.

### Subject

What has been done.
