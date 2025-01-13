import type { Request, Response } from "express"
// since ejs, i can just embed ID's for requests to prevent people from idk, spoofing allat
export const IDS:string[] = []
export function genID() {
    // use date and time + uuid
    return Buffer.from(Date.now().toString(36) + Math.random().toString(36).substring(2)).toString('hex')
}
export const getReqId = () => {
const id = genID()
IDS.push(id)
return id
}

export function validateReq(req:Request,res:Response,next: () => void) {
const header = req.headers['x-request-id'] as string
if(!header || !IDS.includes(header)) {
    res.status(403).send("Invalid request ID")
    return
}
IDS.splice(IDS.indexOf(header),1)
next()
}