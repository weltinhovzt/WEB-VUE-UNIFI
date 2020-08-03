import { http } from '@/utils/http'

export default {

    async signUp(credentials) {
        return await http.post('auth/signup', credentials);
    }

}
