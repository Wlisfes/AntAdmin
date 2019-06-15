// import { CRYPTO_KEY } from '@/lib/cofn'
// import { aesEncrypt } from '@/lib/Auxli'

const mutations = {
    set_openKeys: (state, key) => {
        state.openKeys = key
    },

    set_defaultSelectedKeys(state, key) {
        state.defaultSelectedKeys = key
    },

    set_selectedKeys(state, key) {
        state.selectedKeys = key
    },

    set_Token(state, token) {
        state.Token = token
    }

}



export default mutations