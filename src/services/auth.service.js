import { http } from '@/utils/http'

export default {

    async signIn(credentials) {
        return await http.post('auth/signin', credentials)
    }

}
