<template>
  <div class="container">
    <vs-row vs-w="12">
    <vs-col vs-justify="center" vs-align="center" vs-xs="12" vs-sm="12" vs-lg="12">
        <vs-row vs-w="12">
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-xs="12" vs-sm="12" vs-lg="8" class="panel-list">

          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-xs="12" vs-sm="12" vs-lg="4" class="panel-list">
              <vs-button class="btn" @click="" type="border" icon="post_add" size="large">New word</vs-button>
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>
  </div>
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
    height: 100px;
    border-radius: 16px;
    background-color: var(--panel-lists-background-color) !important;
    box-shadow:0 1px 4px rgba(55, 25, 22, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    margin-bottom: 26px;
  }
</style>
