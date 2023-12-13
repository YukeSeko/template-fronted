<template>
  <a-layout class="layout-demo">
    <a-layout>
      <a-layout-sider hide-trigger
                      collapsible
                      :collapsed="collapsed">
        <a-menu
            :defaultOpenKeys="['1']"
            :defaultSelectedKeys="['0_3']"
            :style="{ width: '100%' }"
            @menuItemClick="onClickMenuItem"
        >
          <a-menu-item key="0" disabled>
            <div>
              <a-space>
                <img
                    alt="logo"
                    src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"
                />
                <a-typography-title
                    :style="{ margin: 0, fontSize: '18px' }"
                    :heading="5"
                >
                  XXX 系统
                </a-typography-title>
              </a-space>
            </div>
          </a-menu-item>
          <a-menu-item key="0_1" disabled>
            <IconHome/>
            Menu 1
          </a-menu-item>
          <a-menu-item key="0_2">
            <IconCalendar/>
            Menu 2
          </a-menu-item>
          <a-menu-item key="0_3">
            <IconCalendar/>
            Menu 3
          </a-menu-item>
          <a-sub-menu key="1">
            <template #title>
              <span><IconCalendar/>Navigation 1</span>
            </template>
            <a-menu-item key="1_1">Menu 1</a-menu-item>
            <a-menu-item key="1_2">Menu 2</a-menu-item>
            <a-sub-menu key="2" title="Navigation 2">
              <a-menu-item key="2_1">Menu 1</a-menu-item>
              <a-menu-item key="2_2">Menu 2</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="3" title="Navigation 3">
              <a-menu-item key="3_1">Menu 1</a-menu-item>
              <a-menu-item key="3_2">Menu 2</a-menu-item>
              <a-menu-item key="3_3">Menu 3</a-menu-item>
            </a-sub-menu>
          </a-sub-menu>
          <a-sub-menu key="4">
            <template #title>
              <span><IconCalendar/>Navigation 4</span>
            </template>
            <a-menu-item key="4_1">Menu 1</a-menu-item>
            <a-menu-item key="4_2">Menu 2</a-menu-item>
            <a-menu-item key="4_3">Menu 3</a-menu-item>
          </a-sub-menu>
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
          <a-breadcrumb :style="{ margin: '16px 0' }">
            <a-breadcrumb-item>Home</a-breadcrumb-item>
            <a-breadcrumb-item>List</a-breadcrumb-item>
            <a-breadcrumb-item>App</a-breadcrumb-item>
          </a-breadcrumb>
          <a-layout-content>
            <router-view/>
          </a-layout-content>
        </a-layout>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import {ref} from "vue";
import GlobalHeader from "@/components/GlobalHeader";

const collapsed = ref(false);
const onCollapse = () => {
  collapsed.value = !collapsed.value;
};
</script>
<style scoped>
.layout-demo {
  height: 100vh;
}
</style>
