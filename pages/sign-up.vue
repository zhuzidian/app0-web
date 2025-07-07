<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'
import { authClient } from '~/lib/auth-client'

const schema = z.object({
  username: z.string().min(1, 'ログインIDが入力されていません'),
  password: z.string().min(8, 'パスワードが入力されていません'),
  displayUsername: z.string().min(1, '表示名が入力されていません'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  username: undefined,
  password: undefined,
  displayUsername: undefined,
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  const data = await authClient.signUp.email({
    email: event.data.username + '@demmymail.com',
    name: 'dammy',
    username: event.data.username,
    password: event.data.password,
    displayUsername: event.data.displayUsername,
  })
  console.log('sign up', data)
}
</script>
<template>
  <UCard class="w-full max-w-sm">
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="ログインID" name="username" required>
        <UInput v-model="state.username" class="w-full" />
      </UFormField>

      <UFormField label="パスワード" name="password" required help="8桁以上、30桁以下の英数字">
        <UInput v-model="state.password" type="password" class="w-full" />
      </UFormField>

      <UFormField label="表示名" name="displayUsername" required>
        <UInput v-model="state.displayUsername" class="w-full" />
      </UFormField>

      <UButton type="submit">登録</UButton>
    </UForm>
  </UCard>
</template>
