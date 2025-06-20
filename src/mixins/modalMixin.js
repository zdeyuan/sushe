export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    obj: {
      type: Object,
      default () {
        return {}
      }
    },
    id: {
      type: [String, Number],
      default: ''
    }
  },
  computed: {
    title () {
      return this.id ? '编辑' : '新增'
    }
  },
  methods: {
    close () {
      this.$emit('input', false)
      // 有新建时关闭方法单独写on-cancel重置id
    },
    onCancel(){
        this.close()
    }
  }
}
