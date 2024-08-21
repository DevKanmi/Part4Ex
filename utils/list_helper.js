const dummy =(blogs) => {
    return 1
}
const totalLikes =(blogs) =>{
    const sum = blogs.reduce((sum, blog) => sum+blog.likes , 0)
    return blogs.length === 0 ? 0 : sum

     // let sum = 0
    // for(let i = 0; i < blogs.length ; i++){
    //     sum+=blogs[i]
    // }  using for loops

}

const favoriteBlog =(blogs) =>{
    return blogs.reduce((start, current) => (start.likes>current.likes ? start : current), blogs[0])

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}