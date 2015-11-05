drawr.directive("draw", function() {
  return {
    link: function(scope, element){
  //sets the canvas to a 2 dimensional context
  var ctx = element[0].getContext('2d');

  // sets drawing variable to false meaning drawing isn't happening yet
  var drawing = false;

  // the last coordinates before the current move
  var lastX;
  var lastY;

  element.bind('mousedown', function(event){
    //tracks the x and y coordinates
    if(event.offsetX!==undefined){
      lastX = event.offsetX;
      lastY = event.offsetY;
    } else {
      lastX = event.layerX - event.currentTarget.offsetLeft;
      lastY = event.layerY - event.currentTarget.offsetTop;
    }

    // begins new line
    ctx.beginPath();

    drawing = true;
  });

  element.bind('mousemove', function(event){
    if(drawing){
      // get current mouse position
      if(event.offsetX!==undefined){
        currentX = event.offsetX;
        currentY = event.offsetY;
      } else {
        currentX = event.layerX - event.currentTarget.offsetLeft;
        currentY = event.layerY - event.currentTarget.offsetTop;
      }

      draw(lastX, lastY, currentX, currentY);

      // set current coordinates to last one
      lastX = currentX;
      lastY = currentY;
    }

  });
  element.bind('mouseup', function(event){
    // stop drawing
    drawing = false;
  });

  var gradient=ctx.createLinearGradient(0,0,170,0);
  gradient.addColorStop("0","magenta");
  gradient.addColorStop("0.5","blue");
  gradient.addColorStop("1.0","red");
  // canvas reset
  function reset(){
   element[0].width = element[0].width;
  }

  function draw(lX, lY, cX, cY){
    // line from
    ctx.moveTo(lX,lY);
    // to
    ctx.lineTo(cX,cY);
    // color
    ctx.strokeStyle = "black";
    // draw it
    ctx.stroke();
  }
}
  };
});
