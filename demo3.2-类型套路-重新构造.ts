// 把一个字符串字面量类型的 'guang' 转为首字母大写的 'Guang'

type CapitalizeStr<Str extends string> =
    Str extends `${infer First}${infer Rest}`
    ? `${Uppercase<First>}${Rest}` : Str;


type CapitalizeResult = CapitalizeStr<'tang'>