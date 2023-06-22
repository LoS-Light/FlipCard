
export default class Coroutine {

    static async run(asyncFunc) {
        await asyncFunc();
    }

    static waitForSeconds(seconds) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(), 1000 * seconds);
        });
    }
}