<template>
    <div @click="$emit('keySelected', value)">{{ value }}</div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  }
};
</script>
<style src="../assets/stylesheets/keys.css"></style>