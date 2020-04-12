// console.log("hi");
// var url = "https://api.covid19india.org/data.json"
fetch('https://api.covid19india.org/data.json')
		.then(function (response) { return response.json(); })
		.then(function (data) {

			var vals = data.statewise[0].lastupdatedtime.split("/");
			var past = vals[1]+"/"+vals[0]+"/"+vals[2];
			past = new Date(past).getTime();
			var now = new Date().getTime();

			document.getElementById("time").innerHTML = "Last Updated :-\xa0\xa0" + timeDifference(now,past);

			appendData(data.statewise);

        })
        .catch(function (err) {
            console.log('error: ' + err);
        });


function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}

function appendData(data) {
  var table = document.getElementById("maintable");
  var states = [];
  for (var i = 1; i < data.length; i++) {
  	state = {
  		name : data[i].state,
  		active : data[i].active,
  		recovered : data[i].recovered,
  		deaths : data[i].deaths,
  		deltarecovered : data[i].deltarecovered,
  		deltadeaths : data[i].deltadeaths,
  		confirmed : data[i].confirmed
  	}
  	states.push(state);

  }

  states.sort(function(a,b)
  {
  	return Number(b.confirmed) - Number(a.confirmed);
  });

  	states.forEach(function(state)
  	{
	  	var row = table.insertRow(-1);
	  	row.insertCell(0).innerHTML = state.name;
	  	row.insertCell(1).innerHTML = state.confirmed;
	  	row.insertCell(2).innerHTML = state.active;  	
	  	row.insertCell(3).innerHTML = state.recovered + "\xa0(\xa0+" + state.deltarecovered+"\xa0)";
	  	row.insertCell(4).innerHTML = state.deaths + "\xa0(\xa0+" + state.deltadeaths+"\xa0)";

	  	

	});


  	var row = table.insertRow(-1);
  	row.style.backgroundColor = "#f7710a";
  	row.insertCell(0).innerHTML = data[0].state;
  	row.insertCell(1).innerHTML = data[0].confirmed;
  	row.insertCell(2).innerHTML = data[0].active;  	
  	row.insertCell(3).innerHTML = data[0].recovered + "\xa0(\xa0+" + data[0].deltarecovered+"\xa0)";
  	row.insertCell(4).innerHTML = data[0].deaths + "\xa0(\xa0+" + data[0].deltadeaths+"\xa0)";

}

function myFunction()
{
	var name = document.getElementById("Input").value;
	var table = document.getElementById("maintable");
 	var tr = table.getElementsByTagName("tr");
  	for (i = 0; i < tr.length; i++) {
    	td = tr[i].getElementsByTagName("td")[0];
    	if (td) {
      		txtValue = td.textContent || td.innerText;

 		if (txtValue.search(new RegExp(name,"i")) > -1) {
        	tr[i].style.display = "";
      	} else {
        	tr[i].style.display = "none";
      	}
    }       
  }
}