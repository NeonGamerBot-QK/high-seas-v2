export function sendEmail(email:string) {
    return fetch(`https://shipment-viewer.hackclub.com/dyn/send_mail?email=${encodeURIComponent(email)}`).then(r => r.text()).then(e=> {
if(e.includes("error")) return {error: "uh oh"}
return {success: true}
    })
}