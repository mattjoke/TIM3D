import hbs from 'handlebars/runtime';


hbs.registerHelper('helper',()=>{
    console.log("hello from helper")
})

export {
    hbs
}