const {ALL} = require('../credentials/credentials')

module.exports = function ReadGroups(){
    return ALL.get().then(response => {
        console.log(response)
        // let i = 0;
        // let size = response.data().CURRENT.length
        // let groupArray = [];
        // for(i = 0; i < size; i++){
        //     groupArray = groupArray.concat([response.data().CURRENT[i]])
        // }
        // return groupArray;
    })
}

// export function ReadGroups(){
//     return ALL.get().then(response => {
//         console.log(response)
//         // let i = 0;
//         // let size = response.data().CURRENT.length
//         // let groupArray = [];
//         // for(i = 0; i < size; i++){
//         //     groupArray = groupArray.concat([response.data().CURRENT[i]])
//         // }
//         // return groupArray;
//     })
// }