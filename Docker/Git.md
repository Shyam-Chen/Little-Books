# Git

```bash
$ git add .

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
$ git log

$ git log -1
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
$ git clone <HTTPS_URL|SSH_KEY>
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

$ git stash drop stash@{0}

$ git stash pop
# or
$ git stash pop stash@{0}

# creat a branch from a stash
$ git stash branch <BRANCH_NAME>
```

```bash
$ git clean -df

$ git clean -dfx -e '.*'
```

```bash
$ git cherry-pick <COMMIT_ISH>
```
