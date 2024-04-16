const grpc=require('@grpc/grpc-js');
const todoProto=grpc.load('todo.proto');



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
        callback(null,todos);      //sendinng data to client side
        
    },
    CreateTodo :(call,callback)=>{
         let newTodo=call.request;
         todos.push(newTodo);
         callback(null,newTodo);  //sending created object back to the client
    },
    GetTodo:(call,callback)=>{
      let incommingId=call.request.TodoRequest
    }


}); 