const TelegramBot=require("node-telegram-bot-api")
const token="6385314171:AAHMK7frezBvR3_nOfTg7dV7WO5tkEF_CDI"

const bot = new TelegramBot(token,{polling:true})
const botStart=()=>{
    bot.on("message",async msg=>{
        const chatId=msg.chat.id;
        const text=msg.text;
        if(text==="/start"){
            await bot.sendMessage(chatId,"Assalom Alekum Web Botimizga hush kelibsiz!",{reply_markup:{
                 keyboard:[
                    [
                        {
                            text:"Kurslarni ko'rish",
                            web_app:{
                                url:"https://web-telegram-qb2qntwu5-isroilomonjonov.vercel.app/"
                            }
                        }
                    ]
                 ]
            }})
        }
    })
}
botStart()