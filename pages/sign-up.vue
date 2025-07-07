<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'
import { authClient } from '~/lib/auth-client'

const schema = z.object({
  username: z.string().min(3, 'ログインIDが入力されていません'),
  password: z.string().min(8, 'パスワードが入力されていません')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  username: undefined,
  password: undefined
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  const data = await authClient.signUp.email({
    email: event.data.username + '@demmymail.com',
    name: 'dammy',
    username: event.data.username,
    password: event.data.password,
    displayUsername: 'dammy',
  })
  console.log('sign up', data)
}
</script>
<template>
  <UCard class="w-full max-w-sm">
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="ログインID" name="username">
        <UInput v-model="state.username" class="w-full" />
      </UFormField>

      <UFormField label="パスワード" name="password">
        <UInput v-model="state.password" type="password" class="w-full" />
      </UFormField>

      <UButton type="submit" block>ログイン</UButton>
    </UForm>
  </UCard>
</template>
