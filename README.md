# Svelte Summit 2020 Website


### Install the dependencies:

```bash
npm install # or just yarn
```

### Start Project:

```bash
npm start
```

Navigate to [localhost:3000](http://localhost:3000). You should see your app running.

### Development:

For development, we recommend running two separate terminals. One for the server and the other for rollup (note that this command does not have an explicit `npm start` command for this reason).

**Terminal 1**

```bash
npm run dev:server # `npm start` above starts a server, but doesn't rebuild your Svelte components on change.
```

**Terminal 2**

```bash
npm run dev:rollup # This rebuilds your svelte components on change.
```

Once you have these two terminals open, edit a component file in `src`, save it, and reload the page to see your changes.

### To Build HTML:

```bash
npm run build
```

This will build all of your html into the /public/ folder.