import { Socket } from "socket.io-client"

class Connection
{

    public constructor(private socket: Socket, private player: YT.Player)
    {
        socket.on("play", this.play.bind(this))
        socket.on("pause", this.pause.bind(this))

        player.addEventListener("onStateChange", this.stateChange.bind(this))
    }


    private play(): void
    {
        this.player.playVideo()
    }

    private pause(time: number): void
    {
        this.player.seekTo(time, true)
        this.player.pauseVideo()
    }

    private stateChange(event: YT.OnStateChangeEvent): void
    {
        switch (event.data)
        {
            case YT.PlayerState.PLAYING: this.socket.emit("play"); break
            case YT.PlayerState.PAUSED:
            {
                let time = this.player.getCurrentTime()
                this.socket.emit("pause", time)
                
                break
            }
        }
    }

}

export default Connection
