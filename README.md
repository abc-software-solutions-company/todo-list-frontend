# ABC Website

hello [Stage](https://abc-website-stage.vercel.app)

## ⚠️ Prerequisites.

1. Install Node.js >=14.18
2. Install Yarn
3. Working knowledge of React and Next.js.

## 🛠 Development

First, install `node_modules`:

```bash
yarn install
```

Second, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Folder structure

```shell
.
├── README.md                       # README file
├── .circleci                       # Circle CI config
├── .github                         # GitHub folder
├── .husky                          # Husky configuration
├── .vscode                         # VSCode configuration
├── .next                           # Next build folder
├── coverage                        # Test coverage folder
├── docs                            # Documentation folder
├── e2e                             # End-to-end testing
├── nginx                           # Nginx configuration
├── public                          # Public assets folder
├── src
│   ├── __mocks__                   # Mocks for testing
│   ├── __tests__                   # Global tests
│   ├── assets                      # Fonts, styles, images,...
│   ├── components                  # All components in project
│   │   │── common                  # Common components: button, seo, 404
│   │   │── forms                   # Form components
│   │   │── icons                   # Icons components
│   │   │── layouts                 # Header, Footer, Menu,...
│   │   │── modules                 # Component of pages
│   ├── contexts                    # Layouts components
│   ├── data                        # Layouts components
│   ├── layouts                     # Layouts components
│   ├── pages                       # Next JS Pages
│   ├── settings                    # Settings of project/website
│   ├── types                       # TS types
│   └── utils                       # Utility functions
├── tailwind.config.js              # Tailwind CSS configuration
└── tsconfig.json                   # TypeScript configuration
└── Dockerfile                      # Dockerfile
└── docker-compose.yml              # Docker compose
```

> ### New feature
>
> If we need to do a feature, we branch from `main`. When feature is done, we rebase `main` before create a PR against
> `main`.

Example git flows:

- Create new branch base on `main`

```bash
git checkout -b feature/AONJ-73-xxx
```

- Do your task and commit with

```bash
git add -A && yarn cm
```

- Pull latest version of `main` and rebase

```bash
git checkout main && git pull && git checkout - && git rebase main
```

- Resolve conflict if needed and push code to origin

```bash
git push origin feature/AONJ-73-xxx
```

##.END.
