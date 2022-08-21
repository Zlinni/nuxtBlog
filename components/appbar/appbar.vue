<template>
  <div class="appbar">
    <div style="width: 300px">
      <v-text-field density="compact" label="Compact" placeholder="Compact" variant="outlined" hide-details>
      </v-text-field>
    </div>
    <!-- <div class="login">
      <div>登陆</div>
      <div>注册</div>
    </div> -->
    <div class="is_login">
      <v-menu transition="slide-x-transition">
        <template v-slot:activator="{ props }">
          <v-avatar>
            <v-img v-bind="props" :src="avatarImg" :alt="userName" width="100%"></v-img>
          </v-avatar>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title @click="toLogin" class="pointer">{{ listTitle }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
let avatarImg = ref<string>('');
let userName = ref<string>('');
let listTitle = computed<string>(() => {
  return userName.value !== 'Guest' ? '登出' : '登陆'
})
const toLogin = (): void => {
  if (userName.value !== 'Guest') {
    // 登出清除所有相关内容 此时回退会产生bug
    // TODO 回退bug 
    useMenus().value = [];
    useCookie("token").value = null
    useCookie("userName").value = null
    useCookie("avatar").value = null
    useCookie("userId").value = null
  }
  useRouter().push('/login')
}
onMounted(() => {
  avatarImg.value = useTransImg(useCookie('avatar').value ?? '../../img/head/waku.png')
  userName.value = useCookie('userName').value ?? 'Guest'
})
</script>


<style lang="scss">
.pointer{
  cursor:pointer
}
.appbar {
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .login {
    display: flex;
    gap: 20px;
    align-items: center;
  }
}
</style>
