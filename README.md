# browser-vision

## Website
https://chrps.github.io/browser_vision

## TODO
- [ ] Check that supported image formats are actually supported
- [X] Add abillity to add limits to NumberInput.vue
- [ ] Provide message when invalid NumberInput.vue value is entered
- [X] Add shared color palette
- [ ] Add interpolation method to resize
- [ ] Create common media input component

## Setup version
TODO: Improve this section

```
nvm use default
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Deploy
```
npm run deploy
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### ChatGPT prompt

```
I am programming in vue 3 using typescript Composition API. load opencv like this `import cv from "opencv-ts";` and setup the script like so `<script setup lang="ts">`. I want to always keep reactivity. The format should follow strict esnext. Also dont include ref from vue if it is not used.
furthermore if you need to emit something define it similar to:

import { ref, defineEmits } from "vue";
const emit = defineEmits(["some-emit"]);
emit("some-emit", emitValue);

When possible only show the code which need to change and not the entire code and avoid too long descriptions but shortly say what changes you made or what you made and why it fixes any issue. here is my question:

```