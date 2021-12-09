/*
 * Developed for the OpenBot project (https://openbot.org) by:
 *
 * Ivo Zivkov
 * izivkov@gmail.com
 *
 * Date: Mon Nov 29 2021
 */

export class Buttons {
    constructor(connection) {
        // mirror button
        const toggleMirror = () => {
            connection.send(JSON.stringify({ command: "TOGGLE_MIRROR" }))
        }

        const mirrorButton = document.getElementById('mirror_button')
        mirrorButton.onclick = toggleMirror

        // sound button
        const toggleSound = () => {
            connection.send(JSON.stringify({ command: "TOGGLE_SOUND" }))
        }

        const soundButton = document.getElementById('sound_button')
        soundButton.onclick = toggleSound
    }

    static toggleMirror = mirrored => {
        const video = document.getElementById('video')

        video.style.cssText = mirrored ? "-moz-transform: scale(-1, 1); \
            -webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); \
            transform: scale(-1, 1); filter: FlipH;" : ""

        document.getElementById('mirror_button').src = mirrored ? "icons/flip_black_24dp-mirrored.svg" : "icons/flip_black_24dp.svg"
    }

    static toggleSound = soundOn => {
        document.getElementById('sound_button').src = soundOn ? "icons/volume_off_black_24dp.svg" : "icons/volume_up_black_24dp.svg"
    }
}

