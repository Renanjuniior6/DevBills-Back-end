import mongoose from "mongoose";

export async function setupMongo(): Promise<void>{

    try {
        if(mongoose.connection.readyState === 1){
            return
        }

        console.log('🎲 connecting to DB...')
        await mongoose.connect(process.env.MONGO_URL as string) //estamos satisfazendo o typescript colocando 'as string'
        console.log('✔ DB connected!')
    } catch {
        throw new Error('❌ DB not connected')
    }
}