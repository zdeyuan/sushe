<script>
export default {
  props: {
    fields: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    leftFields() {
      return this.fields.filter((o) => o.placement !== 'right')
    },
    rightFields() {
      return this.fields.filter((o) => o.placement === 'right')
    },
  },
  methods: {
    renderFields(h, fields) {
      return fields.map((o) => {
        return this.renderField(h, o)
      })
    },
    renderField(h, field) {
      const { fieldType, render } = field
      if (typeof render === 'function') {
        return render(h, { vm: this })
      } else if (fieldType === 'button') {
        return this.renderButton(h, field)
      } else if (fieldType === 'menus') {
        return this.renderDropMenus(h, field)
      }
    },
    renderButton(h, field) {
      const { type, label, icon, class: classes, style = {}, handler, props, suffixIcon } = field
      const RData = {
        props: {
          type: type,
          ...props,
        },
        class: ['g-tools__field', classes],
        style: style,
        on: {
          click: (e) => {
            if (typeof handler === 'function') {
              handler(e, { vm: this })
            }
            e.stopPropagation()
          },
        },
      }
      const Children = [label || '']
      if (!suffixIcon) {
        RData.props.icon = icon
      } else if (icon) {
        Children.push(h('a-icon', { props: { type: icon } }))
      }
      return h('a-button', RData, Children)
    },
    renderDropMenus(h, field) {
      const { type, label, icon, handler, props, children = [] } = field
      const buttonField = { type, label: label || '批量操作', icon: icon || 'down', suffixIcon: true }
      const Button = this.renderButton(h, buttonField)
      const Menus = children.map((o, i) => {
        return h('a-menu-item', { props: { key: o.k !== undefined ? o.k : `${i}`, disabled: o.disabled } }, [o.label])
      })
      const Menu = h(
        'a-menu',
        {
          slot: 'overlay',
          on: {
            click: (e) => {
              if (typeof handler === 'function') {
                handler(e, { vm: this })
              }
            },
          },
        },
        Menus
      )
      const DropMenus = h(
        'a-dropdown',
        {
          props: {
            ...props,
          },
          class: ['g-tools__field'],
        },
        [Button, Menu]
      )
      return DropMenus
    },
  },
  render(h) {
    const LeftFields = this.renderFields(h, this.leftFields)
    const RightFields = this.renderFields(h, this.rightFields)
    const Left = h('div', { class: 'g-tools__left' }, LeftFields)
    const Right = h('div', { class: 'g-tools__right' }, RightFields)
    return h('div', { class: 'g-tools' }, [Left, Right])
  },
}
</script>

<style lang="less">
.g-tools {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  &__left {
    flex: 1;
    .g-tools__field {
      margin-right: 15px;
    }
  }
  &__right {
    .g-tools__field {
      margin-left: 15px;
    }
  }

  &__field {
    margin-bottom: 10px;
    text-shadow: none;
    box-shadow: none;
    // text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    // box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
  }
}

</style>