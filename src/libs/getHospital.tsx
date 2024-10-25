export default async function getHospital(hid:string) {
    const response = await fetch(`https://vaccine-app-backend-chi.vercel.app/api/v1/hospitals/${hid}`)
    if(!response){
        throw new Error('Failed to fetch hospital with id: ' + hid)
    }
    return await response.json()
}