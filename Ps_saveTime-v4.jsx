// 日時の各情報を取得
var dateObj = new Date() ;
    
// 0埋め用の関数
var dateZellFill = function ( number ) {
    return ( "0" + number ).substr( -2 ) ;
}
var year = dateObj.getFullYear() ;	// 年
var month = dateZellFill( dateObj.getMonth() + 1 ) ;	// 月
var day= ("0"+dateObj.getDate()).slice(-2);//日。
var hour=dateObj.getHours()//時
var Minutes=("0"+dateObj.getMinutes()).slice(-2);//分。二桁に調整
var Seconds=("0"+dateObj.getSeconds()).slice(-2);//秒。二桁に調整

//年月日
var saveTime=year+month+day+"-"+hour+Minutes+Seconds;

//ファイル保存関数.。日付なしの場合
function psdSaveOpen(){
			var dNlength=docName.length;
			var dNrev=docName.split("").reverse().join("");
			var dNresult=dNrev.indexOf(".");
			var psdFile=docName.substr(0, dNlength-dNresult-1);
			var saveDir=new Folder(pathObj+"/"+psdFile+"-"+saveTime+".psd");
			var saveDirPng=new Folder(pathObj+"/"+psdFile+"-"+saveTime+".png");
			var saveFile=new File(saveDir);
			var saveFilePng=new File(saveDirPng);
			
		//保存するファイルの設定
		//psdオプション
		var SaveOpt=new PhotoshopSaveOptions();
			with(SaveOpt){
					alphaChannels = true;//アルファチャンネルの有無
					annotations = true;
					embedColorProfile = false;//「カラープロファイルの埋め込み」を指定。trueはチェックあり（埋め込む）。falseはチェックなし（うめこまない）。
					layers = true;//「レイヤー」の有無を指定。
					spotColors = false;//特色の有無
					}
				
			//PNG保存
			var PngOpt = new PNGSaveOptions();//pngで書き出す
			PngOpt.interlaced = true;//インターレースの有無
		
		docObj.save();//まず現在のファイルを保存
		

		//名前に時間を付加したファイルを保存
		docObj.saveAs(saveFile,SaveOpt,false,Extension.LOWERCASE);
		docObj.flatten();
		docObj.saveAs(saveFilePng,PngOpt,false);
		docObj.close();
		app.open(saveFile);//新しいファイルを開く
	}



//ファイル保存関数.。日付ありの場合、新しい日付に入れ替える
function psdSaveOpenRep(){

				docName.replace(/[0-9]{8}-[0-9]{6}/g,saveTime);
			var dNlength=docName.length;
			var dNrev=docName.split("").reverse().join("");
			var dNresult=dNrev.indexOf(".");
			var psdFile=docName.substr(0, dNlength-dNresult-1);
			var saveDir=new Folder(pathObj+"/"+psdFile+".psd");
			var saveDirPng=new Folder(pathObj+"/"+psdFile+".png");
			var saveFile=new File(saveDir);
			var saveFilePng=new File(saveDirPng);
			
		//保存するファイルの設定
		//psdオプション
		var SaveOpt=new PhotoshopSaveOptions();
			with(SaveOpt){
					alphaChannels = true;//アルファチャンネルの有無
					annotations = true;
					embedColorProfile = false;//「カラープロファイルの埋め込み」を指定。trueはチェックあり（埋め込む）。falseはチェックなし（うめこまない）。
					layers = true;//「レイヤー」の有無を指定。
					spotColors = false;//特色の有無
					}
				
		//PNG保存
			var PngOpt = new PNGSaveOptions();//pngで書き出す
			PngOpt.interlaced = true;//インターレースの有無
		
		docObj.save();//まず現在のファイルを保存
		

		//名前に時間を付加したファイルを保存
		docObj.saveAs(saveFile,SaveOpt,false,Extension.LOWERCASE);
		docObj.flatten();//png保存用に画像を統合.psdには影響なし
		docObj.saveAs(saveFilePng,PngOpt,false);
		docObj.close();
		app.open(saveFile);//新しいファイルを開く
}



//条件分岐
var docObj=app.activeDocument;
var pathObj=decodeURI(docObj.path);
var docName=docObj.name;
		if(docName.match(/\./g).length>=2){//ファイル名にドットが2つ以上のときは動作しない
			alert("「.」がファイル名に2つ以上使用されています");
			}else if(docName.match(/[0-9]{8}-[0-9]{6}/g)==null){//タイムスタンプがすでにある場合は新しいのにする
				psdSaveOpen();
				}
			else{
				psdSaveOpenRep();
				}
