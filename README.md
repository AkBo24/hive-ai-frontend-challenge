This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, ensure you have `NPM` installed and any dependencies necessary to run a React (Next.JS) project.
Then run the development server:

```bash
npm install

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## The Project

When opening the project, you should see four dropdowns. The first two are uncontrolled while the second two are controlled by a parent component.

### Project Structure

The code for the dropdown component and its implementations are found in `@/components` directory (where `@` is the root directory).

```
@/components
|-ControlledDropdown
  |-index.tsx             # contains two controlled implementations of the dropdown
|-Dropdown
  |-DefaultComponents.tsx # has components that are rendered by default
                          # if parent components do not specifically pass in rendering components
  |-index.tsx             # the actual dropdown component
|-UncontrolledDropdown
  |-index.ts              # contains two uncontrolled implementations of the dropdown
```

### Resource Acknowledgement

-   SVG's were taken from [google material icon](https://fonts.google.com/icons)

#### AI Acknowledgement

AI (ChatGPT) was used to fix minor syntax errors.
