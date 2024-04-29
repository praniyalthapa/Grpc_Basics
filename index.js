const grpc=require('@grpc/grpc-js');
//const todoProto=grpc.load('todo.proto'); //loaded the proto
const protoLoader = require('@grpc/proto-loader');
const packageDefinition=protoLoader.loadSync('./todo.proto',{
    keepCase: true, 
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});


const server=new grpc.Server();

const todos=[
    {
        id:'1',title:'Todo1',content:'Content of todo1'
    },
    {
        id:'2',title:'Todo2',content:'Content of todo2'
    }

];
server.addService(todoProto.TodoService.service,{ //using todo proto u can use its services
    ListTodo:(call,callback)=>{        
        callback(null,todos);      //sendinng data to client side where erro is null
        
    },
    CreateTodo :(call,callback)=>{
         let newTodo=call.request;
         todos.push(newTodo);
        callback(null,todos); //sending created object back to the client
        
    },
    GetTodo:(call,callback)=>{
      let incommingRequest=call.request; //this will give you whole TodoRequest object
      let todoId=incommingRequest.id;   //getting id from the request
      const response=todos.filter((todo)=>{
        if(response.length>0){
            callback(null,response);
        }
        else{
            callback({
                message:'Todo is not found sorry!'
            },null);
        }
      })
    }


}); 
server.bind('127.0.0.1:50051',grpc.ServerCredentials.createInsecure()); //binding our server with ip 
console.log('server started');
server.start();
