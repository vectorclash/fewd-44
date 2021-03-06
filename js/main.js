var header;
var time1 = 0.0;
var time2 = 0.0;
var interval1 = 0.001;
var interval2 = 0.002;

var links;

function init() {
    links = document.querySelectorAll("a");
    for(var i = 0; i < links.length; i++) {
        var link = links[i];
        link.addEventListener("mouseover", onButtonOver);
        link.addEventListener("mouseout", onButtonOut);
    }
	header = document.querySelector("h1");
	TweenMax.ticker.addEventListener("tick", render);
}

function onButtonOver(e) {
    TweenMax.to(e.currentTarget, 0.5, {color:Math.random()*0xFFFFFF, ease:Elastic.easeOut});
}

function onButtonOut(e) {
    TweenMax.to(e.currentTarget, 0.5, {color:0x333333, ease:Back.easeOut});
}

function render() {
	header.style.background = "linear-gradient(42deg," + hslToRgb(noise.perlin2(100, time1), 0.6, 0.6) + "," + hslToRgb(noise.perlin2(100, time2), 0.6, 0.6) + ")";

	time1 += interval1;
	time2 += interval2;
}

function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return 'rgb(' + Math.round(r * 255) + ',' + Math.round(g * 255) + ',' + Math.round(b * 255) + ')';
}