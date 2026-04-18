import jwt from 'jsonwebtoken'

export const isAuth = async(req, res, next) => {
    try{
        const token = req.cookies.token 
    console.log("token---",req.cookies) 
        if(!token)
            return res.status(400).json({message: "token not found"})

        const decodeToken = await jwt.verify(token, process.env.JWT_KEY) 
        
        if(!decodeToken) return res.status(400).json({message: "token not verify."})
        req.userId = decodeToken?.userId
        next()
    }catch(err){
        return res.status(401).json({ message: err.message })
    }
}