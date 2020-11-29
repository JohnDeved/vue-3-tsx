import { defineComponent, ref } from 'vue'

export const Composition = defineComponent({
  props: {
    test: String
  },

  setup (props) {
    const count = ref(0)

    const inc = () => {
      count.value++
    }

    return () => (
      <div onClick={inc}>
        {props.test} {count.value}
      </div>
    )
  }
})
