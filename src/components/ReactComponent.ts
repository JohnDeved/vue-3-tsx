import React from 'react'

export const ReactComponent: React.FC<{test: string}> = (props) => {
  const [count, setCount] = React.useState(0)

  return React.createElement('div', {
    onClick: () => setCount(count + 1)
  }, [props.test, ' ', count])
}
