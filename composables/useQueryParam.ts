const defaultDelimiter = "."

export const useQueryParam = (key: string, delimiter = defaultDelimiter): string[] => {
    const { query } = useRoute()
    if (query[key] instanceof Array) {
        return query[key].flatMap((v) => v?.split(delimiter) ?? [])
    }
    else {
        return query[key]?.split(delimiter) ?? []
    }
}
