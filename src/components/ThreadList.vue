<template>
  <div class="col-full">

          <div class="thread-list">

              <h2 class="list-title">Threads</h2>

              <div class="thread" v-for="thread in threads" :key="thread.id">
                  <div>
                      <p>
                          <router-link :to="{name: 'thread', params: {id: thread.id}}">{{ thread.title }}</router-link>
                      </p>
                      <p class="text-faded text-xsmall">
                          By <a href="#">{{getUserById(thread.userId).name}}</a>, <base-date :timeStamp="thread.publishedAt"/>.
                      </p>
                  </div>

                  <div class="activity">
                      <p class="replies-count">
                          {{thread.repliesCount}} reply
                      </p>

                      <img class="avatar-medium"
                           :src="getUserById(thread.userId).avatar"
                           alt="">

                      <div>
                          <p class="text-xsmall">
                              <a href="#">{{getUserById(thread.userId).name}}</a>
                          </p>
                          <p class="text-xsmall text-faded"><base-date :timeStamp="thread.publishedAt"/></p>
                      </div>
                  </div>
              </div>

          </div>
      </div>
</template>

<script>

export default {
  props: {
    threads: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      posts: this.$store.state.posts,
      users: this.$store.state.users
    }
  },
  methods: {
    getPostById (postId) {
      return this.posts.find(p => p.id === postId)
    },
    getUserById (userId) {
      return this.users.find(u => u.id === userId)
    }
  }
}
</script>

<style>

</style>
