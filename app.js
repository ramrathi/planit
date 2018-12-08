const app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Main server to host multiple EVMs
votingdata = null;
totalevms = 0;
currentlist = '';

app.get('/',(req,res)=>
{
	res.sendFile('/home/ramrathi/Desktop/WebProjects/bcapp/index.html');
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


http.listen(1227,'192.168.1.8',()=>
{
	console.log('Server initiated');
});