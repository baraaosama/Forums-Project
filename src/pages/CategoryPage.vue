<template>
    <h1>{{ category.name }}</h1>
    <forum-list
      :categoryName="category.name"
      :forums="categoryForms(category.id)"
      :categoryId="category.id"
    />
</template>

<script>
import ForumList from '@/components/ForumList.vue'
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: { ForumList },
  methods: {
    categoryForms (id) {
      return this.$store.state.forums.filter(forum => forum.categoryId === id)
    }
  },
  computed: {
    category () {
      return this.$store.state.categories.find(category => category.id === this.id)
    }
  }
}
</script>

<style>

</style>
