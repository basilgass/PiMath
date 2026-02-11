import type {RouteRecordRaw} from "vue-router"

const pages = import.meta.glob('./Pages/**/*.vue')

export const routePages: RouteRecordRaw[] = Object
    .entries(pages)
    .map(
        ([path]) => {
            const routePath = path
                .replace('./Pages', '')
                .replace(/\.vue$/, '')
                .replace(/\/index$/i, '') || "/"

            return {
                path: routePath.toLowerCase(),
                component: pages[path],
                name: routePath.toLowerCase().split('/').pop()
            }
        }
    )