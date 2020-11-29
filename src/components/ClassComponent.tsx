import { Vue } from 'vue-class-component'

// https://github.com/vuejs/vue-class-component/issues/465
class Props {
  test!: string
}

export class ClassComponent extends Vue.with(Props) {
  count = 0

  inc () {
    this.count++
  }

  render () {
    return (
      <div onClick={this.inc}>
        {this.test} {this.count}
      </div>
    )
  }
}
