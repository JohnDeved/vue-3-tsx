import * as Vue from 'vue'
import * as React from 'react'
import ReactDOM from 'react-dom'
import { VNode } from 'vue'

function convertVNode (vNode: Vue.VNode): any {
  if (!Vue.isVNode(vNode)) return

  const vNodes = vNode.children as Vue.VNode[] | string
  const vTag = vNode.type.toString()

  console.log({ vNodes, vTag })

  const createElement = ({ tag, children }: {tag?: string; children?: string | VNode[]}) => {
    console.log({ tag, children })
    return React.createElement(tag || React.Fragment, null, children)
  }

  if (typeof vNodes === 'string') {
    return createElement({ children: vNodes })
  }

  if (Vue.isVNode(vNodes?.[0])) {
    const children = vNodes as Vue.VNode[]
    console.log(children, 'children')
    return createElement({ tag: vTag, children: children.map(convertVNode) })
  }

  if (Vue.isVNode(vNodes)) {
    const child = vNodes as Vue.VNode
    console.log(child, 'children')
    return createElement({ tag: vTag, children: convertVNode(child) })
  }
}

export default function reactToVue<T> (Component: React.ComponentType<any>) {
  return Vue.defineComponent<T>({
    setup (_, context) {
      const children: React.FunctionComponentElement<{}>[] = []
      const root = Vue.ref<HTMLDivElement>()
      const vNodes = context.slots.default?.()

      if (vNodes) {
        for (const vNode of vNodes) {
          const node = convertVNode(vNode)
          if (node) children.push(node)
        }
      }

      const renderReact = () => {
        if (root.value) {
          ReactDOM.render(React.createElement(Component, { ...context.attrs }, children), root.value)
        }
      }

      Vue.onMounted(renderReact)
      Vue.onUpdated(renderReact)

      return () => Vue.createVNode('div', { ref: root }, 'react didnt seem to render')
    }
  })
}
