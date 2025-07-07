import { createAuthClient } from 'better-auth/vue'
import { usernameClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  baseURL: 'http://localhost:4000',
  plugins: [ 
    usernameClient()
  ]
})
