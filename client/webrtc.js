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

        this.connection = connection
        let peerConnection = null

        this.handle = (data) => {
            console.log(`WebRTC: handle...`)

            const { RTCSessionDescription, RTCIceCandidate } = window;

            const webRtcEvent = JSON.parse(data)
            console.log(`WebRTC: type: ${webRtcEvent.type}`)

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
            this.connection.send(JSON.stringify({ webrtc_event: answer }))
        }

        this.start = () => {
            console.log(`WebRTC: start...`)

            peerConnection = new RTCPeerConnection()
            const remoteStream = new MediaStream()
            document.querySelector('#video').srcObject = remoteStream

            peerConnection.addEventListener('track', event => {
                console.log('Got remote track:', event.streams[0]);
                event.streams[0].getTracks().forEach(track => {
                    console.log('Add a track to the remoteStream:', track);
                    remoteStream.addTrack(track);
                });
            });
        }

        this.stop = () => {
            console.log(`WebRTC: stop...`)
            peerConnection.close()
            peerConnection = null
        }
    }
}
