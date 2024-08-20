const dummy =(blogs) => {
    return 1
}
const totalLikes =(blogs) =>{
    const sum = blogs.reduce((sum, blog) => sum+blog , 0)
    return blogs.length === 0 ? 0 : sum

     // let sum = 0
    // for(let i = 0; i < blogs.length ; i++){
    //     sum+=blogs[i]
    // }  using for loops

}

module.exports = {
    dummy,
    totalLikes
}