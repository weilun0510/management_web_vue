// 模态框
export const Table = {
  data() {
    return {
      tableHeight: ''
    }
  },
  methods: {
  },
  mounted() {
    console.log('123', this.$refs.table)
    this.$nextTick(() => {
      this.tableHeight = this.$refs.table.offsetHeight
    })
    console.log(this.tableHeight)
  }
}