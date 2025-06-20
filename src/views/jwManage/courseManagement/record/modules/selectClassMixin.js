export default {
  data() {
    return {
      selectedClasses: [],
      selectClassesVisible: false, // 选择班级弹框
    }
  },
  computed: {
    selectedClassesName() {
      return this.selectedClasses.map((o) => o.xzbmc).join(',')
    },
    selectedClassesIds() {
      return this.selectedClasses.map((o) => o.id).join(',')
    },
  },
  methods: {
    onClickSelectClass() {
      this.selectClassesVisible = true
    },
    onClickCleanSkxzbdm() {
      this.selectedClasses = []
    },
    onSelectJSBJOk(selected) {
      this.selectedClasses = selected;
    },
  }
}