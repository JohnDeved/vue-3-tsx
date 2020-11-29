import { defineComponent, ref } from 'vue'

export const Composition = defineComponent({
  setup() {
    const count = ref(0)

    const inc = () => {
      count.value++
    }

    return () => (
      <div onClick={inc}>
        {count.value}
      </div>
    )
  }
})