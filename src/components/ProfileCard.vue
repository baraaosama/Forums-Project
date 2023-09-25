<template>
  <div class="profile-card">
                  <p class="text-center">
                      <img :src="user.avatar" alt=""
                           class="avatar-xlarge">
                  </p>
                  <h1 class="title">{{ user.username }}</h1>
                  <p class="text-lead">{{ user.name }}</p>
                  <p class="text-justify">
                      {{ user.bio || 'No bio specified.' }}
                  </p>
                  <span class="online">{{ user.username }} is online</span>
                  <div class="stats">
                      <span>{{ postsCount }} posts</span>
                      <span>{{ threadsCount }} threads</span>
                  </div>
                  <hr>
                  <p v-if="user.website" class="text-large text-center"><i class="fa fa-globe"></i> <a href="#">{{user.website}}</a></p>
              </div>
              <p class="text-xsmall text-faded text-center">Member since june 2003, last visited 4 hours ago</p>

              <div class="text-center">
                <hr>
                <router-link :to="{name: 'ProfileEdit'}" class="btn-green btn-small">Edit Profile</router-link>
              </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    postsCount () {
      return this.user.postsCount || 0;
    },
    threadsCount () {
      return this.user.threads.length;
    },
    userPosts () {
      return this.$store.state.posts.filter(post => post.userId === this.user.id);
    }
  },
}
</script>

<style>

</style>
