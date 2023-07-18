# TripApp

Micro-service architecture deployed on kubernetes!

## Final infrastructure (Poll, Map and Info sections are partially/totally un-implemented)
![tripapp_architecture](https://user-images.githubusercontent.com/58485208/220957276-3a9bf71f-d736-41fc-a07a-b8580ef2e483.png)


## Showcase

#### Landing page - your next trips!
![image](https://user-images.githubusercontent.com/58485208/220953373-f4373c86-916b-4141-be83-0897c4c0d688.png)
##### Adaptive view
<img src="https://user-images.githubusercontent.com/58485208/220954365-b74bcaf5-2a22-4159-8774-7439d35cf6c1.png" width="400">

#### App sections
![image](https://user-images.githubusercontent.com/58485208/220953487-9c2c12e3-8fd5-4329-ad7e-405c4d3023ea.png)

#### Map
![image](https://user-images.githubusercontent.com/58485208/220955410-2aa4bbdf-a583-47b1-926a-c7e615ded0c0.png)

#### Finance
![image](https://user-images.githubusercontent.com/58485208/220955520-6da621dd-4ac3-4c26-94f6-9aa49fe65b5d.png)
![image](https://user-images.githubusercontent.com/58485208/220955564-91ad17e3-0e25-43f5-90b4-71db53c1c083.png)

#### Info
<img src="https://user-images.githubusercontent.com/58485208/220955950-c25df2a6-0ce0-4093-91ca-52e610dad2e3.png" width="400">


## Development

- Directory structure:

```plain
.
├── .github      # ci/cd pipelines
├── docs         # documentation generation files
├── infra        # kubernetes deployment manifests
├── tripapp-app  # java/spring backend micro-services
└── tripapp-ui   # typescript/react frontend
```

- Agile/XP development done on [github projects](https://github.com/users/fedeztk/projects/1).

### Git workflow

- Naming: use *meaningful* commit messages (see [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)). Use `fix(scope):` `feat(scope):` `docs:` `refactor:` `build:` `test:` etc. followed by a concise comment (the scope of the change between () is optional). This is useful for keeping the git history clean and back-trackable (try it with `git log --oneline`).

- Contributing:
    + When a change needs to be done, a new issue should be created, giving a simple description about it.
    + The contributor then need to fork the `master` branch, name the new branch according to the feature/bugs that addresses (again, see conventional commits, valid branch names are: `fix(my-microservice):error-handling-crash`, `feat(ui):added-login-prompt`, `docs:fixed-misspelling`).
    + When the branch is ready (all work is done), the contributor needs to open a new pull request, following the same name convention and referencing the related issue.
    **IMPORTANT**: if the `master` branch is ahead of the fork, it needs to be rebased.
    + When all ci/cd pipelines passes, the branch is ready to be merged.
    + The fork can be safely deleted.
