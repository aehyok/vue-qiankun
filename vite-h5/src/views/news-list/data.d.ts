import { NewsModel } from '/#/models/index.d';

let data = {
  pics: {
    aaaaa: {
      aa: 'aa',
      bb: 'bb',
    },
  },
  morss: {},
};

const { pics: eee, morss } = data;

console.log(eee, 'pics-----ssssssssssss');

async function asyncFn() {
  return { code: 200 };
}
const res = asyncFn();
res.then((item) => {
  console.log('res1111', item);
});
console.log('res22222', res);

const images = 'http://vue.tuokecat.com/cdn/h5/newslist.jpg';
export const list: NewsModel[] = [
  {
    id: 1,
    messageName: '长图片',
    createdAt: '2021-07-27T17:06:19',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 2,
    messageName: '小心哦哦奥',
    createdAt: '2021-07-26T14:15:44',
    createdByDeptName: '田西村',
    url: images,
  },

  {
    id: 3,
    messageName: '11111',
    createdAt: '2021-07-26T14:08:33',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 4,
    messageName: '11133',
    createdAt: '2021-07-22T11:13:28',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 5,
    messageName: '11133',
    createdAt: '2021-07-22T11:13:28',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 6,
    messageName: '22',
    createdAt: '2021-07-22T11:12:58',

    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 7,
    messageName: '123',
    createdAt: '2021-07-19T10:00:16',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 8,
    messageName: 'ddddd',
    createdAt: '2021-06-18T20:20:55',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 9,
    messageName: 'asdfasdfa',
    createdAt: '2021-06-18T20:14:30',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 10,
    messageName: 'asdfasf',

    createdAt: '2021-06-18T11:45:02',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 11,
    messageName: '神舟12号发射成功',
    createdAt: '2021-06-17T11:54:09',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 12,
    messageName: '444444444',
    createdAt: '2021-06-17T10:30:56',
    createdByDeptName: '田西村',
  },
  {
    id: 13,
    messageName: '学习防疫医务工作者忘我工作精神',
    createdAt: '2021-06-16T19:25:01',
    createdByDeptName: '田西村',
  },
  {
    id: 14,
    messageName: '神舟12号发射',
    createdAt: '2021-06-16T18:46:24',
    createdByDeptName: '田西村',
  },
  {
    id: 15,
    messageName: '11111haaaahhhaaaaa',
    createdAt: '2021-06-16T18:39:17',
    createdByDeptName: '田西村',
  },
  {
    id: 16,
    messageName: '长图片',
    createdAt: '2021-07-27T17:06:19',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 17,
    messageName: '小心哦哦奥',
    createdAt: '2021-07-26T14:15:44',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 18,
    messageName: '11111',
    createdAt: '2021-07-26T14:08:33',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 19,
    messageName: '11133',
    createdAt: '2021-07-22T11:13:28',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 20,
    messageName: '22',
    createdAt: '2021-07-22T11:12:58',

    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 21,
    messageName: '123',
    createdAt: '2021-07-19T10:00:16',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 22,
    messageName: 'ddddd',
    createdAt: '2021-06-18T20:20:55',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 23,
    messageName: 'asdfasdfa',
    createdAt: '2021-06-18T20:14:30',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 24,
    messageName: 'asdfasf',

    createdAt: '2021-06-18T11:45:02',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 25,
    messageName: '神舟12号发射成功',
    createdAt: '2021-06-17T11:54:09',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 26,
    messageName: '444444444',
    createdAt: '2021-06-17T10:30:56',
    createdByDeptName: '田西村',
  },
  {
    id: 27,
    messageName: '学习防疫医务工作者忘我工作精神',
    createdAt: '2021-06-16T19:25:01',
    createdByDeptName: '田西村',
  },
  {
    id: 28,
    messageName: '神舟12号发射',
    createdAt: '2021-06-16T18:46:24',
    createdByDeptName: '田西村',
  },
  {
    id: 29,
    messageName: '11111haaaahhhaaaaa',
    createdAt: '2021-06-16T18:39:17',
    createdByDeptName: '田西村',
  },
  {
    id: 30,
    messageName: '长图片',
    createdAt: '2021-07-27T17:06:19',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 31,
    messageName: '小心哦哦奥',
    createdAt: '2021-07-26T14:15:44',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 32,
    messageName: '11111',
    createdAt: '2021-07-26T14:08:33',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 33,
    messageName: '11133',
    createdAt: '2021-07-22T11:13:28',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 34,
    messageName: '22',
    createdAt: '2021-07-22T11:12:58',

    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 35,
    messageName: '123',
    createdAt: '2021-07-19T10:00:16',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 36,
    messageName: 'ddddd',
    createdAt: '2021-06-18T20:20:55',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 37,
    messageName: 'asdfasdfa',
    createdAt: '2021-06-18T20:14:30',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 38,
    messageName: 'asdfasf',

    createdAt: '2021-06-18T11:45:02',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 39,
    messageName: '神舟12号发射成功',
    createdAt: '2021-06-17T11:54:09',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 40,
    messageName: '444444444',
    createdAt: '2021-06-17T10:30:56',
    createdByDeptName: '田西村',
  },
  {
    id: 41,
    messageName: '学习防疫医务工作者忘我工作精神',
    createdAt: '2021-06-16T19:25:01',
    createdByDeptName: '田西村',
  },
  {
    id: 42,
    messageName: '神舟12号发射',
    createdAt: '2021-06-16T18:46:24',
    createdByDeptName: '田西村',
  },
  {
    id: 43,
    messageName: '11111haaaahhhaaaaa',
    createdAt: '2021-06-16T18:39:17',
    createdByDeptName: '田西村',
  },
  {
    id: 44,
    messageName: '长图片',
    createdAt: '2021-07-27T17:06:19',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 45,
    messageName: '小心哦哦奥',
    createdAt: '2021-07-26T14:15:44',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 46,
    messageName: '11111',
    createdAt: '2021-07-26T14:08:33',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 47,
    messageName: '11133',
    createdAt: '2021-07-22T11:13:28',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 48,
    messageName: '22',
    createdAt: '2021-07-22T11:12:58',

    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 49,
    messageName: '123',
    createdAt: '2021-07-19T10:00:16',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 50,
    messageName: 'ddddd',
    createdAt: '2021-06-18T20:20:55',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 51,
    messageName: 'asdfasdfa',
    createdAt: '2021-06-18T20:14:30',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 52,
    messageName: 'asdfasf',

    createdAt: '2021-06-18T11:45:02',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 53,
    messageName: '神舟12号发射成功',
    createdAt: '2021-06-17T11:54:09',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 54,
    messageName: '444444444',
    createdAt: '2021-06-17T10:30:56',
    createdByDeptName: '田西村',
  },
  {
    id: 55,
    messageName: '学习防疫医务工作者忘我工作精神',
    createdAt: '2021-06-16T19:25:01',
    createdByDeptName: '田西村',
  },
  {
    id: 56,
    messageName: '神舟12号发射',
    createdAt: '2021-06-16T18:46:24',
    createdByDeptName: '田西村',
  },
  {
    id: 57,
    messageName: '11111haaaahhhaaaaa',
    createdAt: '2021-06-16T18:39:17',
    createdByDeptName: '田西村',
  },
  {
    id: 58,
    messageName: '长图片',
    createdAt: '2021-07-27T17:06:19',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 59,
    messageName: '小心哦哦奥',
    createdAt: '2021-07-26T14:15:44',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 60,
    messageName: '11111',
    createdAt: '2021-07-26T14:08:33',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 61,
    messageName: '11133',
    createdAt: '2021-07-22T11:13:28',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 62,
    messageName: '22',
    createdAt: '2021-07-22T11:12:58',

    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 63,
    messageName: '123',
    createdAt: '2021-07-19T10:00:16',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 64,
    messageName: 'ddddd',
    createdAt: '2021-06-18T20:20:55',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 65,
    messageName: 'asdfasdfa',
    createdAt: '2021-06-18T20:14:30',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 66,
    messageName: 'asdfasf',

    createdAt: '2021-06-18T11:45:02',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 67,
    messageName: '神舟12号发射成功',
    createdAt: '2021-06-17T11:54:09',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 68,
    messageName: '444444444',
    createdAt: '2021-06-17T10:30:56',
    createdByDeptName: '田西村',
  },
  {
    id: 69,
    messageName: '学习防疫医务工作者忘我工作精神',
    createdAt: '2021-06-16T19:25:01',
    createdByDeptName: '田西村',
  },
  {
    id: 70,
    messageName: '神舟12号发射',
    createdAt: '2021-06-16T18:46:24',
    createdByDeptName: '田西村',
  },
  {
    id: 71,
    messageName: '11111haaaahhhaaaaa',
    createdAt: '2021-06-16T18:39:17',
    createdByDeptName: '田西村',
  },
  {
    id: 72,
    messageName: '长图片',
    createdAt: '2021-07-27T17:06:19',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 73,
    messageName: '小心哦哦奥',
    createdAt: '2021-07-26T14:15:44',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 74,
    messageName: '11111',
    createdAt: '2021-07-26T14:08:33',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 75,
    messageName: '11133',
    createdAt: '2021-07-22T11:13:28',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 76,
    messageName: '22',
    createdAt: '2021-07-22T11:12:58',

    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 77,
    messageName: '123',
    createdAt: '2021-07-19T10:00:16',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 78,
    messageName: 'ddddd',
    createdAt: '2021-06-18T20:20:55',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 79,
    messageName: 'asdfasdfa',
    createdAt: '2021-06-18T20:14:30',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 80,
    messageName: 'asdfasf',
    createdAt: '2021-06-18T11:45:02',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 81,
    messageName: '神舟12号发射成功',
    createdAt: '2021-06-17T11:54:09',
    createdByDeptName: '田西村',
    url: images,
  },
  {
    id: 82,
    messageName: '444444444',
    createdAt: '2021-06-17T10:30:56',
    createdByDeptName: '田西村',
  },
  {
    id: 83,
    messageName: '学习防疫医务工作者忘我工作精神',
    createdAt: '2021-06-16T19:25:01',
    createdByDeptName: '田西村',
  },
  {
    id: 84,
    messageName: '神舟12号发射',
    createdAt: '2021-06-16T18:46:24',
    createdByDeptName: '田西村',
  },
  {
    id: 85,
    messageName: '11111haaaahhhaaaaa',
    createdAt: '2021-06-16T18:39:17',
    createdByDeptName: '田西村',
  },
];

list.forEach((item, index) => {
  item.messageName = item.messageName + (index + 100).toString();
});
