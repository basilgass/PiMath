import {Point, Triangle} from "../src"

const { createApp, ref } = Vue

createApp({
	setup() {
		const message = ref('Hello vue!')

        const A = new Point(4,4)
        const B = new Point(6, 10)
        const C = new Point(10,2)

        const T = new Triangle().fromPoints(A, B, C)
        
		return {
			message
		}
	}
}).mount('#app')
