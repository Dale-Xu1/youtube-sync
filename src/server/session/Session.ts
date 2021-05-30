import axios from "axios"

class Session
{

    private pending = true

    private title!: string
    private image!: string

    private users = 0


    public constructor(private video: string)
    {
        this.fetchData()
    }

    private async fetchData(): Promise<void>
    {
        // Get video data from YouTube API
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${this.video}&key=${process.env.YOUTUBE}`)
        let data = response.data.items[0].snippet

        this.title = data.title
        this.image = data.thumbnails.high.url

        this.pending = false
    }


    public isPending(): boolean
    {
        return this.pending
    }

    public getTitle(): string
    {
        return this.title
    }

    public getImage(): string
    {
        return this.image
    }

    public getVideo(): string
    {
        return this.video
    }

    public getUsers(): number
    {
        return this.users
    }


    public connect(): void
    {
        this.users++
    }

    public disconnect(): boolean
    {
        this.users--
        return this.users <= 0
    }

}

export default Session
