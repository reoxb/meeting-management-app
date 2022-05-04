export default function fetch(url) {
    if (url === '/users') {
        return Promise.resolve({
            json: () =>
                Promise.resolve({
                    data: [
                        { id: 1, name: 'Tania', username: 'floppydiskette', email: 'floppydiskette@hotmail.com' },
                        { id: 2, name: 'Juan', username: 'juansuarez', email: 'juansuarez@gmail.com' },
                        { id: 3, name: 'Craig', username: 'siliconeidolon', email: 'siliconeidolon@hotmail.com' },
                    ]
                })
        })
    }
    if (url === '/schedule') {
        return Promise.resolve({
            json: () =>
                Promise.resolve({
                    data: {
                        id: 0, 
                        date: '01-01-2022', 
                        name: 'Juan Suarez', 
                        description: 'New test', 
                        email: 'juansuarez@gmail.com'
                    },
                })
        })
    }
}