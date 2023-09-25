<template>
  <div class="col-full">
      <div class="forum-list">
          <h2 class="list-title">
              <router-link :to="{name: 'category', params: {id: categoryId}}">{{ categoryName }}</router-link>
          </h2>
          <div class="forum-listing" v-for="forum in forums" :key="forum.id">
              <div class="forum-details">
                  <router-link :to="{name: 'forum', params: {id: forum.id}}" class="text-xlarge" >{{ forum.name }}</router-link>
                  <p>{{ forum.description }}</p>
              </div>

              <div class="threads-count">
                  <p><span class="count">{{ forum.threads?.length }}</span> {{ forum.threads?.length? forum.threads?.length > 1 ? 'Threads' : 'Thread' : 'no Threads' }}</p>
              </div>

              <div class="last-thread">
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    forums: {
      type: Array,
      required: true
    },
    categoryName: {
      type: String,
      default: 'Forum'
    },
    categoryId: {
      type: String,
      required: true
    }
  }
}
</script>

<style>

</style>
