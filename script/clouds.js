const cloudSpeed=1;
const distanceBetweenCloud=500;
addEventListener("load",function (){
   let aantalClouds=window.innerWidth/100;
   console.log(aantalClouds)
   setInterval(cloudUpdate,timeBetweenFrames);
});

function getClouds() {
   return document.getElementsByClassName("cloud");
}

function makeCloud() {
   let bird=getBird();
   // let cloud=document.createElement("div");
   let cloud=document.createElement("img");
   cloud.src="../media/cloud.png";
   cloud.classList.add("cloud");
   cloud.style.position="absolute";
   // cloud.appendChild(img);
   bird.insertAdjacentElement("afterend",cloud);

   resetCloud(cloud);
   // bird.insertAdjacentElement("afterend",img);
}

function cloudUpdate() {
   let clouds=getClouds();
   let lastCloud=0;
   for (let i = 0; i < clouds.length; i++) {
      // console.log(clouds.length);
      let cloud=clouds[i];
      let x=getX(cloud);
      x-=cloudSpeed;
      lastCloud=Math.max(x,lastCloud);
      if (x<-500) {
        cloud.remove();
      } else {
         setX(cloud,x);
      }
   }
   lastCloud=window.innerWidth-lastCloud;
   if (lastCloud>=distanceBetweenCloud || !Math.round(Math.random()*150)) {
      makeCloud();
   }
}

function resetCloud(cloud) {
   let newHeigt=randomNumber(50,100);
   setY(cloud,newHeigt);
   setX(cloud,window.innerWidth+10);
}




