<template>
    <forum-list
      v-for="category in categories"
      :key="category.id"
      :categoryName="category.name"
      :forums="categoryForms(category.id)"
      :categoryId="category.id"
    />
</template>

<script>
import ForumList from './ForumList.vue'
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  components: { ForumList },
  methods: {
    categoryForms (id) {
      return this.$store.state.forums.filter(forum => forum.categoryId === id)
    }
  }
}
</script>

<style>

</style>
