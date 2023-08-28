<template>
  <q-page class="flex flex-center">
    <div>
      <q-form class="full-width q-px-xl">
        <div
          class="full-width text-center q-mb-md"
          style="font-size: 32px; font-weight: bold"
        >
          聊天室
        </div>
        <label class="text-info-input q-mb-sm">房號</label>
        <q-input
          v-model="roomId"
          placeholder="請輸入房號"
          outlined
          bg-color="white "
          :input-style="{ fontSize: '20px' }"
        >
          <template #prepend>
            <q-icon name="meeting_room" />
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

        <q-btn
          class="full-width"
          color="primary"
          label="加入"
          rounded
          size="xs"
          type="submit"
          style="font-size: 20px; font-weight: bold"
        ></q-btn>
        <div class="y-spacer"></div>
        <q-btn
          class="full-width"
          color="positive"
          label="創建房間"
          rounded
          size="xs"
          type="submit"
          style="font-size: 20px; font-weight: bold"
          :to="{ name: 'room' }"
        ></q-btn>
      </q-form>
    </div>
    <div>
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          <span>{{ todo.text }}</span>
        </li>
      </ul>
    </div>
  </q-page>
</template>

<script setup>
  import { ref } from 'vue';
  import { db } from '../firebase';
  import { ref as dbRef } from 'firebase/database';
  import { useDatabaseList } from 'vuefire';

  const todos = useDatabaseList(dbRef(db, 'numbers'));
  console.log(todos);

  // const numbersRef = databaseRef(db, 'numbers');
  // numbersRef.push({
  //   toto: '123',
  // });

  // const numberList = useDatabaseList(numbersRef);

  const roomId = ref('test'); // 房號
  const password = ref('123'); // 密碼
  const isPwd = ref(false); // 是否顯示密碼
</script>
