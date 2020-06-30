// 公共方法文件


// table columns h
export function operationH(h, params, operations) {
  const actions = operations.map(action => {
    return h('span', [
      // h('img', {
      //   attrs: {
      //     src: action.icon
      //   },
      //   style: {
      //     width: '14px',
      //     height: '14px',
      //     marginTop: '3px',
      //     marginRight: '3px'
      //   }
      // }),
      h('span', {
        style: {
          color: action.color || '#308EF3',
          paddingRight: '30px',
          cursor: 'pointer'
        },
        on: {
          click: () => {
            action.click()
          }
        }
      }, action.name)
    ])
  })
  return h('div', actions)
}