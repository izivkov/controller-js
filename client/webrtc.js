/*
 * Developed for the OpenBot project (https://openbot.org) by:
 *
 * Ivo Zivkov
 * izivkov@gmail.com
 *
 * Date: Mon Nov 29 2021
 */

export class WebRTC {

    constructor(connection) {
        const { RTCPeerConnection } = window;

        let peerConnection = null

        this.handle = (data) => {
            if (!peerConnection) {
                console.log("WebRTC: start() not called, cannot handle...")
                return
            }

            const { RTCSessionDescription, RTCIceCandidate } = window;
            const webRtcEvent = JSON.parse(data)

            switch (webRtcEvent.type) {
                case "offer":
                    peerConnection.setRemoteDescription(new RTCSessionDescription({ sdp: webRtcEvent.sdp, type: 'offer' }))
                    doAnswer()
                    break

                case "candidate":
                    const candidate = new RTCIceCandidate({
                        candidate: webRtcEvent.candidate,
                        sdpMid: webRtcEvent.id,
                        sdpMLineIndex: webRtcEvent.label
                    })

                    peerConnection.addIceCandidate(candidate)
                    break

                case "bye":
                    Log.i(TAG, "got bye")
                    this.stop()
                    break
            }
        }

        const doAnswer = async () => {
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            connection.send(JSON.stringify({ webrtc_event: answer }))
        }

        this.start = () => {
            console.log(`WebRTC: start...`)

            peerConnection = new RTCPeerConnection()

            const video = document.querySelector('#video')
            video.srcObject = new MediaStream()
            video.srcObject.getTracks().forEach(track => peerConnection.addTrack(track, stream));
            
            peerConnection.ontrack = event => {
                video.srcObject = event.streams[0];
            };
        }

        this.stop = () => {
            console.log(`WebRTC: stop...`)
            peerConnection.close()
            peerConnection = null
        }
    }
}
