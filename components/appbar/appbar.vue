<template>
  <div class="appbar">
    <div style="width: 300px">
      <v-text-field
        density="compact"
        label="Compact"
        placeholder="Compact"
        variant="outlined"
      ></v-text-field>
    </div>
    <!-- <div class="login">
      <div>登陆</div>
      <div>注册</div>
    </div> -->
    <div class="is_login">
      <v-menu transition="slide-x-transition">
        <template v-slot:activator="{ props }">
          <v-avatar>
            <v-img
              v-bind="props"
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            ></v-img>
          </v-avatar>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>xxx</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>
<style lang="scss">
.appbar {
  width: 95%;
  margin:0 auto;
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
