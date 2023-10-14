<template>
  <v-row style="height: 100%;" align="center" justify="center">
    <v-col>

      <v-card :disabled="isSubmitting" style="height: 380px;">
        <v-card-title>
          You must login
        </v-card-title>
        <v-form @submit.prevent="logUser" ref="myForm">
          <v-card-item>

            <v-text-field :rules="[rules.email]" v-model="user.email" label="E-mail" required></v-text-field>
            <v-text-field :rules="[rules.password]" v-model="user.password" label="Password" type="password"
              required></v-text-field>
            <v-card-actions>

              <v-btn variant="flat" color="indigo" type="submit" :loading="isSubmitting" block elevated>Login</v-btn>
            </v-card-actions>
          </v-card-item>
        </v-form>
        <v-card-item>
          <v-alert type="error" v-model="loginFailed" dismissible elevation="2" :text="msg">
          </v-alert>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { IUserSession } from '@/types/user';
import { VForm } from 'vuetify/components';

definePageMeta({
  layout: "login-layout",
});

const user = ref({ email: "", password: "" });
const loginFailed = ref(false);
const isSubmitting = ref(false);

const msg = ref("");

const myForm = ref(VForm);

const userSession = useUserSession();

const rules = ref({
  email: (value: any) => !value ? 'Required.' : value.length > 3 || 'Too short',
  password: (value: any) => !value ? 'Required.' : value.length > 3 || 'Too short',
})

async function logUser() {
  console.log('Login')

  const { valid } = await myForm.value.validate();
  if (!valid) return;

  if (isSubmitting.value) return;
  isSubmitting.value = true;
  loginFailed.value = false;
  try {
    console.log('fetching')
    const { data, error, status } = await useFetch<IUserSession>('/api/auth/login', { method: 'POST', watch: false, body: user.value, server: false })
    if (status.value === "success") {
      userSession.value = data.value!;

      navigateTo('/')
    } else {
      if (error.value?.statusCode === 409) {
        navigateTo('/')
        return
      } else
        if (error.value?.statusCode === 400) {
          msg.value = "User or password incorrect"
          loginFailed.value = true;
        } else if (error.value?.statusCode === 500) {
          msg.value = "Something went wrong"
          loginFailed.value = true;
        }
    }
  } catch (err) {
    console.error(err);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.v-card {
  max-width: 400px;
  margin: 0 auto;
}
</style>