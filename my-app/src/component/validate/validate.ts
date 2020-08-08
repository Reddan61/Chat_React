type requiredType = (value: string) => string | undefined

export const required: requiredType = (value) => {
    if (!value) {
        return 'Заполните поле'
    } else return undefined
};