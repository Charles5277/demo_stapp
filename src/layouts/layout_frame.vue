<template>
  <q-layout view="hHh lpR lFr">
    <q-header reveal bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          size="lg"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title
          class="text-center text-weight-bold q-my-md q-pa-none"
          style="font-size: 25px"
        >
          即時同步語音翻譯系統
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      behavior="mobile"
      :width="300"
      style="
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      "
    >
      <q-field borderless bg-color="primary" style="align-items: center">
        <template #control>
          <div
            class="text-white q-ml-md"
            style="font-size: 20px; font-weight: bold"
          >
            功能選單
          </div>
        </template>
      </q-field>
      <q-list bordered class="full-height" style="position: relative">
        <q-item v-if="!userGoogle" clickable v-ripple :to="{ name: 'login' }">
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white" icon="home" />
          </q-item-section>

          <q-item-section>登入</q-item-section>
        </q-item>

        <q-item clickable v-ripple :to="{ name: 'lobby' }">
          <q-item-section avatar>
            <q-avatar color="positive" text-color="white" icon="key" />
          </q-item-section>

          <q-item-section>免驗證存取</q-item-section>
        </q-item>

        <q-item
          v-if="userGoogle"
          clickable
          v-ripple
          @click="logout_google()"
          class="full-width"
          style="position: absolute; bottom: 0"
        >
          <q-item-section avatar>
            <q-avatar color="negative" text-color="white" icon="logout" />
          </q-item-section>

          <q-item-section>登出</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
  import { ref, inject } from 'vue';
  import { useRouter } from 'vue-router';
  import { signOut } from 'firebase/auth';
  import { auth } from '../firebase';

  const router = useRouter();
  const userGoogle = inject('userGoogle');

  const leftDrawerOpen = ref(false);

  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value;
  };

  // - Google登出
  const logout_google = () => {
    signOut(auth)
      .then(() => {
        console.log(userGoogle);
        router.push({ name: 'login' });
      })
      .catch((err) => {
        console.log(err);
      });
  };
</script>
