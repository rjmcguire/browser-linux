document.getElementById("restore_file").onchange = function()
    {
        if(this.files.length)
        {
            var filereader = new FileReader();
            emulator.stop();

            filereader.onload = function(e)
            {
                emulator.restore_state(e.target.result);
                emulator.run();
                emulator.serial0_send("$HOME/.profile\n");
            };

            filereader.readAsArrayBuffer(this.files[0]);

            this.value = "";
        }

        this.blur();
        document.getElementById("save_time").innerHTML = "restored at "+getTimestamp();
        //a helpful hint
        document.getElementById("waiting_text").innerHTML = "Press enter to resume . . .";
        waiting_text.style.display = "block";
};

document.getElementById("upload_files").onchange = function(e) {
	var files = e.target.files;
	for(var i=0;i<files.length;i++) {
		var reader = new FileReader();
		reader.onload = function(file) {
		    return function(e) {
		        var data = (new TextEncoder('UTF-8')).encode(e.target.result);
		        emulator.create_file("/user/"+file.name, data);
		        console.log("uploaded "+file.name);
		    }
	}(files[i]);
	reader.readAsText(files[i]);
	}
}


function toggleToolbox() {
  var t = document.getElementById("toolbox_div");
  if (t.style.display === "none") {
    t.style.display = "block";
    document.getElementById("toggle").innerHTML = "hide toolbox";
  } else {
    t.style.display = "none";
    document.getElementById("toggle").innerHTML = "show toolbox"
  }
}

function toggleScreen() {
  var t = document.getElementById("screen_container");
  if (t.style.display === "none") {
    t.style.display = "block";
    document.getElementById("screenButton").innerHTML = "hide screen";
  } else {
    t.style.display = "none";
    document.getElementById("screenButton").innerHTML = "show screen"
  }
}


async function saveToFile() {
	  var temp_state = await emulator.save_state();
      var a = document.createElement("a");
      a.download = "browser-linux.bin";
      a.href = window.URL.createObjectURL(new Blob([temp_state]));
      a.dataset.downloadurl = "application/octet-stream:" + a.download + ":" + a.href;
      a.click();
      document.getElementById("save_time").innerHTML = "state saved at "+getTimestamp();

}




function startStop() {
  if (emulator.is_running() == true) {
    emulator.stop();
    document.getElementById("pause_button").innerHTML = "unpause";
    document.getElementById("save_time").innerHTML = "paused at "+getTimestamp();
  } else {
    emulator.run();
    document.getElementById("pause_button").innerHTML = "pause";
    document.getElementById("save_time").innerHTML = "resumed at "+getTimestamp();
  }
}

function saveRestore() {
	if(document.getElementById("save_restore").innerHTML == "restore to previous point") {
		restore();
		document.getElementById("save_restore").innerHTML = "save current point";
	} else {
		save();
		document.getElementById("save_restore").innerHTML = "restore to previous point";
	}
}

function toggle_autosave() {
	var b = document.getElementById("autosave_toggle"); //disable
	if(window.persist) {
		b.innerHTML = "enable autosave";
		localStorage.setItem("autosave", false);
		document.getElementById("save_time").innerHTML = "autosave disabled";
		window.persist = false;
		clearInterval(window.autosave_loop); 
		return false;
	} else {                                //enable
		b.innerHTML = "disable autosave";
		localStorage.setItem("autosave", true);
		window.persist = true;
		startAutosave();
		return true;
	}
}

function delete_data() {
	if(window.confirm("You are about to delete saved data. Are you sure you want to continue? THIS CAN NOT BE UNDONE!!!")){
		window.autosave_lock = true;
		localStorage.setItem("noupdates", false);
		localforage.setItem("snapshot-"+window.params.get("iso"), null).then(function () {
			 console.log("deleted save. Reloading . . .");
			window.location.reload(true);//reload the page
		});
	}
}


function fullscreen() {
	document.getElementById("screen_container").requestFullscreen();
}

