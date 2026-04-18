import jwt from 'jsonwebtoken'

export const getToken = async(userId) => {
    
    try{
        const token = await jwt.sign({userId}, process.env.JWT_KEY, {expiresIn: '7d'})
        console.log("userId----",userId,token)
        return token;
    }catch(e){
        console.log(e)
    }
}