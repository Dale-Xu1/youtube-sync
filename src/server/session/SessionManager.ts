import Session from "./Session"

export interface ThumbnailData
{

    id: string

    title: string
    image: string

}

export interface SessionData
{

    video: string
    users: number

}

class SessionManager
{

    private static characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"


    private sessions = new Map<string, Session>()


    public list(): ThumbnailData[]
    {
        let thumbnails: ThumbnailData[] = []
        for (let [id, session] of this.sessions.entries())
        {
            // Add session to list if its data is ready
            if (session.isPending()) continue
            thumbnails.push({ id, title: session.getTitle(), image: session.getImage() })
        }

        return thumbnails
    }

    public get(id: string): SessionData | null
    {
        let session = this.sessions.get(id)
        if (session == null) return null

        return { video: session.getVideo(), users: session.getUsers() }
    }

    public create(video: string): string
    {
        let session = new Session(video)
        let id = ""

        // Generate random id
        let characters = SessionManager.characters
        for (let i = 0; i < 8; i++)
        {
            let index = Math.floor(Math.random() * characters.length)
            id += characters[index]
        }

        this.sessions.set(id, session)
        return id
    }


    public connect(id: string): void
    {
        this.sessions.get(id)?.connect()
    }

    public disconnect(id: string): void
    {
        // Delete session if last user disconnected
        let session = this.sessions.get(id)
        if (session != null && session.disconnect())
        {
            this.sessions.delete(id)
        }
    }

}

export default SessionManager
