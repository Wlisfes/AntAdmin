// import { CRYPTO_KEY } from '@/lib/cofn'
// import { aesDecrypt } from '@/lib/Auxli'

const getters = {
    get_openKeys: state => state.openKeys,
    get_defaultSelectedKeys: state => state.defaultSelectedKeys,
    get_selectedKeys: state => state.selectedKeys,
    get_Token: state => state.Token

}


export default getters



