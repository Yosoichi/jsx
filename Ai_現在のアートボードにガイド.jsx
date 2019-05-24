//現在のアートボードを求める
var doc=app.activeDocument;
var ab=doc.artboards;
var abId=ab.getActiveArtboardIndex();
var activeAb=ab[abId];

//表示する単位を設定
//単位ごとの条件分岐。除算する係数を設定
switch(doc.rulerUnits){
	case RulerUnits.Millimeters:
		var unit="mm";
	break;
	
	case RulerUnits.Points:
		var unit="pt";
	break;
	
	case RulerUnits.Pixels:
		var unit="pixel";
	break;
	
	case RulerUnits.Inches:
		var unit="インチ";
	break;
	
	case RulerUnits.Qs:
		var unit="Q";
	break;
	
	case RulerUnits.Picas:
		var unit="パイカ";
	break;
	
	default:
		var unit="";
	break;
}


//ページ指定
var prmpt=prompt("オフセット値を入力（単位："+unit+"）","0");
//全角数字対応
var prrep = prmpt.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
	return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
	});
var offset=Number(prrep);

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
	
