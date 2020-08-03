import { http } from '@/utils/http'

export default {

    async authorize(client, token) {
        return await http.post('auth/guest', client, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
    }

}
