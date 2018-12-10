      var socket = io();

			function sendMessage()
			{
				task = document.getElementById('task_input').value;
				if(task.length != 0)
				{
  				socket.emit('newmsg',task);
				}
			};
			
      socket.on('getmessage',(task)=>
			{
        table = document.getElementById('task_table');
        var row = table.insertRow(2)
        row.insertCell();
        var cell = row.insertCell();
        cell.innerHTML = '<td></td><td>'+task+'</td>'
        row.insertCell().innerHTML = '<td><i class = "material-icons button timelapse">timelapse</i><i class = "material-icons button delete">delete</i></td></td>';

        var rows = document.getElementsByTagName('tr');
        for(i = 2;i<rows.length;i++)
        {
          rows[i].cells[0].innerHTML = rows[i].rowIndex-1;
        }

        document.getElementById('task_input').value = "";
			});

      socket.on('cleartable',()=>
      {
       document.getElementById('messagebox').innerHTML = "";
       document.getElementById('task_input').value = "";

      });
