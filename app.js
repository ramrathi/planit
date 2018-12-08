const app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Main server to host multiple EVMs
totalevms = 0;
currentlist = '';

app.get('/',(req,res)=>
{
	res.sendfile('index.html');
});


io.on('connection',(socket)=>
{
	totalevms++;
	console.log('['+totalevms+'] EVMs connected');
	socket.emit('getmessage',currentlist);

	//Getting new node up to date with current data
	socket.on('newmsg',(data)=>
	{
		currentlist = data.html;
		io.sockets.emit('getmessage',data.html);
	});

	socket.on('disconnect',()=>
	{
		console.log('EVM disconnected');
		totalevms--;
		console.log('['+totalevms+'] EVMs connected');
	});
});


http.listen(process.env.PORT || 3000,port, ()=>
{
	console.log('Server initiated');
});
