import axios from "axios"

import SessionManager from "./SessionManager"

export default class Session
{

    public pending = true

    public title!: string
    public image!: string

    public users = 0
    public paused = true


    public constructor(private sessions: SessionManager, public id: string, public video: string)
    {
        this.startDelete() // Give user time to connect
        this.initialize()
    }

    public async initialize(): Promise<void>
    {
        // Get video data from YouTube API
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${this.video}&key=${process.env.YOUTUBE}`)
        let items = response.data.items
        
        if (items.length === 0)
        {
            // Video doesn't exist
            clearTimeout(this.timeout)
            this.delete()

            return
        }
        
        let data = response.data.items[0].snippet

        this.title = data.title
        this.image = data.thumbnails.high.url

        // Data can now be freely accessed
        this.pending = false
    }


    private start = Date.now()
    private offset = 0
    
    public get time(): number
    {
        if (this.paused) return this.offset

        // Calculate current time
        let time = (Date.now() - this.start) / 1000
        return this.offset + time
    }

    public set time(value: number)
    {
        this.start = Date.now()
        this.offset = value
    }


    public play(time: number): void
    {
        this.start = Date.now()
        this.offset = time

        this.paused = false
    }

    public pause(time: number): void
    {
        this.offset = time
        this.paused = true
    }


    public connect(): void
    {
        clearTimeout(this.timeout)
        this.users++
    }

    public disconnect(): void
    {
        this.users--
        if (this.users <= 0) this.startDelete() // Delete if no users are left
    }


    private timeout!: NodeJS.Timeout

    private startDelete(): void
    {
        // Delete after 30 seconds
        this.timeout = setTimeout(this.delete.bind(this), 30000)
    }

    private delete(): void
    {
        this.sessions.delete(this.id)
    }

}
