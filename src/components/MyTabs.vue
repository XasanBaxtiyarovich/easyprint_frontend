<template>
  <div class="my-tabs">
    <div class="tabs">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        class="tab"
        :class="{ active: activeTab === index }"
        @click="setProduct(index)"

      >
        {{ tab.name }}
      </div>
    </div>
    <div class="tab-content">
      <slot :name="tabs[activeTab].slotName"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyTabs",
  data() {
    return {
      activeTab: 0,
      tabs: [
        { name: 'T-shirts', slotName: 'tab1' },
        { name: 'Sweatshirts', slotName: 'tab2' },
        { name: 'Hoodies', slotName: 'tab3' },
        { name: 'Accessories', slotName: 'tab4' }
      ]
    };
  },
  methods:{
    setProduct(index){
        this.activeTab = index
        this.$emit('getProduct', index+1)
    }
  }
};
</script>

<style scoped>
.my-tabs {
  width: 100%;
}

.tabs {
  display: flex;
  justify-content: center;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.tab {
  padding: 10px 20px;
  cursor: pointer;
  border: 1px solid transparent;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  transition: border-color 0.3s, background-color 0.3s;
}

.tab:hover {
  background-color: #e0e0e0;
}

.tab.active {
  background-color: #ffffff;
  border-color: #ccc;
}

.tab-content {
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 5px 5px;
  padding: 20px;
}
</style>
