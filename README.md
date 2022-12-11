# TripApp

## Development

- Directory structure:

```plain
.
├── .github      # ci/cd pipelines
├── assets       # media files for documentation
├── docs         # documentation generation files
├── infra        # kubernetes deployment manifests
├── tripapp-app  # java backend
└── tripapp-ui   # typescript/react frontend
```

- Agile/Xtreme development done on [trello](https://trello.com/b/27qmxUtj/tripapp).
- Agile/Xtreme development done on [github projects](https://github.com/users/fedeztk/projects/1).

### Git workflow

- Naming: use *meaningful* commit messages (see [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)). Use `fix(scope):` `feat(scope):` `docs:` `refactor:` `build:` `test:` etc. followed by a concise comment (the scope of the change between () is optional). This is useful for keeping the git history clean and back-trackable (try it with `git log --oneline`).

- Contributing:
    + When a change needs to be done, a new issue should be created, giving a simple description about it.
    + The contributor then need to fork the `master` branch, name the new branch according to the feature/bugs that addresses (again, see conventional commits, valid branch names are: `fix(my-microservice):error-handling-crash`, `feat(ui):added-login-prompt`, `docs:fixed-misspelling`).
    + When the branch is ready (all work is done), the contributor needs to open a new pull request, following the same name convention and referencing the related issue.
    **IMPORTANT**: if the `master` branch is ahead of the fork, it needs to be rebased.
    + When all ci/cd pipelines passes, the branch is ready to be merged.
    + The fork can be safely deleted.
