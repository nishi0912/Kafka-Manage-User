import kafka from "../index.js";
import { data_create, data_update } from "../../Data/index.js";

const producer = kafka.producer();

export const ManageUserProducer = async (params) => {
  console.log("Data for producing..", params?.name);
  await producer.connect();

  await producer
    .send({
      topic: process.env.MANAGE_USER_TOPIC,
      partition: 0,
      messages: [
        {
          value: JSON.stringify(params?.name),
        },
      ],
    })
    .then((res) => {
      console.log("---------- Produced a Topic -----------");
      console.log({ res });
    });

  await producer.disconnect();
};
