<template>
  <div>
    <div
      v-for="(leftNav, index) in leftNavList"
      :key="index"
      @click="handleClick(item)"
      class="leftNav"
    >
      { item.title }
    </div>
    <div v-for="(leftNav, index) in leftNavList" :key="index" class="view-box">
      <div>
        <div
          v-for="(tab, index) in tabsList"
          :key="index"
          class="tab-item"
          :id="`
          ${leftNav.id}-${tab.categoryCode}
        `"
          :ref="`
          ${leftNav.id}-${tab.categoryCode}
        `"
          @click="tabClick(tab)"
        ></div>
      </div>
    </div>
    <!-- <div
      v-for="(tab, index) in tabsList"
      :key="index"
      class="tab-item"
      :id="`
        ${item.id}-${tab.categoryCode}
      `"
      :ref="`
        ${item.id}-${tab.categoryCode}
      `"
      @click="tabClick(tab)"
    >
      <div>{ item.categoryName }</div>
      <div>{ item.categoryCode }</div>
      <div>{ item.productType }</div>
    </div> -->
    <!-- <div>
      <div
        v-for="(shop, index) in shopList"
        :key="index"
        :id="`
          ${item.id}-
          -${shop.shopId}
          ${shop.shopId}
        `"
        :ref="`
          ${item.id}-
          -${shop.shopId}
          ${shop.shopId}
        `"
      >
        { item }
      </div>
    </div> -->
  </div>
</template>

<script setup>
const leftNavList = ref([
  {
    title: "热卖",
    id: 1,
    tabs: [
      {
        categoryCode: "3181002",
        categoryName: "必买爆款",
        skuCodes: ["1060060", "1060069", "1060072", "1060075"],
        productType: "NORMAL_PRODUCT",
        shopList: [],
      },
    ],
  },
  {
    title: "白酒",
    id: 2,
  },
  {
    title: "洋酒",
    id: 3,
  },
]);

const refList = ref([]);
const handleClick = (item) => {
  // console.log(item);
  // 跳转到对应的tab
  const tab = document.getElementById(`${item.id}-${tabsList[0].categoryCode}`);
  tab.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};
const tabClick = (tab) => {
  // 跳转到对应的shop列表
  const shop = document.getElementById(
    `${tab.categoryCode}-${shopList[0].shopId}`
  );
  shop.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};
</script>
