<template>
  <div class="container">

      <div class="col-full push-top">

          <h1>Create new thread in <i>{{forum.name}}</i></h1>
          <thread-editor @save="save" @cancel="cancel" />
      </div>

  </div>
</template>

<script>
import ThreadEditor from '@/components/ThreadEditor.vue'
export default {
  components: { ThreadEditor },
  props: {
    forumId: {
      type: String,
      required: true
    }
  },
  computed: {
    forum () {
      return this.$store.state.forums.find(forum => forum.id === this.forumId)
    }
  },
  methods: {
    async save ({ title, text }) {
      const thread = await this.$store.dispatch('createThread', {
        title,
        text,
        forumId: this.forum.id
      })
      this.$router.push({ name: 'thread', params: { id: thread.id } })
    },
    cancel () {
      this.$router.push({ name: 'forum', params: { id: this.forum.id } })
    }
  }
}
</script>

<style>

</style>
