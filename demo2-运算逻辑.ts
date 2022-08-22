// 条件：extends ? :
type res1 = 1 extends 2 ? true : false;

// 推导：infer
// 提取元组类型的第一个元素：
type First<Tuple extends unknown[]> = Tuple extends [infer T, ...infer R] ? T : never;
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
type res3 = MapType<{ a: 1, b: 2 }>