import { Vue } from 'vue-class-component'

export class ClassComponent extends Vue {
  count = 0;

  inc () {
    this.count++
  }

  render () {
    return <div onClick={this.inc}>{this.count}</div>
  }
}
