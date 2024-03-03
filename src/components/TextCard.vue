<template>
  <p class="font-weight-bold mb-0">
    {{bold_text}}
  </p>
  <p>
    {{tin_text}}
  </p>
</template>

<script>
export default {
  props: ['bold_text', 'tin_text']
}
</script>