"use strict";
var stage = {
  w: 1280,
  h: 720,
};

var _pexcanvas = document.getElementById("canvas");
_pexcanvas.width = stage.w;
_pexcanvas.height = stage.h;
var ctx = _pexcanvas.getContext("2d");

var pointer = {
  x: 0,
  y: 0,
};

var scale = 1;
var portrait = true;
var loffset = 0;
var toffset = 0;
var mxpos = 0;
var mypos = 0;

// ------------------------------------------------------------------------------- Gamy

let branches = [];
let leaves = [];
let apples = [];

function drawApple(x, y, w) {
  ctx.beginPath();
  ctx.moveTo(x, y + w / 4);
  ctx.bezierCurveTo(x - w, y - w, x - w * 2, y + w / 4, x, y + w * 1.5);
  ctx.bezierCurveTo(x + w * 2, y + w / 4, x + w, y - w, x, y + w / 4);
  ctx.fillStyle = "#ff0000"; // Red color
  ctx.fill();

  ctx.font = "24px Arial"; // Set the font size and style
ctx.fillStyle = "#000000"; // Set the text color
ctx.textAlign = "center"; // Center the text horizontally
ctx.fillText("Dekha Jyoti apne pyaar ka ped laga diya diya hai mere dil mai", canvas.width / 2, 50);
}

branches.push({
  x: stage.w / 2,
  y: stage.h,
  act: true,
  l: 0,
  tl: stage.h / 2 - 100,
  a: Math.PI,
  s: 0,
  w: 15,
});
let timer = 0;
function enginestep() {
  ctx.clearRect(0, 0, stage.w, stage.h);
  timer++;
  if (timer > 300) {
    branches = [
      {
        x: stage.w / 2,
        y: stage.h,
        act: true,
        l: 0,
        tl: stage.h / 2 - 100,
        a: Math.PI,
        s: 0,
        w: 15,
      },
    ];
    leaves = [];
    apples = [];
    timer = 0;
  }
  ctx.lineCap = "round";
  ctx.strokeStyle = "#716040";
  branches.forEach((b) => {
    if (b.s < 5) {
      ctx.lineWidth = b.w;
      if (b.l < b.tl - 3) {
        b.l += (b.tl - b.l) / 8;
      } else if (b.act) {
        b.act = false;
        if (b.s == 4) {
          if (Math.random() * 30 < 1) {
            apples.push({
              x: b.x + Math.sin(b.a) * b.l,
              y: b.y + Math.cos(b.a) * b.l,
              w: 0,
              sz: Math.random() * 5 + 8,
            });
          } else {
            leaves.push({
              x: b.x + Math.sin(b.a) * b.l,
              y: b.y + Math.cos(b.a) * b.l,
              w: 0,
              sz: Math.random() * 5 + 8,
              h: 0,
              a: Math.PI * 1.5 - b.a,
            });
          }
        } else {
          for (let i = 0; i < 5; i++) {
            branches.push({
              x: b.x + Math.sin(b.a) * b.l,
              y: b.y + Math.cos(b.a) * b.l,
              act: true,
              l: 0,
              tl: Math.random() * (150 - b.s * 35) + 20,
              a: b.a + Math.random() * Math.PI - Math.PI / 2,
              s: b.s + 1,
              w: b.w * 0.5,
            });
          }
        }
      }
      ctx.beginPath();
      ctx.moveTo(b.x, b.y);
      ctx.lineTo(b.x + Math.sin(b.a) * b.l, b.y + Math.cos(b.a) * b.l);
      ctx.stroke();
    }
  });
  ctx.fillStyle = "#2ecc71";

  // ctx.beginPath();
  // ctx.ellipse(100, 100, 60, 30, 100, 0, Math.PI *2);
  // ctx.fill();
  leaves.forEach((l) => {
    l.w += (l.sz - l.w) / 10;
    l.h += (l.sz / 2 - l.h) / 10;
    ctx.beginPath();
    ctx.ellipse(l.x, l.y, l.w, l.h, l.a, 0, Math.PI * 2);
    ctx.fill();
  });
  apples.forEach((a) => {
    a.w += (a.sz - a.w) / 10;
    drawApple(a.x, a.y, a.w);
  });
}

// ------------------------------------------------------------------------------- events
// ------------------------------------------------------------------------------- events
// ------------------------------------------------------------------------------- events
// ------------------------------------------------------------------------------- events

function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullScreen ||
    docEl.msRequestFullscreen;
  var cancelFullScreen =
    doc.exitFullscreen ||
    doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen ||
    doc.msExitFullscreen;

  if (
    !doc.fullscreenElement &&
    !doc.mozFullScreenElement &&
    !doc.webkitFullscreenElement &&
    !doc.msFullscreenElement
  ) {
    requestFullScreen.call(docEl);
  } else {
    cancelFullScreen.call(doc);
  }
}

var ox = 0;
var oy = 0;
function mousestart(e) {
  mxpos = (e.pageX - loffset) * scale;
  mypos = (e.pageY - toffset) * scale;
}
function mousemove(e) {
  mxpos = (e.pageX - loffset) * scale;
  mypos = (e.pageY - toffset) * scale;
  pointer.x = mxpos;
  pointer.y = mypos;

  // ball.vY += (mxpos-ox)/15*line.d;

  ox = mxpos;
}

function mouseend(e) {}

window.addEventListener(
  "mousedown",
  function (e) {
    mousestart(e);
  },
  false
);
window.addEventListener(
  "mousemove",
  function (e) {
    mousemove(e);
  },
  false
);
window.addEventListener(
  "mouseup",
  function (e) {
    mouseend(e);
  },
  false
);
window.addEventListener(
  "touchstart",
  function (e) {
    e.preventDefault();
    mousestart(e.touches[0]);
  },
  false
);
window.addEventListener(
  "touchmove",
  function (e) {
    e.preventDefault();
    mousemove(e.touches[0]);
  },
  false
);
window.addEventListener(
  "touchend",
  function (e) {
    e.preventDefault();
    mouseend(e.touches[0]);
  },
  false
);

// ------------------------------------------------------------------------ stager
// ------------------------------------------------------------------------ stager
// ------------------------------------------------------------------------ stager
// ------------------------------------------------------------------------ stager
function _pexresize() {
  var cw = window.innerWidth;
  var ch = window.innerHeight;
  if (cw <= (ch * stage.w) / stage.h) {
    portrait = true;
    scale = stage.w / cw;
    loffset = 0;
    toffset = Math.floor(ch - (cw * stage.h) / stage.w) / 2;
    _pexcanvas.style.width = cw + "px";
    _pexcanvas.style.height = Math.floor((cw * stage.h) / stage.w) + "px";
  } else {
    scale = stage.h / ch;
    portrait = false;
    loffset = Math.floor(cw - (ch * stage.w) / stage.h) / 2;
    toffset = 0;
    _pexcanvas.style.height = ch + "px";
    _pexcanvas.style.width = Math.floor((ch * stage.w) / stage.h) + "px";
  }
  _pexcanvas.style.marginLeft = loffset + "px";
  _pexcanvas.style.marginTop = toffset + "px";
}

window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

var fps = 60;

var nfcount = 0;

function animated() {
  requestAnimFrame(animated);
  enginestep();

  nfcount++;
  ctx.fillStyle = "#2c3e50";
  ctx.font = "14px arial";
  ctx.textAlign = "left";
  // ctx.fillText("FPS: "+Math.floor(fps),stage.w-100,stage.h-100);
}

_pexresize();
animated();

function countfps() {
  fps = nfcount;
  nfcount = 0;
}
setInterval(countfps, 1000);
