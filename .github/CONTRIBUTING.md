# Contributing to eth-enugu-frontend

Thank you for considering contributing to eth-enugu-frontend! We appreciate your interest in helping us improve this project. Here are some guidelines to help you get started.

## Branching Rules

The following table outlines the different types of branches and their purposes:

| Branch Type | Description | Branch Off From |
| --- | --- | --- |
| `main` | Production branch, always releasable | - |
| `dev` | Development branch, new features and bug fixes | - |
| `feature/*` | Feature branches, new features and enhancements | `dev` |
| `fix/*` | Bug fix branches, bug fixes and patches | `dev` |
| `release/*` | Release branches, preparation for new releases | `dev` |

## Commit Guidelines

The following table outlines the different types of commits and their purposes:

| Commit Type | Description | Format |
| --- | --- | --- |
| `feat` | New feature or enhancement | `feat: <description>` |
| `fix` | Bug fix or patch | `fix: <description>` |
| `docs` | Documentation changes | `docs: <description>` |
| `style` | Code style changes (e.g. formatting, renaming) | `style: <description>` |
| `refactor` | Code refactoring | `refactor: <description>` |
| `perf` | Performance improvements | `perf: <description>` |
| `test` | Test changes | `test: <description>` |
| `chore` | Maintenance tasks (e.g. updating dependencies) | `chore: <description>` |

## Pull Request Guidelines

* All pull requests should be made to the `dev` branch.
* Ensure your pull request includes a clear description of the changes you've made.
* Make sure to follow the project's coding style and conventions.
* Ensure your code is well-tested and includes any necessary documentation.
* Be prepared to address any feedback or questions from the maintainers.

## Code of Conduct

* Be respectful and considerate towards other contributors.
* Keep the conversation civil and constructive.
* Avoid using offensive or discriminatory language.
* Follow the project's guidelines and conventions.
* Always pull from the `dev` branch before starting to make any changes for the day.
* Check the `package.json` file to be able to keep up with the dependencies being used, so you do not install a duplicate.
* Ensure you stick to the colour palette which has been provided in the `globals.css` file.

## Additional Standards

* All code should be written in TypeScript.
* All code should be formatted using Prettier.
* All code should be linted using ESLint.
* All code should include necessary documentation and comments.
* All tests should be written using Jest.

## Additional Resources

* [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
* [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
* [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) - the easiest way to deploy your Next.js app.

By following these guidelines, you can help us maintain a high-quality project that is easy to contribute to. Thank you again for your interest in contributing to eth-enugu-frontend!
