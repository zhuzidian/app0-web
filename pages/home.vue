<script setup lang="ts">
import { authClient } from '~/lib/auth-client'

const session = authClient.useSession()
</script>
<template>
  <div>
    hello {{ session.data?.user.username }}
  </div>
</template>
