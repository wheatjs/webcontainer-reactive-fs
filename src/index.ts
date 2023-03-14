import type { WritableComputedRef } from '@vue/reactivity'
import { computed, shallowRef } from '@vue/reactivity'
import type { WebContainer } from '@webcontainer/api'
import { createEventHook } from '@vueuse/core'

export interface ReactiveFsReturn {
  useFile: (filename: string) => WritableComputedRef<string>
  onFileChange: (callback: (filename: string) => void) => void
}

export function createReactiveFs(container: WebContainer): ReactiveFsReturn {
  const watcherEventHook = createEventHook<string>()
  const onFileChange = watcherEventHook.on

  container.fs
    .writeFile('./__reactive-fs-watcher.js', 'require(\'fs\').watch(\'./\', (eventType, filename) => console.log(filename))')
    .then(() => container.spawn('node', ['__reactive-fs-watcher.js']))
    .then((watcher) => {
      watcher.output.pipeTo(new WritableStream({
        write(chunk: string) {
          watcherEventHook.trigger(`./${chunk}`.trim())
        },
      }))
    })

  const useFile = (filename: string) => {
    const content = shallowRef('')

    onFileChange((name) => {
      if (filename === name) {
        container.fs.readFile(filename, 'utf-8')
          .then(value => content.value = value)
      }
    })

    const write = (value: string) => {
      content.value = value
      container.fs.writeFile(filename, value)
    }

    return computed({
      get() {
        return content.value
      },
      set(value: string) {
        write(value)
      },
    })
  }

  return {
    useFile,
    onFileChange,
  }
}
