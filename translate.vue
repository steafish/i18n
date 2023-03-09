<template>
  <div v-bind:class="{ selected: highlightString }" class="translate">
    <span v-if="string">{{ string }}</span>
    <span v-else><slot/></span>
    <span v-if="admin" :title="enString">
        <input type='text' :placeholder="getSourceString()" :value="editString">
        <button @click="updateString()">ok</button>
    </span>
  </div>
</template>
<script>
export default {
  name: 'i18n',
  props: {
    sid: {
      type: String,
      required: true,
    },
    cid: {
      type: String,
      required: false
    }
  },
  data: function () {
    return {
      editString: null,
      admin: false,
      parent: '',
      slotString: null
    }
  },
  mounted() {
    this.admin = this.$admin

    if (this.$parent && this.$parent.$vnode && this.$parent.$vnode.tag) {
      this.parent = this.$parent.$vnode.tag
    }

    const slots =  this.$slots.default()
    if(Array.isArray(slots) && slots[0]) {
      if(!Array.isArray(slots[0].children)) {
        this.slotString = slots[0].children
      }else if(slots[0].children[0]){
        if(slots[0].children[0].text){
          this.slotString = slots[0].children[0].text
        }else{
          this.slotString = slots[0].children
        }
      }
    }
  },
  computed: {
    string() {
      let string = this.$getString(this.sid, this.cid, this.$getLanguage())

      if(!string && this.slotString){
        string=this.slotString
      }
      const language_id = this.$getLanguage() ? this.$getLanguage() : this.$getSourceLanguage()
      let context = window.location.href

      if (context.indexOf('sid=') > 0) {
        context = context.substring(0, context.indexOf('sid=') - 1)
      }
      this.$setString(string, this.sid, this.cid ? this.cid : this.parent, language_id, context)

      return string
    },
    highlightString() {
      if (this.$route && this.$route.query && this.$route.query.sid) {
        return this.$route.query.sid === this.sid
      } else {
        return false
      }
    }
  },
  methods: {
    updateString() {
      this.$setString(this.editString, this.sid, this.cid, this.$language_id, window.location.href)
    },
    getSourceString() {
      if (this.$admin) {
        this.sourceString = this.$getString(this.sid, this.cid, this.$getSourceLanguage())
      }
      return this.sourceString
    }
  }
}
</script>
<style scoped>
.translate {
  display: inline-block
}

.selected {
  border: 5px solid rgb(232, 239, 6);
}
</style>
