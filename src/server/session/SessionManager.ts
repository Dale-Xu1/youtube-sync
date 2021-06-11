import Session from "./Session"

export interface ThumbnailData
{

    id: string

    title: string
    image: string

}

class SessionManager
{

    private static characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"


    private sessions = new Map<string, Session>()


    public thumbnails(): ThumbnailData[]
    {
        let thumbnails: ThumbnailData[] = []
        for (let [id, session] of this.sessions.entries())
        {
            // Add session to list if its data is ready
            if (session.pending) continue
            thumbnails.push({ id, title: session.title, image: session.image })
        }

        return thumbnails
    }


    public get(id: string): Session | null
    {
        return this.sessions.get(id) ?? null
    }
    
    public create(video: string): string
    {
        let id = this.generateId()
        let session = new Session(id, video)

        this.sessions.set(id, session)
        return id
    }

    private generateId(): string
    {
        let id = ""

        // Generate random ID
        let characters = SessionManager.characters
        for (let i = 0; i < 8; i++)
        {
            let index = Math.floor(Math.random() * characters.length)
            id += characters[index]
        }

        // Try again if ID exists
        if (this.sessions.has(id)) return this.generateId()
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
