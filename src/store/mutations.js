import { setStore,removesetStore } from '@/lib/Auxli'

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
        if(token) {
            setStore(token)
        }
        else {
            removesetStore()
        }
    },

    set_theme(state, theme) {
        state.theme = theme
    },

    set_SettingMenu(state, SettingMenu) {
        state.SettingMenu = SettingMenu
    }

}



export default mutations