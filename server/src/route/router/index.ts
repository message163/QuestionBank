export const Router = [
    {
        title: '首页',
        authority: 1,
        icon: 'PieChart',
        id: 1,
        children: [
            {
                title: '驾驶舱',
                path: '/page/home',
                name: 'home',
                componentUrl: '@/views/home/index.vue',
                id: 2,
                icon: 'home',
                order: 1,
                type: 1,
                authority: 1,
                parentId: 1
            }
        ]
    },
    {
        title: '课程管理',
        authority: 1,
        icon: 'Reading',
        id: 3,
        children: [
            {
                title: '课程列表',
                path: '/page/course',
                name: 'course',
                componentUrl: '@/views/course/index.vue',
                id: 4,
                icon: 'book',
                order: 2,
                type: 1,
                parentId: 3,
                authority: 1,
            }
        ]
    },
    {
        title: '题库管理',
        authority: 1,
        icon: 'Tickets',
        id: 5,
        children: [
            {
                title: '题库列表',
                path: '/page/question',
                name: 'question',
                componentUrl: '@/views/question/index.vue',
                id: 6,
                icon: 'tickets',
                order: 3,
                type: 1,
                parentId: 5,
                authority: 1,
            }
        ]
    },
    {
        title: '知识点管理',
        authority: 1,
        icon: 'Star',
        id: 7,
        children: [
            {
                title: '知识点列表',
                path: '/page/knowledge',
                name: 'knowledge',
                componentUrl: '@/views/knowledge/index.vue',
                id: 8,
                icon: 'tickets',
                order: 4,
                type: 1,
                parentId: 7,
                authority: 1,
            }
        ]
    },
    {
        title: '学科管理',
        authority: 1,
        icon: 'Notebook',
        id: 9,
        children: [
            {
                title: '学科列表',
                path: '/page/subject',
                name: 'subject',
                componentUrl: '@/views/subject/index.vue',
                id: 10,
                order: 4,
                type: 1,
                parentId: 9,
                authority: 1,
            }
        ]
    }
]