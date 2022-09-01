/// <reference src="~/types/db.d.ts">
import "module-alias/register";
import fs from "fs";
import { CronJob } from "cron";
import environments from "~/environments";
import App from "~/app";
import Utils from "~/utils";
// import DATA from './../assets/data.json';
import Data from "./data";
import data from "./data";

App.listening(environments.PORT).then(async () => {
  try {
    Utils.Log.serverStart(environments.env, environments.PORT);
  } catch (e) {
    console.error(`db connect error : ${e}`);
  }
});

// fs.writeFile('./assets/data.json', '{ "daily": 241000 }', (err) => {
//   console.log('err', err);
// });

// new CronJob('5 * * * *', () => {
//   console.log('스케줄');
//   fs.writeFile('./assets/data.json', '{ "daily": 241000 }', (err) => {
//     console.log('err', err);
//   });
// }, null, true, 'Asia/Seoul');
const makeRandomData = (
  min: number,
  max: number,
  originValue: number
): number => {
  const randVal: number = Math.floor(Math.random() * (max - min + 1)) + min;
  const result: number = randVal * 0.01 * originValue;
  return parseInt(`${result}`);
};

new CronJob(
  "0 0 * * * *",
  function () {
    // const data = {
    //   "daily": 240000 + (makeRandomData(10, 20, 240000))
    // };
    // fs.writeFile('./assets/data.json', JSON.stringify(data), (err) => {});
    console.log("You will see this message every second");
    data.daily = 240000 + makeRandomData(10, 20, 240000);
    data.zone.a = 50000 + makeRandomData(10, 20, 50000);
    data.zone.b = 70000 + makeRandomData(10, 20, 70000);
    data.zone.c = 30000 + makeRandomData(10, 20, 30000);
    data.zone.d = 50000 + makeRandomData(10, 20, 50000);
    data.zone.e = 40000 + makeRandomData(10, 20, 40000);
    console.log("data", data);
  },
  null,
  true,
  "Asia/Seoul"
);
