# The Crypto Drip - Official Website
This repo contains the entirety of the TCD website application. It is possible to fork it and create your own version, but you'll need to configure the same software stack and services. You can get an idea for this in the `.env.example` file.

## Stack
This application runs on the following:

- [NextJS](http://nextjs.org/) ^11.0.0
- [Next Auth](https://next-auth.js.org/) ^3.28.0
- [React](https://reactjs.org/) 17.0.2
- [Prisma](https://www.prisma.io/) ^2.29.1
- [NodeMailer](https://nodemailer.com/about/) ^6.6.3
- [Node Cache](https://www.npmjs.com/package/node-cache/v/4.2.1) ^5.1.2
- [TypeScript](https://www.typescriptlang.org/) ^4.3.5
- [Cardano](https://cardano.org)

## Storybook
We use Storybook to edit components without running the application locally or needing a database. Running Storybook is fairly straightforward. First, run:

```bash
yarn install && yarn storybook
```

This will install dependencies and then initiate a development environment for Storybook. It will likely prompt you for permission to open a browser window. You can accept or manually open `localhost:6006`.

From here, you'll see each component and their associated stories.

## The Crypto Drip
The Crypto Drip is an education and entertainment company that is transitioning to a community-governed DAO. To read more about our roadmap and community updates, [look at our TCD Brief's](https://thecryptodrip.com/tag/the-tcd-brief/). This repo is the first step toward building a platform that seamlessly interacts with the Cardano blockchain.
