<template>
  <div class="post-list">
    <div class="post" v-for="post in posts" :key="post.id">
      <div class="user-info">
        <a href="#" class="user-name">{{ getUserById(post.userId).name }}</a>

        <a href="#">
          <img
            class="avatar-large"
            :src="getUserById(post.userId).avatar"
            alt=""
          />
        </a>

        <p class="desktop-only text-small">{{ getUserById(post.userId).postsCount }} posts</p>
        <p class="desktop-only text-small">{{ getUserById(post.userId).threadsCount }} threads</p>
      </div>

      <div class="post-content">
        <div>
          <p>
            {{ post.text }}
          </p>
        </div>
      </div>
      <div class="post-date text-faded">
        <base-date :timeStamp="post.publishedAt" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostList",
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      users: this.$store.state.users,
    };
  },
  methods: {
    getUserById (userId) {
      return this.$store.getters.user(userId);
    },
  },
};
</script>

<style>
</style>
