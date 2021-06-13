import { Socket } from "socket.io-client"

class Connection
{

    public constructor(private socket: Socket, private player: YT.Player)
    {
        socket.on("play", this.play.bind(this))
        socket.on("pause", this.pause.bind(this))

        player.addEventListener("onStateChange", this.stateChange.bind(this))
    }


    private play(time: number): void
    {
        this.ignore = true

        this.player.seekTo(time, true)
        this.player.playVideo()
    }

    private pause(time: number): void
    {
        this.ignore = true

        this.player.pauseVideo()
        this.player.seekTo(time, true)
    }


    private ignore = false

    private stateChange(event: YT.OnStateChangeEvent): void
    {
        let time = this.player.getCurrentTime()
        switch (event.data)
        {
            case YT.PlayerState.PLAYING:
            {
                if (!this.ignore) this.socket.emit("play", time)
                break
            }

            case YT.PlayerState.PAUSED:
            {
                if (!this.ignore) this.socket.emit("pause", time)
                break
            }

            default: return
        }

        this.ignore = false
    }


    public disconnect(): void
    {
        // Disconnect from session
        this.socket.disconnect()
    }
    
}

export default Connection
