// const person = {
//     name: 'Andrew', 
//     age: 24, 
//     location: {
//         city: 'SF', 
//         temp: 69
//     }
// }

// const {name} = person; 

const book = {
    title: 'Eragon', 
    author: 'Kid Mckidston',
    publisher: {
        // name: 'Penguin'
    }
};

const { name: publisherName = 'Self-Published' } = book.publisher;
const { title } = book; 
console.log(title, publisherName);

const item = [
    'Coffee (Hot)',
    '$2.00',
    '$2.50',
    '$2.75'
]

const [coffee, , medium] = item; 

console.log(coffee, ':', medium);