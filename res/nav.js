var navs = document.getElementsByClassName("cont");
var home = "cont-home";
var currentNav = home;
for (let i = 0; i < navs.length; i++) {
    navs[i].style.display = "none";
}


function hideCont() {
    for (let i = 0; i < navs.length; i++) {
        navs[i].style.display = "none";
    }
}
function showCont(nav) {
    hideCont();
    navs[nav].style.display = "block";
    currentNav = nav;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

async function tick(callLoop) {
    while(true) {
        console.log("tick");
        if (document.getElementsByClassName("min").length > 0) {
            document.getElementById("navBar").style.marginBottom = "45px";
        }else {
            document.getElementById("navBar").style.marginBottom = "10px";
        }
    
        if (document.getElementsByClassName("max").length > 0) {
            document.getElementById("navBar").style.marginBottom = "-45px"
            document.getElementById("navBar").style.opacity = "0.2";
            hideCont();
        }else {
            document.getElementById("navBar").style.opacity = "1";
            showCont(currentNav);
        }
        await delay(100);
    }
    }


    function newWin(name,cont,mount,cfg) {
        if (cfg == undefined || cfg == null || cfg == "") {
            cfg = {
                width: 600,
                height: 500,
                x: 50,
                y: 50,
            }
        }
        if (mount == true) {
            new WinBox(name, {
            class: "modern",
            mount: cont,
            width: cfg.width,
            height: cfg.height
        });
        }else {
            new WinBox(name, {
            class: "modern",
            html: cont,
            width: cfg.width,
            height: cfg.height,
            x: cfg.x,
            y: cfg.y,
            });
        }
    
    
    
    }

    var db = "https://script.google.com/macros/s/AKfycbwG9_gq4u8ZPXuV3N8dwJT-P9j5ms4xLfC-5ZKyCbgJEKGw658DW6Ma72-nEuXzZlrS/exec"
    var fetchedData = {};
    function parseB64Dat(arr) {
        for (let i = 1; i < arr.length; i++) {
            arr[i] = JSON.parse(atob(arr[i]));
        }
        
        return arr;
        }
        
    function getCellVal(val,retName,callback) {
        const formData = new FormData();
        formData.append("action","getVal");
        const url1 = `${db}?key=${val}`;
        fetch(url1,{
            method:'POST',
            body : formData
        })
        .then(res => res.json())
        .then(data => {
           // //console.log(data);
           console.log("%c Fetched " + val + " and placed it in " + retName,"color:lime;");
            fetchedData[retName] = data.flat();
            console.table(fetchedData);
            //alert("all good blud");
            //QUnit.dump.parse(fetchedData);
            callback(fetchedData);
        })   
    }
    function getAllCells(val,retName,callback) {
        const formData = new FormData();
        formData.append("action","getAllValsIn");
        formData.append("column",val);
        const url1 = `${db}?key=${val}`;
        fetch(url1,{
            method:'POST',
            body : formData
        })
        .then(res => res.json())
        .then(data => {
        //  console.log(data);
           console.log("%c Fetched " + val + " and placed it in fetchedData." + retName,"color:lime;");
            fetchedData[retName] = data.flat();
            console.table(fetchedData);
            callback(fetchedData);
        })   
    }
    function isBase64(str) {
        if (str ==='' || str.trim() ===''){ return false; }
        try {
            return btoa(atob(str)) == str;
        } catch (err) {
            return false;
        }
    }
    function displayBlog() {
        document.getElementById("JB_blog").innerHTML = "";
   for (let i = 0; i < fetchedData.blog.length; i++) {
       if (isBase64(fetchedData.blog[i].cont)) {
           fetchedData.blog[i].cont = atob(fetchedData.blog[i].cont);
       }
       document.getElementById("JB_blog").innerHTML = `
       <div class="vertical-rect glass"><h2 style="margin:0;">${fetchedData.blog[i].title}</h2><h5 style="margin:0;margin-top:5px;margin-bottom:5px;">Posted by:${fetchedData.blog[i].poster} on ${fetchedData.blog[i].date}</h5>
       ${fetchedData.blog[i].cont}
       </div>
       `+document.getElementById("JB_blog").innerHTML;
   }
}
function displayProjects() {
    document.getElementById("projects").innerHTML = "";
    for (let i = fetchedData.projects.length - 1; i >= 0; i--) {
console.log(i)
        document.getElementById("projects").innerHTML += `
        <div class="vertical-rect glass">
        <div>
            <img src="https://media.istockphoto.com/id/1401105799/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=TW1ZU3X512_3lGWDFhEygj66CT1Ikj1-R51FCdwJ31E=" class="proj-img" alt="">
        </div>
        <h1 class="proj-tit">${fetchedData.projects[i].name}</h1>
        <div class="proj-desc">
            ${fetchedData.projects[i].desc}
        </div>
    </div>
    
        `

    }
}
    function getProjects() {
        getAllCells("E","projects",dat => {
            fetchedData.projects = parseB64Dat(fetchedData.projects);
            fetchedData.projects.shift();
            fetchedData.projects.reverse();
            console.log(fetchedData.projects);
            displayProjects();
        })
    }


    function getBlog() {
        getAllCells("C","blog",dat => {
            fetchedData.blog = parseB64Dat(fetchedData.blog);
            fetchedData.blog.shift();
            fetchedData.blog.reverse();
            console.log(fetchedData.blog);
            displayBlog();
        })
    }




    
    



getBlog();
getProjects();
showCont(home);
tick();