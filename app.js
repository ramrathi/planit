const app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

totalnodes = 0;
currentlist=[];

app.get('/',(req,res)=>
{
	res.sendfile('public/index.html');
});

io.on('connection',(socket)=>
{
	totalnodes++;
	console.log('['+totalnodes+'] nodes connected');
	//Getting new node up to date with current data
	
	socket.emit('cleartable');
	for(i =0;i<currentlist.length;i++)
		socket.emit('getmessage',currentlist[i]);

	socket.on('newmsg',(data)=>
	{
		currentlist.push(data);
		//console.log(currentlist);
		io.sockets.emit('getmessage',data);
	});

	socket.on('deletetask',(data)=>
	{
		var i = currentlist.indexOf(data.task);
		console.log('Task "'+ data.task+'" deleted');
		currentlist.splice(i,1);
		io.sockets.emit('taskdeleted',data.index);
	});

	socket.on('disconnect',()=>
	{
		console.log('EVM disconnected');
		totalnodes--;
		console.log('['+totalnodes+'] nodes connected');
	});
});


http.listen(process.env.PORT || 3000, ()=>
{
	console.log('Server initiated');
});
