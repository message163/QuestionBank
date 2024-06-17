import { getRouters } from "@/apis/route";
import { defineStore } from 'pinia'
import { computed, ref } from "vue";
import { defineAsyncComponent } from "vue";
interface Menu {
    title: string
    authority: number
    icon: string
    id: number
    children: {
        title: string
        id: number
        path: string
        componentUrl: string
        name: string
        icon: string
        parentId: number | null
        order: number
        type: number
        authority: number
        children?: Menu[]
        component: () => Promise<typeof import('*.vue')>
    }[]
}
const execRouter = (routers: Menu[]): Menu[] => {
    routers.forEach((item) => {
        item.children.forEach((child) => {
            child.component = () => defineAsyncComponent(() => import(/* @vite-ignore */child.componentUrl))
        })
    })
    return routers
}
export default defineStore('__MENU__', () => {
    let menu = ref<Menu[]>([])
    const getRoutersList = async () => {
        const { data } = await getRouters<{ data: Menu[] }>()
        menu.value = execRouter(data)
    }
    const menuList = computed(() => menu.value)
    return {
        getRoutersList,
        menu,
        menuList
    }
}, {
    persist: {
        storage: sessionStorage
    }
})