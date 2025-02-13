import generateResponse from "../utiles/ai.utiles.js"


export const generateReview=async (req,res)=>{
    try {
        const {prompt}=req.body
        if(!prompt){
            return res.status(400).json({error:"prompt is required"})
        }
        const result=await generateResponse(prompt)
        return res.status(200).json({result})

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"something went wrong"})
    }
}
