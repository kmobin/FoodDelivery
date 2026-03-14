import jwt from 'jsonwebtoken'

export const isAuth = async(req, res, next) => {
    try{
        const token = req.cookies.token 
    
        if(!token)
            return res.status(400).json({message: "token not found"})

        const decodeToken = await jwt.verify(token, process.env.JWT_KEY) 
        console.log("token---",token,decodeToken) 
        if(!decodeToken) return res.status(400).json({message: "token not verify."})
        req.userId = decodeToken?.userId
        next()
    }catch(err){
        return res.status(500).json({message: err})
    }
}