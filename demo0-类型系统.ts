function getPropValue<T>(obj: T, key) {
    return obj[key]
}

const a = getPropValue({
    a: 1
}, 'a')

function getPropValue2<T>(obj: T, key: keyof T): T[keyof T] {
    return obj[key]
}

const a2 = getPropValue({
    a2: 1
}, 'a2')