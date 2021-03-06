import { defineComponent, ref } from 'vue'

export const Composition = defineComponent({
  props: {
    test: {
      type: String,
      required: true
    }
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
