export default async function userRegister(userName:string, userTel:string, userEmail:string, userPassword:string) {

    const response = await fetch("https://campway-api-project-fe.us-east-1.elasticbeanstalk.com/api/v1/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name:userName,
            tel:userTel,
            email: userEmail,
            password: userPassword,
            role:'user'
        }),
    })
    if(!response.ok) {
        throw new Error("Failed to register")
    }

    return await response.json()
    
}