let users = [
    {id : 1  , name : 'yasmeen' ,hoppy : 'reading'},
    {id : 2  , name : 'ahmed'   ,hoppy : 'swimming'}
] ;


let lastId = users.length > 0 ? Math.max(...users.map(user => user.id)) +1 : 1; ;

const getUsers = ()=>{
    return users
};

const getUser = (id)=>{
    const user = users.find(user => user.id  === parseInt(id)) ;
    return user ;
};

const addUser = (name , hoppy) => {
    const newUser = {id : lastId++ , name  , hoppy} ;
    users.push(newUser) ;
    return newUser
} ;

const updateUser = (id  , name , hoppy ) =>{
    const user = users.find(user => user.id === parseInt(id)) ;
    if(user){
        user.name = name  ;
        user.hoppy  = hoppy  ;
    }
    return user ;
};

const deleteUser = (id)=>{
    users = users.filter(users => users.id !== parseInt(id) ) ;
};

module.exports = {
    getUsers , 
    getUser ,
    addUser ,
    updateUser ,
    deleteUser
}


