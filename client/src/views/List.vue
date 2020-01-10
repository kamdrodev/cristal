<template>
   <vs-row vs-w="12">
    <vs-col vs-justify="center" vs-align="center" vs-xs="12" vs-sm="12" vs-lg="8" vs-offset="2">
      <vs-row vs-w="12">
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-xs="12" vs-sm="12" vs-lg="12" >
          <div class="panel-list">
            <vs-button class="btn" @click="">Add word</vs-button>
          </div>
        </vs-col>
      </vs-row>
    </vs-col>
  </vs-row>

</template>

<script>
export default {
  name: "List",
  async beforeCreate() {
    console.log(this.$route.params.id)
  },
  created() {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .panel-list {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    margin: 12px 12px;
    padding: 26px 26px;
    height: 76px;
    border-radius: 16px;
    background-color: var(--panel-lists-background-color) !important;
    box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  }
</style>
