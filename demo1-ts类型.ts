// 元组（Tuple）就是元素个数和类型固定的数组类型
type Tuple = [number, string];

// 接口（Interface）可以描述函数、对象、构造器的结构：
interface IPerson {
    name: string;
    age: number;
}

class Person implements IPerson {
    name: string;
    age: number;
}

const obj: IPerson = {
    name: 'aa',
    age: 18
}

// 枚举（Enum）是一系列值的复合：
enum Transpiler {
    Babel = 'babel',
    Postcss = 'postcss',
    Terser = 'terser',
    Prettier = 'prettier',
    TypeScriptCompiler = 'tsc'
}

const transpiler = Transpiler.TypeScriptCompiler;