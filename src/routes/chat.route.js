import { Router } from 'express';

const chatRouter = Router();
const messages = [];
let subscribers = [];

chatRouter.post('/subscribe', async (req, res) => {
  const subscriber = {
    res,
    lastIndex: req.body.lastIndex,
  };
  subscribers.push(subscriber);

});

chatRouter.post('/publish', (req, res) => {
  const { message } = req.body;
  console.log(message);
  messages.push(message);
  notifySubscribers();
  res.json({ success: true });
});

const notifySubscribers = () => {
  for (const subscriber of subscribers) {
    const newMessages = messages.slice(subscriber.lastIndex);
    if (newMessages.length > 0) {
      subscriber.res.json({ messages: newMessages });
    }
  }
  subscribers=[]
};


export default chatRouter;
