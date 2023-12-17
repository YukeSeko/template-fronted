<template>
  <a-space direction="vertical" fill>
    <a-descriptions :data="data" title="用户基本信息" bordered/>
    <a-button type="primary" status="danger" @click="loginOut">退出登录</a-button>
  </a-space>

</template>

<script lang="ts" setup >
import {useUserStore} from "@/store";
import {clearToken} from "@/utils/auth";
import {Modal} from "@arco-design/web-vue";

const userStore =useUserStore()
const data = [{
  label: '账号',
  value: userStore.userAccount,
}, {
  label: '用户名',
  value: userStore.userName,
}, {
  label: '邮箱',
  value: userStore.email
}, {
  label: '用户角色',
  value: userStore.userRole,
}];

const loginOut = async () =>{
  Modal.error({
      title: '退出登录',
      content:'您确定要退出吗？',
      okText: '退出登录',
      closable:true,
      async onOk() {
          const userStore = useUserStore();
          await userStore.logout();
          window.location.reload();
      },
  });
}
</script>
