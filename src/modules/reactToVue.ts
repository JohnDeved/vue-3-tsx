import * as Vue from 'vue'
import React, { ComponentProps as GetReactProps } from 'react'
import ReactDOM from 'react-dom'

function convertVNode (vNode: Vue.VNode, key?: string | number): any {
  if (typeof vNode === 'string') {
    return React.createElement(React.Fragment, { key }, vNode)
  }

  if (!Vue.isVNode(vNode)) return

  const vNodeChildren = vNode.children as Vue.VNode[] | string
  const vTag = vNode.type.toString()

  const createElement = ({ tag, children }: {tag?: string; children?: string | Vue.VNode[]}) => {
    return React.createElement(tag || React.Fragment, { key, ...vNode.props }, children)
  }

  if (typeof vNodeChildren === 'string') {
    return createElement({ children: vNodeChildren })
  }

  if (Vue.isVNode(vNodeChildren)) {
    const child = vNodeChildren as Vue.VNode
    return createElement({ tag: vTag, children: convertVNode(child) })
  }

  if (vNodeChildren?.[0]) {
    return createElement({ tag: vTag, children: vNodeChildren.map(convertVNode) })
  }
}

export { GetReactProps }

export default function reactToVue<T> (Component: React.ComponentType<any>) {
  return Vue.defineComponent<T>({
    name: 'ReactToVue',
    setup (_, context) {
      let children: React.FunctionComponentElement<{}>[] = []
      const root = Vue.ref<HTMLDivElement>()

      const renderReact = () => {
        const vNodes = context.slots.default?.()

        if (vNodes) {
          children = vNodes.map(convertVNode)
        }

        if (root.value) {
          console.log(children)
          ReactDOM.render(React.createElement(Component, { ...context.attrs }, children), root.value)
        }
      }

      Vue.onMounted(renderReact)
      Vue.onUpdated(renderReact)

      return () => Vue.createVNode('div', { ref: root }, 'react didnt seem to render')
    }
  })
}
