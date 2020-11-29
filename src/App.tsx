import { ClassComponent } from './components/ClassComponent'
import { Composition } from './components/Composition'

export const App = () => (
  <div>
    <h1>Vue 3</h1>
    Composition
    <Composition test="count:"/>
    ClassComponent
    <ClassComponent test="count"/>
  </div>
)
