// 1. 条件：extends ? :
// 类型编程的条件运算和 js 相似，都是如果满足条件则返回a否则返回b
type isTwo<T> = T extends 2 ? true : false;
// false
type res = isTwo<1>;

// 2. 约束 extends 
// 通过约束语法 extends 限制类型。
interface Length {
    length: number
}
function fn1<T extends Length>(arg: T): number{
    return arg.length
}

// 3. 推导：infer
// 推导则是类似 js 的正则匹配，都满足公式条件时，可以提取公式中的变量，直接返回或者再次加工都可以。
type First<T extends unknown[]> = T extends [infer F, ...infer R] ? F : never;
// 1
type res2 = First<[1, 2, 3]>;

// 4. 联合：｜
// 代表类型可以是几个类型之一。
type Union = 1 | 2 | 3;

// 5. 交叉：&代表对类型做合并。
type ObjType = { a: number } & { c: boolean };

// 6. keyof 用于获取某种类型的所有键，其返回值是联合类型。
const a: keyof {
    name: string,
    age: number
} = 'name'

// 7. T[K] 用于访问索引，得到索引对应的值的联合类型。
interface I3 {
  name: string,
  age: number
}

// 8.in 用于遍历联合类型。
const obj = {
    name: 'tj',
    age: 11
}
type T5 = {
    [P in keyof typeof obj]: any
}
// 9. 索引重映射： as
// as 用于修改映射类型的 key。
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