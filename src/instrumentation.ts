import connect from '@/config/dbConnect'

export async function register() {
    await connect()
}