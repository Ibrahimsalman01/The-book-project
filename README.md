Testing git

"git clone HTTPSLINK" to get current stuff in repo

To pull main branch from remote to our local pc, pulling any new changes to our pc: "git pull origin main"


Creating a new branch to do work into it without changing main branch directly and immediately:
"git checkout -b ANYNAMEYOUWANT"

Pushing new work to main branch:

git add .
git commit -m "ANYTHINGHERE"
git push origin TESTBRANCHNAME

^^^ Will not make new changes to main branch stuff until approved.
User who makes the push here has to create a pull request in Github.
Pull Request can be confirmed to be merged and then you can delete the test branch you were working in.