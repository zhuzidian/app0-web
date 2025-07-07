<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'
import { authClient } from '~/lib/auth-client'

const router = useRouter()

const schema = z.object({
  username: z.string().min(3, 'ログインIDが入力されていません'),
  password: z.string().min(8, 'パスワードが入力されていません')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  username: undefined,
  password: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { data, error } = await authClient.signIn.username({
    username: event.data.username,
    password: event.data.password,
    rememberMe: true,
  })
  console.log('sign in', data)

  if (!error) {
    router.push('/home')
  }
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
