import { getStore } from '@/lib/Auxli'

const getters = {
    get_openKeys: state => state.openKeys,
    get_defaultSelectedKeys: state => state.defaultSelectedKeys,
    get_selectedKeys: state => state.selectedKeys,
    get_Token: state => state.Token || getStore()

}


export default getters



