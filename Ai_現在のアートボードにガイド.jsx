//「ガイドマン&トンボマン」としてCEP化

//現在のアートボードを求める
var doc=app.activeDocument;
var ab=doc.artboards;
var abId=ab.getActiveArtboardIndex();
var activeAb=ab[abId];
var offset=0;

//単位ごとの条件分岐。除算する係数を設定
    switch(doc.rulerUnits){
        case RulerUnits.Millimeters:
            var coefficient=0.35278;
			var offsetInt=parseFloat(offset)/coefficient;
            break;
        case RulerUnits.Points:
        case RulerUnits.Pixels:
            var coefficient=1;
			var offsetInt=parseFloat(offset)/coefficient;
            break;
       case RulerUnits.Inches:
            var coefficient=72;
			var offsetInt=parseFloat(offset)*coefficient;
            break;
        case RulerUnits.Qs:
            var coefficient=1.41;
			var offsetInt=parseFloat(offset)/coefficient;
            break;
        case RulerUnits.Picas:
            var coefficient=12;
			var offsetInt=parseFloat(offset)*coefficient;
            break;
        case RulerUnits.Centimeters:
            var coefficient=28.346;
			var offsetInt=parseFloat(offset)*coefficient;
            break;
        default:
            //alert("");
            break;
    }


//アードボードの座標を求める。ミリに置き換え
var abRect=activeAb.artboardRect;
var x1=abRect[0];
var y1=abRect[1];
var x2=abRect[2];
var y2=abRect[3];

//長方形を作成
var lay=doc.layers[0];
var rect=lay.pathItems.rectangle(y1-offsetInt,x1+offsetInt,x2-x1-offsetInt*2,((y2-y1)*-1)-offsetInt*2);
	rect.guides=true;
	