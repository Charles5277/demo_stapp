<template>
  <q-page class="flex flex-center">
    <q-form class="full-width q-px-xl" @submit.prevent="login">
      <label class="text-info-input q-mb-sm">帳號</label>
      <q-input
        v-model="username"
        placeholder="請輸入帳號"
        outlined
        bg-color="white "
        :input-style="{ fontSize: '20px' }"
      >
        <template #prepend>
          <q-icon name="badge" />
        </template>
      </q-input>
      <div class="y-spacer"></div>
      <label class="text-info-input q-mb-sm">密碼</label>
      <q-input
        v-model="password"
        :type="isPwd ? 'password' : 'text'"
        placeholder="請輸入密碼"
        outlined
        bg-color="white"
        :input-style="{ fontSize: '20px' }"
      >
        <template #prepend>
          <q-icon name="lock" />
        </template>
        <template #append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <div class="y-spacer"></div>
      <div class="row">
        <div class="col-12">
          <q-btn
            class="full-width"
            color="primary"
            label="登入"
            rounded
            size="xs"
            type="submit"
            style="font-size: 20px; font-weight: bold"
            @click="login()"
          ></q-btn>
        </div>
      </div>
      <div class="row q-mt-lg">
        <div class="col-12 q-pr-md">
          <q-btn
            class="full-width"
            color="positive"
            label="以Google登入"
            no-caps
            rounded
            size="xs"
            style="font-size: 20px; font-weight: bold"
            @click="access_google()"
            v-if="!userGoogle"
          ></q-btn>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
  import { ref, inject } from 'vue';
  import { useRouter } from 'vue-router';
  import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
  import { auth } from '../firebase';

  const api = inject('api');
  const userGoogle = inject('userGoogle');
  const router = useRouter();

  const username = ref('');
  const password = ref('');
  const isPwd = ref(true);

  const login = () => {
    api
      .post('/login', {
        username: username.value,
        password: password.value,
      })
      .then(() => {
        console.log('login success');
        router.push({ name: 'lobby' });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // - Google登入
  const access_google = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    signInWithPopup(auth, provider)
      .then((user) => {
        console.log(user);
        console.log('login google success');
        router.push({ name: 'lobby' });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // - Google登出
  const logout_google = () => {
    signOut(auth)
      .then(() => {
        console.log(userGoogle);
      })
      .catch((err) => {
        console.log(err);
      });
  };
</script>
