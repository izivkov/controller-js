/*
 * Developed for the OpenBot project (https://openbot.org) by:
 *
 * Ivo Zivkov
 * izivkov@gmail.com
 *
 * Date: Mon Nov 29 2021
 */

import { WebRTC } from './webrtc.js'
export class BotMessageHandler {

    constructor(connection) {
        const webRtc = new WebRTC(connection)

        this.handle = (msg) => {

            const msgType = Object.keys(msg)[0]
            switch (msgType) {
                case 'VIDEO_PROTOCOL':
                    break

                case 'VIDEO_COMMAND':
                    switch (msg.VIDEO_COMMAND) {
                        case 'START':
                            webRtc.start()
                            break

                        case 'STOP':
                            webRtc.stop()
                            break
                    }
                    break

                case 'WEB_RTC_EVENT':
                    const webrtcEvent = msg.WEB_RTC_EVENT
                    webRtc.handle(webrtcEvent, connection)
                    break

                default:
                    // process other status information here
                    // This can be used ti enhance the UI, for example
                    // do display a blinking sigan indicator, etc
                    break
            }

        }
    }
}
