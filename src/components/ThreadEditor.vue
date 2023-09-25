<template>
  <form @submit.prevent="save">
              <div class="form-group">
                <label for="thread_title">Title:</label>
                <input type="text" v-model="form.title" id="thread_title" class="form-input" name="title" >
              </div>

              <div class="form-group">
                <label for="thread_content">Content:</label>
                <textarea id="thread_content" v-model="form.text" class="form-input" name="content" rows="8" cols="140"></textarea>
              </div>

              <div class="btn-group">
                <button @click="$emit('cencel')" class="btn btn-ghost">Cancel</button>
                <button class="btn btn-blue" type="submit" name="Publish">{{ existing? 'Update': 'Publish' }} </button>
              </div>
          </form>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      form: {
        title: this.title,
        text: this.text
      }
    }
  },
  computed: {
    existing () {
      return !!this.title
    }
  },
  methods: {
    save () {
      this.$emit('save', {
        ...this.form
      })
    }
  }
}
</script>

<style>

</style>
