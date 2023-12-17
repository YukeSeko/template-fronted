<template>
  <a-layout class="layout-demo">
    <a-layout>
      <a-layout-sider hide-trigger
                      collapsible
                      :collapsed="collapsed">
        <a-menu
            :style="{ width: '100%' }"
            @menuItemClick="doMenuClick"
        >
          <a-menu-item v-for="item in visibleRoutes" :key="item.path">
            <template v-if="item.children" #title>{{ item.name }}</template>
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout-content>
        <a-layout-header style="padding-left: 20px;">
          <a-button shape="round" @click="onCollapse">
            <IconCaretRight v-if="collapsed"/>
            <IconCaretLeft v-else/>
          </a-button>
        </a-layout-header>
        <a-layout style="padding: 0 24px;">
          <a-layout-content>
            <router-view/>
          </a-layout-content>
        </a-layout>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import {compile, computed, h, ref} from "vue";
import router, {routes} from "@/router";
import {useUserStore} from "@/store";
import {RouteRecordRaw} from "vue-router";

const userStore = useUserStore();
const collapsed = ref(false);
const onCollapse = () => {
  collapsed.value = !collapsed.value;
};


const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    if (userStore.userAccount!=undefined && item.meta?.requiresAuth){
      //如果需要认证的话吗，则进行权限校验
      const cloneRouters = item.meta?.roles as Array<string>;
      if (!cloneRouters.some(el => el === userStore.userRole)) {
        return false;
      }
    }
    return true;
  });
});
</script>
<style scoped>
.layout-demo {
  height: 100vh;
}
</style>
