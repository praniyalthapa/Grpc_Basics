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
const protoDescriptor=grpc.loadPackageDefinition(packageDefinition);
var todoService=protoDescriptor.TodoService;



const server=new grpc.Server();

const todos=[
    {
        id:'1',title:'Todo1',content:'Content of todo1'
    },
    {
        id:'2',title:'Todo2',content:'Content of todo2'
    }

];
server.addService(todoService.service,{ //using todo proto u can use its services
    ListTodo:(call,callback)=>{        
        callback(null,todos);      //sendinng data to client side where erro is null
        
    },
    CreateTodo :(call,callback)=>{
         let newTodo=call.request;
         todos.push(newTodo);
        callback(null,todos); //sending created object back to the client
        
    },
    GetTodo: (call, callback) => {
        let incomingRequest = call.request; // this will give you the whole TodoRequest object
        let todoId = incomingRequest.id; // getting id from the request

        const response = todos.filter((todo) => {
            return todo.id === todoId;
        });

        if (response.length > 0) {
            callback(null, response); // Send the matching todo item(s) as response
        } else {
            callback({ message: 'Todo is not found sorry!' }, null); // Send error if todo is not found
        }
    }
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Server started'); // Log that the server has started
   // server.start();


}); 

