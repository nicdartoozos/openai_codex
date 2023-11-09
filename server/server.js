import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import cors from 'cors';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

const app = express();
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from Codex',
  })
});

app.post('/', async (req, res) => {
  try {

    
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ error })
  }
})

app.listen(5001, () => console.log('Server is running on port http://localhost:5001'));