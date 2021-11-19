/**
 * Random helpers
 */
export class rndHelpers {

    /**
     * Random boolean with a percent ratio
     * @param percent
     */
    static randomBool(percent:number=0.5):boolean{
        return Math.random()<percent;
    }

    /**
     * Random integer between two values.
     * @param a (number) : From this value to the second value. If the second is ommited, this value is the max value.
     * @param b (number) : To this value. If this is ommited.
     */
    static randomInt(a:number, b?:number):number{
        if(b===undefined){return this.randomInt(0,a);}

        return Math.floor(Math.random() * (b - a + 1) + a);
    }

    /**
     * Random integer between -max and max value.
     * @param max (number) : determine the limits.
     * @param zero (bool) : determine if zero is allowed or not.
     */
    static randomIntSym(max:number, zero?:boolean):number{
        if(zero===false){
            return this.randomBool()?this.randomInt(1,max):-this.randomInt(1,max);
        }else{
            return this.randomInt(-max, max);
        }
    }

    static randomArray(arr: any[], number?:number):any[]{
        if(number===undefined){number = 1}

        // Return a clone array
        if(arr.length<=0){return Object.values(arr)}

        // Randomize the array and return the n first elements.
        return rndHelpers.shuffleArray(arr).slice(0,number);
    }

    static randomItem(arr: any[]): any{
        if(arr.length===0){return ''}
        return this.randomArray(arr, 1)[0]
    }

    static shuffleArray(arr: any[]): any[] {
        // The Fisher-Yates algorithm
        let shuffleArray = Object.values(arr)
        for (let i = shuffleArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = shuffleArray[i];
            shuffleArray[i] = shuffleArray[j];
            shuffleArray[j] = temp;
        }

        return shuffleArray;
    }

}