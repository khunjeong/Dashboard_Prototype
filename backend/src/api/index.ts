import { Router, Request, Response } from "express";
import DATA from "./../data";

const router = Router();

const makeRandomData = (
  min: number,
  max: number,
  originValue: number
): number => {
  const randVal: number = Math.floor(Math.random() * (max - min + 1)) + min;
  const result: number = randVal * 0.01 * originValue;
  return parseInt(`${result}`);
};

const makeRandom = (min, max) => {
  var RandVal = Math.floor(Math.random() * (max - min + 1)) + min;
  return RandVal;
};

router.get("/visitor", (req: Request, res: Response) => {
  try {
    console.log("data", DATA);
    const dailyVisitor: number = DATA.daily;
    console.log("dailyVisitor", dailyVisitor);
    const sendData = {
      success: true,
      visitors: [
        {
          mixture_id: 1,
          title: "실시간 방문자",
          data: dailyVisitor * (makeRandom(30, 33) * 0.01),
        },
        { mixture_id: 7, title: "하루 방문자", data: dailyVisitor },
        {
          mixture_id: 15,
          title: "재 방문자",
          data: dailyVisitor * (makeRandom(5, 7) * 0.01),
        },
        {
          mixture_id: 9,
          title: "체류 시간",
          data: (600 + makeRandomData(10, 20, 600)) / 60,
        },
      ],
    };
    res.status(200).send(sendData);
  } catch (e) {
    const sendData = {
      success: false,
      error: e,
    };
    res.status(200).send(sendData);
  }
});

router.get("/zone/:id", (req: Request, res: Response) => {
  try {
    console.log("data", DATA);
    console.log("req param", req.param);
    console.log("req params", req.params);
    const dailyVisitor: number = DATA.zone[req.params.id];
    console.log("dailyVisitor", dailyVisitor);
    const sendData = {
      success: true,
      visitors: [
        {
          mixture_id: 1,
          title: "실시간 방문자",
          data: dailyVisitor * (makeRandom(30, 33) * 0.01),
        },
        { mixture_id: 7, title: "하루 방문자", data: dailyVisitor },
        {
          mixture_id: 15,
          title: "재 방문자",
          data: dailyVisitor * (makeRandom(5, 7) * 0.01),
        },
        {
          mixture_id: 9,
          title: "체류 시간",
          data: (600 + makeRandomData(10, 20, 600)) / 60,
        },
      ],
    };
    res.status(200).send(sendData);
  } catch (e) {
    const sendData = {
      success: false,
      error: e,
    };
    res.status(200).send(sendData);
  }
});

router.get("/environment", async (req: Request, res: Response) => {
  try {
    const environments = [
      { mixture_id: 2, title: "온도", data: 22 + makeRandomData(10, 20, 22) },
      { mixture_id: 3, title: "습도", data: 70 + makeRandomData(10, 20, 70) },
      {
        mixture_id: 5,
        title: "미세먼지",
        data: 21 + makeRandomData(10, 20, 21),
      },
      {
        mixture_id: 6,
        title: "초미세먼지",
        data: 13 + makeRandomData(10, 20, 13),
      },
      { mixture_id: 4, title: "CO2", data: 387 + makeRandomData(10, 20, 387) },
      {
        mixture_id: 12,
        title: "tvoc",
        data: 578 + makeRandomData(10, 20, 548),
      },
    ];
    const sendData = {
      success: true,
      environments: environments,
    };
    res.status(200).send(sendData);
  } catch (e) {
    const sendData = {
      success: false,
      error: e,
    };
    res.send(sendData);
  }
});

router.get("/chart", async (req: Request, res: Response) => {
  try {
    const sendData = {
      success: true,
      datas: [],
    };
    res.status(200).send(sendData);
  } catch (e) {
    const sendData = {
      success: false,
      error: e,
    };
    res.status(200).send(sendData);
  }
});

export default router;
