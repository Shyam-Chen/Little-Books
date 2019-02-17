# Git

## Individual

```bash
$ git init
```

```bash
$ git add .

$ git add -A

$ git add <FILE_NAME>
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

## Ｔeam

```bash
$ git clone <HTTPS_URL|SSH_KEY>
```

```bash
$ git checkout <BRANCH_NAME>

$ git checkout -b <BRANCH_NAME>

$ git checkout -- .
```

```bash
$ git branch

$ git branch -D <BRANCH_NAME>

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
