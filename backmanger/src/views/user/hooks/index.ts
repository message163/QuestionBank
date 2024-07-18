import { getUserList } from '@/apis/user/index'
import { ref } from 'vue'
import type { UserList } from '@questionbank/config/user/index.ts'
import { userLevalList } from '@questionbank/config/user/index.ts'
export const useUser = () => {
    let data = ref<UserList[]>([])
    const getList = async () => {
        const res = await getUserList<{ data: UserList[] }>()
        res.data.forEach((item: UserList) => {
            item.showpopover = false
        })
        data.value = res.data
    }
    const getLeval = (id: number) => {
        return userLevalList.find((v) => v.id === id)?.name ?? ''
    }
    getList()
    return {
        getList,
        getLeval,
        data
    }
}