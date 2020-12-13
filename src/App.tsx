import { defineComponent, ref } from 'vue'
import { ClassComponent } from './components/ClassComponent'
import { Composition } from './components/Composition'
import { ReactComponent } from './components/ReactComponent'
import { Button, ButtonProps } from 'rsuite'

import reactToVue, { GetReactProps } from './modules/reactToVue'

type Props = GetReactProps<typeof ReactComponent>
const VueComponent = reactToVue<Props>(ReactComponent)

type buttonProps = Pick<ButtonProps, 'appearance'>

const RButton = reactToVue<buttonProps>(Button)

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

        ClassComponent
        <ClassComponent test={text.value}/>

        Vue Composition Component
        <Composition test={text.value}/>

        React Hooks Component
        <VueComponent test={text.value}/>

        <RButton appearance='primary' >
          <span data-test='test'>
            {text.value}
          </span>
        </RButton>

      </div>
    )
  }
})
