
//层级枚举
export type Tier = 1 | 2 | 3;

// 是否是文件夹枚举
export type IsFolder = 0 | 1;

//是清单类枚举 还是 标签类 还是其他
export type rootType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface ListSingle {
    id:number,
    name:string,
    elements?:Array<any>
    rootType:rootType,
    tier:Tier,
    isFloder:IsFolder
}


export const morkList:Array<ListSingle> = [
    {
        id: 1,
        name: "清单",
        rootType:1,
        tier:1,
        isFloder:1,
        elements: [
          {
            id: 1.1,
            name: "不想说话",
            tier:2,
            isFloder:1,
            rootType:1,
            elements: [
              {
                id: 1.11,
                name: "不想说话11",
                tier: 3,
                isFloder:0,
                rootType:1,
              },
            ],
          },
          {
            id: 1.2,
            name: "想说话",
            tier: 2,
            isFloder:1,
            rootType:1,
            elements: [],
          },
          {
            id: 1.3,
            name: "讨厌你",
            tier: 2,
            isFloder:1,
            rootType:1,
            elements: [],
          },
          {
            id: 1.4,
            name: "恨你",
            tier: 2,
            isFloder:0,
            rootType:1,
          },
        ]

      },
      {
        id: 2,
        name: "标签",
        elements: [],
        rootType: 2,
        tier: 1,
        isFloder:1,
      }
]
