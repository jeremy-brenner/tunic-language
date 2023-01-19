<template>
  <div class="centerLineToggle" @click="toggleCenterLine" >
    Center Line: {{ enabled ? "enabled" : "disabled" }}
  </div>
</template>
<script>
export default {
  name: 'CenterLineToggle',
  components: { },
  props: ['modelValue'],
  emits: ['update:modelValue'],
  data: function() {
    return {
      enabled: true
    }
  },
  methods: {
    toggleCenterLine: function() {
      this.enabled = !this.enabled;
      this.$emit('update:modelValue', this.enabled)
    }
  }
}
</script>
<style scoped>
.centerLineToggle {
  cursor: pointer;
  user-select: none; 
}
</style>