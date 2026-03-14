import jwt from 'jsonwebtoken'

export const getToken = async(userId) => {
    console.log("userId----",userId)
    try{
        const token = await jwt.sign({userId}, process.env.JWT_KEY, {expiresIn: '7d'})
        return token;
    }catch(e){
        console.log(e)
    }
}