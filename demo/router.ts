import {createMemoryHistory, createRouter} from 'vue-router'
import {routePages} from "./routePages"

const routes = [
    ...routePages,
    { path: '/', component: ()=>import('./Pages/index.vue') },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router