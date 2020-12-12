import { defineComponent, ref } from 'vue'
import { ClassComponent } from './components/ClassComponent'
import { Composition } from './components/Composition'
import { ReactComponent } from './components/ReactComponent'
import { ComponentProps } from 'react'
import reactToVue from './modules/reactToVue'

import { Button, ButtonProps } from 'rsuite'

type ReactComponentProps = ComponentProps<typeof ReactComponent>
const VueReactComponent = reactToVue<ReactComponentProps>(ReactComponent)

const RsuiteButton = reactToVue<ButtonProps>(Button)

export const App = defineComponent({
  setup () {
    const text = ref('count:')

    const handelInput = (e: Event) => {
      if (e.target instanceof HTMLInputElement) {
        text.value = e.target.value
      }
    }

    return () => (
      <div>
        <input onInput={handelInput} />
        <h1>Vue 3</h1>
        Composition
        <Composition test={text.value}/>
        ClassComponent
        <ClassComponent test={text.value}/>
        ReactComponent
        <VueReactComponent test={text.value}/>

        <RsuiteButton><span>test</span></RsuiteButton>
      </div>
    )
  }
})
