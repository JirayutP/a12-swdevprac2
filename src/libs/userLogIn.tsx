export default async function userLogIn(userEmail:string, userPassword:string) {
    const response = await fetch('https://vaccine-app-backend-chi.vercel.app/api/v1/auth/login', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword
        }),
    })
    if(!response.ok){
        throw new Error('Faile to Log-in')
    }

    return await response.json()
}