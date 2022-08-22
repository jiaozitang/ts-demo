type TPartial<T> = {
    [P in keyof T]?: T[P];
};

type PartialRes = TPartial<{ name: 'aa', age: 18 }>

type TRequired<T> = {
    [P in keyof T]-?: T[P]
}

type RequiredRes = TRequired<{ name?: 'aa', age?: 18 }>

type TReadonly<T> = {
    readonly [P in keyof T]: T[P]
}

type ReadonlyRes = TReadonly<{ name?: 'aa', age?: 18 }>

type TPick<T, K extends keyof T> = {
    [P in K]: T[P]
}

type PickRes = TPick<{ name?: 'aa', age?: 18 }, 'name'>

type TRecord<K extends keyof any, T> = {
    [P in K]: T
}

type RecordRes = TRecord<'aa' | 'bb', string>

type TExclude<T, U> = T extends U ? never : T

type ExcludeRes = TExclude<'aa' | 'bb', 'aa'>

type TExtract<T, U> = T extends U ? T : never

type ExtractRes = TExtract<'aa' | 'bb', 'aa'>

type TOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type OmitRes = TOmit<{ name: 'aa', age: 18 }, 'name'>

type TAwaited<T> =
    T extends null | undefined
        ? T 
        : T extends object & { then(onfulfilled: infer F): any }
            ? F extends ((value: infer V, ...args: any) => any)
                ? Awaited<V>
                : never 
            : T;

            
type AwaitedRes = TAwaited<Promise<Promise<Promise<string>>>>