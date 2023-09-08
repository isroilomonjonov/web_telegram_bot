const TelegramBot = require("node-telegram-bot-api");
const token = "6385314171:AAHMK7frezBvR3_nOfTg7dV7WO5tkEF_CDI";
const express = require("express");
const cors = require("cors");
const bot = new TelegramBot(token, { polling: true });
const app = express();

app.use(express.json());
app.use(cors());
const botStart = () => {
  bot.setMyCommands([
    {
      command: "/start",
      description: "Start",
    },
    {
      command: "/phones",
      description: "Telefonlar",
    },
  ]);
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;

    const text = msg.text;
    if (text === "/start") {
      return await bot.sendMessage(
        chatId,
        "Assalom Alekum Web Botimizga hush kelibsiz!",
        {
          reply_markup: {
            keyboard: [
              [
                {
                  text: "Telafonlarni ko'rish",
                  web_app: {
                    url: "https://web-telegram-bot-xcmb.vercel.app/",
                  },
                },
              ],
            ],
          },
        }
      );
    }
    if (text === "/phones") {
      return await bot.sendMessage(
        chatId,
        "Assalom Alekum Web Botimizga hush kelibsiz!",
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Telefonlarni ko'rish",
                  web_app: {
                    url: "https://web-telegram-bot-xcmb.vercel.app/",
                  },
                },
              ],
            ],
          },
        }
      );
    }

    if (msg.web_app_data?.data) {
      try {
        const data = JSON.parse(msg.web_app_data.data);
        await bot.sendMessage(chatId, `Siz sotib olgan telefonlar, `);
        for (item of data) {
          await bot.sendPhoto(chatId, item.Image);
          await bot.sendMessage(chatId, `${item.title}-${item.quantity}x`);
        }
        await bot.sendMessage(
          1153327472,
          `${msg.from?.first_name} ${msg.from?.last_name} @${
            msg.from?.username
          } Umumiy narx, ${data
            .reduce((a, c) => a + c.price * c.quantity, 0)
            .toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}`
        );
        return await bot.sendMessage(
          chatId,
          `Umumiy narx, ${data
            .reduce((a, c) => a + c.price * c.quantity, 0)
            .toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })} `
        );
      } catch (error) {
        console.log(error);
      }
    }
    return await bot.sendMessage(chatId, `Noto'g'ri malumot jonatdingiz!`);
  });
};
botStart();
app.post("/web-data", async (req, res) => {
  const { queryId, products } = req.body;
  try {
    return await bot.answerWebAppQuery(queryId, {
      type: "article",
      id: queryId,
      title: "Muvaffaqiyatli xarid qildingiz",
      input_message_content: {
        message_text: `Xaridingiz bilan tabriklayman siz ${products
          .reduce((a, c) => a + c.price * c.quantity, 0)
          .toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })} qiymatga ega mahsulot sotib oldingiz, ${products
          .map((product) => `${product.title}-${product.quantity}x`)
          .join(", ")}`,
      },
    });
  } catch (error) {
    return res.status(500).json({});
  }
});
app.listen(process.env.PORT || 8000, () => {
  console.log("server started");
});
