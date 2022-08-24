// 条件：extends ? :
// 如果 T 是 2 的子类型，那么类型是 true，否则类型是 false。
type isTwo<T> = T extends 2 ? true : false;
// false
type res = isTwo<1>;

// 推导：infer
// 提取元组类型的第一个元素：
// extends 约束类型参数只能是数组类型，因为不知道数组元素的具体类型，所以用 unknown。
// extends 判断类型参数 T 是不是 [infer F, ...infer R] 的子类型，如果是就返回 F 变量，如果不是就不返回
type First<T extends unknown[]> = T extends [infer F, ...infer R] ? F : never;
// 1
type res2 = First<[1, 2, 3]>;

// 联合：｜
// 代表类型可以是几个类型之一。
type Union = 1 | 2 | 3;

// 交叉：&代表对类型做合并。
type ObjType = { a: number } & { c: boolean };

// 映射类型
type MapType<T> = {
    [
    Key in keyof T
    as `${Key & string}${Key & string}${Key & string}`
    ]: [T[Key], T[Key], T[Key]]
}
// {
//     aaa: [1, 1, 1];
//     bbb: [2, 2, 2];
// }
type res3 = MapType<{ a: 1, b: 2 }>