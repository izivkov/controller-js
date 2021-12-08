/*
 * Developed for the OpenBot project (https://openbot.org) by:
 *
 * Ivo Zivkov
 * izivkov@gmail.com
 *
 * Date: Mon Nov 29 2021
 */

export class ErrorDisplay {

    constructor () {
        
        this.set = (text) => {
            document.getElementById ('error-message').textContent = text
        }

        this.reset = () => this.set ('')

        this.reset()
    }
}
