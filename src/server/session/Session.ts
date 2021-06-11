import axios from "axios"

import SessionManager from "./SessionManager"

class Session
{

    public pending = true

    public title!: string
    public image!: string

    public users = 0


    public constructor(private sessions: SessionManager, public id: string, public video: string)
    {
        this.initialize()
    }

    public async initialize(): Promise<void>
    {
        // Get video data from YouTube API
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${this.video}&key=${process.env.YOUTUBE}`)
        let data = response.data.items[0].snippet

        this.title = data.title
        this.image = data.thumbnails.high.url

        // Data can now be freely accessed
        this.pending = false
    }


    public connect(): void
    {
        this.users++
    }

    public disconnect(): void
    {
        this.users--

        // Delete if no users are left
        if (this.users <= 0) this.sessions.delete(this.id)
    }

}

export default Session
