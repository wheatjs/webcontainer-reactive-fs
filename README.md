# webcontainer-reactive-fs

[![NPM version](https://img.shields.io/npm/v/webcontainer-reactive-fs?color=a1b858&label=)](https://www.npmjs.com/package/webcontainer-reactive-fs)

> ⚠️ Experimental. Expect breaking changes. Contributions welcome!

## 📦 Install

```bash
npm i webcontainer-reactive-fs
```

## 📖 Usage

```ts
import { WebContainer } from '@webcontainer/api'
import { createReactiveFs } from 'webcontainer-reactive-fs'

const container = await WebContainer.boot()
const fs = createReactiveFs(container)

const readme = fs.useFile('./readme.md')

readme.value = '# Hello World' // Write to file
readme.value += '\n This is some text' // Append to file

watch(readme, () => console.log(readme.value))

readme.value = 'Testing' // Triggers watch
container.fs.writeFile('./readme.md', '## Goodbye World') // Also triggers watch
```

## License

[MIT](./LICENSE) License © 2022 [Jacob Clevenger](https://github.com/jacobclevenger)
