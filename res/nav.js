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


showCont(home);
tick();