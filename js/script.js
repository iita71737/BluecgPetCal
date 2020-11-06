const Pts_url = "https://gist.githubusercontent.com/iita71737/5436461f8a4aad5b854d32a9942467b5/raw/469fb06eacb2c7cea7d8c3b12103d5ad1baef42c/script.js";
const Pts = {}; //定義一個空既物件
const raceNames = new Array(
  "野獸系",
  "不死系",
  "飛行系",
  "昆蟲系",
  "植物系",
  "特殊系",
  "金屬系",
  "龍型系",
  "人型系",
  "邪魔系"
)
const bpRule = new Array (
  0.00, 0.04, 0.08, 0.12, 0.16, 0.205, 0.25, 0.29, 0.33, 0.37, 0.415, 
  0.46, 0.50, 0.54, 0.58, 0.625, 0.67, 0.71, 0.75, 0.79, 0.835, 0.88,
  0.92, 0.96, 1.00, 1.045, 1.09, 1.13, 1.17, 1.21, 1.255, 1.30, 1.34,
  1.38, 1.42, 1.465, 1.51, 1.55, 1.59, 1.63, 1.675, 1.72, 1.76, 1.80,
  1.84, 1.885, 1.93, 1.97, 2.01, 2.05, 2.095, 2.14, 2.18, 2.22, 2.265,
  2.31, 2.35, 2.39, 2.43, 2.475
)
const bpAbility = {
hp:[8,2,3,3,1],
mp:[1,2,2,2,10],
atk:[0.2,2.7,0.3,0.3,0.2],
def:[0.2,0.3,3,0.3,0.2],
dex:[0.1, 0.2, 0.2, 2, 0.1],
spi:[-0.3, -0.1, 0.2, -0.1, 0.8],
rec:[0.8, -0.1, -0.1, 0.2, -0.3],
}
const bpRandom = [2,2,2,2,2]
const petEachGrade = [0,0,0,0,0]
let ptMenuNum = 0
let remPoint = 144
const allLv1Bp = [0,0,0,0,0]  //Lv1bp
const predLvBp = [0,0,0,0,0]  //預測不配點Bp
const predLvData = [] //預測資料
const manualBp = [0,0,0,0,0,0.2]
let pointforwhat = 0
const pointArray = [0,0,0,0,0]

const headcontainer = document.querySelector(".headcontainer")
const ptMenu = document.querySelector("#ptMenu")
const petRacebox = document.querySelector(".pet-race")
const petRaceSelect = document.querySelector("#pet-race")

<!--PetInfo-->
const cardNum = document.querySelector('.cardNum')
const bpVit = document.querySelector('.bpvit')
const cardLv = document.querySelector('.cardlv')
const petPic = document.querySelector('.petPic')
const petName = document.querySelector('.petname')
const btStr = document.querySelector('.btstr')
const petArr1 = document.querySelector('.petarr1')
const petRace = document.querySelector('.petrace')
const bpDef = document.querySelector('.bpdef')
const petArr2 = document.querySelector('.petarr2')
const petSkiLen = document.querySelector('.petskilen')
const bpDex = document.querySelector('.bpdex')
const petArr3 = document.querySelector('.petarr3')
const bpTotal = document.querySelector('.bptotal')
const bpInt = document.querySelector('.bpint')
const petArr4 = document.querySelector('.petarr4')
const petLocated = document.querySelector('.petlocated')
const petBaby = document.querySelector('.petbaby')
const petProbility = document.querySelector('.petProbability')
const petCatch = document.querySelector('.petCatch')
const span = document.createElement('span')
const mainway = document.querySelector('.mainway')
const predPS = document.querySelector('.predPS')
const petPointMix = document.querySelector('.petpointmix')
const petPointMixBtn = document.querySelectorAll('.petpointmix button')
const eachPointText = document.querySelectorAll('.petpointmix input')
const eachPoint = []
for ( let i in eachPointText ) {
  eachPoint.slice(i,1,eachPointText[i])
}
<!--Petinfoend-->

<!--全區域監聽器-->
headcontainer.addEventListener('input', function (event) {
  if (event.target === petRaceSelect ) {
      loadMenu(event.target.selectedIndex - 1)
  }
  if (event.target === ptMenu){
    ptMenuNum = event.target.value
    petInfo(ptMenuNum)
    let picNum = event.target.value  
    if  ( picNum.length < 3 ) {
      picNum ++
      let pichtml = 'http://qo3op.asuscomm.com/bluecgpet/image/' + paddingLeft(picNum , 3)  + '.gif'
    petPic.children[0].setAttribute('src', pichtml)
  }
  }
  if (event.target.name === 'vitradio') { 
    petEachGrade.splice(0, 1, Number(event.target.value))
    petInfo(ptMenuNum)
    preddataforpoint(predLvData)
    if( ptMenuNum === -1) {
      lv1data (manualBp[0],manualBp[1],manualBp[2],manualBp[3],manualBp[4],manualBp[5])
      preddataforpoint(predLvData)
    }
  }
  if (event.target.name === 'strradio') { 
    petEachGrade.splice(1, 1, Number(event.target.value))
    petInfo(ptMenuNum)
    preddataforpoint(predLvData)
    if( ptMenuNum === -1) {
      lv1data (manualBp[0],manualBp[1],manualBp[2],manualBp[3],manualBp[4],manualBp[5])
      preddataforpoint(predLvData)
    }
  }
  if (event.target.name === 'defradio') { 
    petEachGrade.splice(2, 1, Number(event.target.value))
    petInfo(ptMenuNum)
    preddataforpoint(predLvData)
    if( ptMenuNum === -1) {
      lv1data (manualBp[0],manualBp[1],manualBp[2],manualBp[3],manualBp[4],manualBp[5])
      preddataforpoint(predLvData)
    }
  }
  if (event.target.name === 'dexradio') { 
    petEachGrade.splice(3, 1, Number(event.target.value))
    petInfo(ptMenuNum)
    preddataforpoint(predLvData)
    if( ptMenuNum === -1) {
      lv1data (manualBp[0],manualBp[1],manualBp[2],manualBp[3],manualBp[4],manualBp[5])
      preddataforpoint(predLvData)
    }
  }
  if (event.target.name === 'intradio') { 
    petEachGrade.splice(4, 1, Number(event.target.value))
    petInfo(ptMenuNum)
    preddataforpoint(predLvData)
    if( ptMenuNum === -1) {
      lv1data (manualBp[0],manualBp[1],manualBp[2],manualBp[3],manualBp[4],manualBp[5])
      preddataforpoint(predLvData)
    }
  }
  <!--手動輸入成長區域-->
  if (event.target.name === 'manualvit') {
    manualBp.splice(0, 1, Number(event.target.value))
    lv1data (manualBp[0],manualBp[1],manualBp[2],manualBp[3],manualBp[4],manualBp[5])
    ptMenuNum = -1
  }
  if (event.target.name === 'manualstr') {
    manualBp.splice(1, 1, Number(event.target.value))
    lv1data (manualBp[0],manualBp[1],manualBp[2],manualBp[3],manualBp[4],manualBp[5])
    ptMenuNum = -1
  }
  if (event.target.name === 'manualdef') {
    manualBp.splice(2, 1, Number(event.target.value))
     lv1data (manualBp[0],manualBp[1],manualBp[2],manualBp[3],manualBp[4],manualBp[5])
    ptMenuNum = -1
  }
  if (event.target.name === 'manualdex') {
    manualBp.splice(3, 1, Number(event.target.value))
     lv1data (manualBp[0],manualBp[1],manualBp[2],manualBp[3],manualBp[4],manualBp[5])
    ptMenuNum = -1
  }
  if (event.target.name === 'manualint') {
    manualBp.splice(4, 1, Number(event.target.value))
    lv1data (manualBp[0],manualBp[1],manualBp[2],manualBp[3],manualBp[4],manualBp[5])
    ptMenuNum = -1
  }
  if (event.target.name === 'manualBaseBp') {
    manualBp.splice(5, 1, Number(event.target.value))
    lv1data (manualBp[0],manualBp[1],manualBp[2],manualBp[3],manualBp[4],manualBp[5])
    ptMenuNum = -1
    
  }
  
  if(event.target.name === 'mainpoint'){
    petInfo(ptMenuNum)
    if(event.target.value === 'vit') {
      mainway.innerHTML = '#全加體'
      pointforwhat = 1 
      preddataforpoint(predLvData)
    }
    if(event.target.value === 'str') {
      mainway.innerHTML = '#全加力'
      pointforwhat = 2
      preddataforpoint(predLvData)
    }
    if(event.target.value === 'def') {
      mainway.innerHTML = '#全加強'
      pointforwhat = 3
      preddataforpoint(predLvData)
    }
    if(event.target.value === 'dex') {
      mainway.innerHTML = '#全加速'
      pointforwhat = 4
      preddataforpoint(predLvData)
    }
    if(event.target.value === 'int') {
      mainway.innerHTML = '#全加魔'
      pointforwhat = 5
      preddataforpoint(predLvData)
    }
    if(event.target.value === 'keeppoint') {
      mainway.innerHTML = '#保留點數'
      pointforwhat = 0
      preddataforpoint(predLvData)
    }
  }
})

<!--混點加減監聽器-->
petPointMix.addEventListener("click", function (event) {
  if ( event.target.type === 'button' ) {
    
  }  
})


<!--模擬等級監聽器-->
const petlvselectbox = document.querySelector('.petlvselectbox')
const predLv = document.querySelector('.predlv')
const points = document.querySelector('.points')
petlvselectbox.addEventListener('input' , function (event) {
  event.target.parentElement.children[2].value = event.target.value
  event.target.parentElement.children[1].value = event.target.value
  if ( event.target.className === 'petlvselect' || event.target.className === 'petlvselecttext' ) {
    predLv.innerHTML = event.target.value
  }
  remPoint = predLv.innerHTML - 1
  points.value = remPoint
  petInfo(ptMenuNum)
  preddataforpoint(predLvData)
  if( ptMenuNum === -1) {
      lv1data (manualBp[0],manualBp[1],manualBp[2],manualBp[3],manualBp[4],manualBp[5])
      preddataforpoint(predLvData)
    }
})

<!--左位補0-->
function paddingLeft(str,lenght){
      if(str.length >= lenght)
      return str;
      else
      return paddingLeft("0" +str,lenght);
    }

<!--載入選項-->
function loadMenu(menuIndex) { 
  if (menuIndex != -1) {
    ptMenu.options.length = 0;
    for (let ptNum in Pts.list) {
      if (Pts.list[ptNum][2] === menuIndex) {
        ptMenu.innerHTML +=
      '<option value="' + ptNum + '">' + Pts.list[ptNum][1] + "</option>";
      }
    }
  }
}

<!--載入外部JSON資料-->
$.ajax({
  url: Pts_url,
  success: function (res) {
    Pts.list = JSON.parse(res)
    loadinfo()
    //test.innerHTML = Pts.list[0]
  }
});

<!--載入寵物選項-->
function loadinfo() {
  for (var i in raceNames) {
    petRaceSelect.innerHTML +=
      '<option value="' + i + '">' + raceNames[i] + "</option>";
  }
  for (let ptNum in Pts.list) {
    ptMenu.innerHTML +=
      '<option value="' + ptNum + '">' + Pts.list[ptNum][1] + "</option>";
  }
}

<!--載入寵物詳細資料-->
function petInfo (selectNum) {
  const petNumber = selectNum
  if ( petNumber !== -1) {
    cardNum.innerHTML =  '<span>' + Pts.list[petNumber][0] + '</span>'
  bpVit.innerHTML = Pts.list[petNumber][3]
    if ( Pts.list[petNumber][10] === 'X' ) {
      cardLv.innerHTML = '無' 
    } else if ( Pts.list[petNumber][10] === 'G' ) {
      cardLv.innerHTML = '金卡' + Pts.list[petNumber][11] + '等'
    } else if ( Pts.list[petNumber][10] === 'S') {
      cardLv.innerHTML = '銀卡' + Pts.list[petNumber][11] + '等'
    } else {
      cardLv.innerHTML = '普卡' + Pts.list[petNumber][11] + '等'
    }
  petName.innerHTML = Pts.list[petNumber][1]
  btStr.innerHTML = Pts.list[petNumber][4]
  petRace.innerHTML = raceNames[Pts.list[petNumber][2]]
  bpDef.innerHTML = Pts.list[petNumber][5]
  petSkiLen.innerHTML = Pts.list[petNumber][12]
  bpDex.innerHTML = Pts.list[petNumber][6]
  bpTotal.innerHTML = Pts.list[petNumber][3] + Pts.list[petNumber][4] + Pts.list[petNumber][5] +    Pts.list[petNumber][6] + Pts.list[petNumber][7]
  bpInt.innerHTML = Pts.list[petNumber][7]
  petLocated.innerHTML = Pts.list[petNumber][13]
  petBaby.innerHTML = Pts.list[petNumber][14]
  petProbility.innerHTML = Pts.list[petNumber][15] 
  petCatch.innerHTML = Pts.list[petNumber][16]
  if (Pts.list[petNumber][8] === 'A'){
    petArr1.innerHTML = Pts.list[petNumber][9]
    petArr2.innerHTML = 10 - Pts.list[petNumber][9]
    petArr3.innerHTML = ''
    petArr4.innerHTML = ''
  } else if ( Pts.list[petNumber][8] === 'B' ){
    petArr1.innerHTML = ''
    petArr2.innerHTML = Pts.list[petNumber][9]
    petArr3.innerHTML = 10 - Pts.list[petNumber][9]
    petArr4.innerHTML = ''
  } else if ( Pts.list[petNumber][8] === 'C' ){
    petArr1.innerHTML = ''
    petArr2.innerHTML = ''
    petArr3.innerHTML = Pts.list[petNumber][9]
    petArr4.innerHTML = 10 - Pts.list[petNumber][9]
  } else if ( Pts.list[petNumber][8] === 'D' ){
    petArr4.innerHTML = Pts.list[petNumber][9]
    petArr1.innerHTML = 10 - Pts.list[petNumber][9]
    petArr2.innerHTML = ''
    petArr3.innerHTML = ''
  } else if ( Pts.list[petNumber][8] === 'X' ){
    petArr1.innerHTML = Pts.list[petNumber][9][0]
    petArr2.innerHTML = Pts.list[petNumber][9][1]
    petArr3.innerHTML = Pts.list[petNumber][9][2]
    petArr4.innerHTML = Pts.list[petNumber][9][3]
  }
  const vit = Pts.list[petNumber][3]
  const str = Pts.list[petNumber][4]
  const def = Pts.list[petNumber][5]
  const dex = Pts.list[petNumber][6]
  const int = Pts.list[petNumber][7]
  setBpStar (vit,str,def,dex,int) 
  setArrIcon (Pts.list[petNumber][8] , Pts.list[petNumber][9] ) 
  <!--成長預測-->
  const baseBp = calBaseBP(Pts.list[petNumber][0])
  lv1data (vit,str,def,dex,int,baseBp)
  }
}

<!--設定星星-->
const star = document.querySelectorAll('.star')
const icon = '<i class="fas fa-star" style="color:#FFAC00"></i>'
const half_icon =  '<i class="fas fa-star-half" style="color:#FFAC00"></i>'
const empty_icon = '<i class="far fa-star-half" style="color:#FFAC00"></i>'
function setBpStar (vit,str,def,dex,int) {
  for ( let i in arguments) {
      if ( arguments[i] <= 3) {
        star[i].innerHTML = empty_icon
      } else if ( 4 <= arguments[i] && arguments[i] <= 7) {
        star[i].innerHTML = half_icon
      } else if ( 8 <= arguments[i] && arguments[i] <= 12 ) {
        star[i].innerHTML = icon
      } else if ( 13 <= arguments[i] && arguments[i] <= 17 ) {
        star[i].innerHTML = icon + half_icon
      } else if ( 18 <= arguments[i] && arguments[i] <= 22 ) {
        star[i].innerHTML = icon + icon
      } else if ( 23 <= arguments[i] && arguments[i] <= 27 ) {
        star[i].innerHTML = icon + icon + half_icon
      } else if ( 28 <= arguments[i] && arguments[i] <= 32 ) {
        star[i].innerHTML = icon + icon + icon
      } else if ( 33 <= arguments[i] && arguments[i] <= 37 ) {
        star[i].innerHTML = icon + icon + icon + half_icon
      } else if ( 38 <= arguments[i] && arguments[i] <= 42 ) {
        star[i].innerHTML = icon + icon + icon + icon 
      } else if ( 43 <= arguments[i] && arguments[i] <= 47 ) {
        star[i].innerHTML = icon + icon + icon + icon + half_icon
      } else if ( 48 <= arguments[i] && arguments[i] <= 50 ) {
        star[i].innerHTML = icon + icon + icon + icon + icon
      } else if ( 51 <= arguments[i]  ) {
        star[i].innerHTML = icon + icon + icon + icon + icon + half_icon
      }
  }
}

<!--設定屬性顏色-->
const arrColor = document.querySelectorAll('.arrcolor')
const icon1 = '<i class="fas fa-leaf" style="color:#28C76F"></i>'
const icon2 = '<i class="fas fa-tint fa-lg" style="color:#004680">&thinsp;</i>'
const icon3 = '<i class="fab fa-gripfire fa-lg" style="color:#FF4500">&thinsp;</i>'
const icon4 = '<i class="fas fa-cloud" style="color:#F88400">&thinsp;</i>'
function setArrIcon ( arg1 , arg2 ) {
  arrColor[0].innerHTML = ''
  arrColor[1].innerHTML = ''
  arrColor[2].innerHTML = ''
  arrColor[3].innerHTML = ''
  if ( arg1 === "A" ) {
    for ( let i=0 ; i < arg2 ; i++ ) {
      arrColor[0].innerHTML += icon1 
    }
    for ( let i=0 ; i < (10-arg2) ; i++ ) {
      arrColor[1].innerHTML += icon2 
    }
  }
  if ( arg1 === "B" ) {
    for ( let i=0 ; i < arg2 ; i++ ) {
      arrColor[1].innerHTML += icon2 
    }
    for ( let i=0 ; i < (10-arg2) ; i++ ) {
      arrColor[2].innerHTML += icon3 
    }
  }
  if ( arg1 === "C" ) {
    for ( let i=0 ; i < arg2 ; i++ ) {
      arrColor[2].innerHTML += icon3 
    }
    for ( let i=0 ; i < (10-arg2) ; i++ ) {
      arrColor[3].innerHTML += icon4 
    }
  }
  if ( arg1 === "D" ) {
    for ( let i=0 ; i < arg2 ; i++ ) {
      arrColor[3].innerHTML += icon4 
    }
    for ( let i=0 ; i < (10-arg2) ; i++ ) {
      arrColor[0].innerHTML += icon1 
    }
  }
  if ( arg1 === "X" ) {
    for ( let i=0 ; i < arg2.length ; i++ ) {
      for ( let j=0 ; j < arg2[i] ; j++ ) {
        if (arg2[i] !== 0  && i === 0) {
        arrColor[i].innerHTML += icon1
        }
        if (arg2[i] !== 0  && i === 1) {
        arrColor[i].innerHTML += icon2
        }
        if (arg2[i] !== 0  && i === 2) {
        arrColor[i].innerHTML += icon3
        }
        if (arg2[i] !== 0  && i === 3) {
        arrColor[i].innerHTML += icon4
        }
      }
    }
  }
}

<!--pet for lv1 data dom-->
const petlv1Dom = [
  document.querySelector('.lv1hp'),
  document.querySelector('.lv1mp'),
  document.querySelector('.lv1str'),
  document.querySelector('.lv1def'),
  document.querySelector('.lv1dex'),
  document.querySelector('.lv1spirit'),
  document.querySelector('.lv1recovery'),
  document.querySelector('.lv1bpvit'),
  document.querySelector('.lv1bpstr'),
  document.querySelector('.lv1bpdef'),
  document.querySelector('.lv1bpdex'),
  document.querySelector(".lv1bpint"),
]

<!--一等值預測(隨機檔22222)-->
function lv1data (vit,str,def,dex,int,baseBp) { 
  
  const predEachGrade = [ 
    vit-petEachGrade[0],
    str-petEachGrade[1],
    def-petEachGrade[2],
    dex-petEachGrade[3],
    int-petEachGrade[4],
  ] 
  
  const basicMag = baseBp
  for ( let i in allLv1Bp ) {
    allLv1Bp.splice(
    i,1,( Math.round( (predEachGrade[i]+2)*basicMag*1000 ) / 1000 )
  )
  }
  for (let i in petlv1Dom) {
    switch ( i ) {
      case '0':
            petlv1Dom[i].innerHTML =  Math.floor(20 + (predEachGrade[0]+2)*basicMag*8 + (predEachGrade[1]+2)*basicMag*2 + (predEachGrade[2]+2)*basicMag*3 + (predEachGrade[3]+2)*basicMag*3 + (predEachGrade[4]+2)*basicMag*1)
        break;
      case '1':
            petlv1Dom[i].innerHTML = Math.floor(20 + (predEachGrade[0]+2)*basicMag*1 + (predEachGrade[1]+2)*basicMag*2 + (predEachGrade[2]+2)*basicMag*2 + (predEachGrade[3]+2)*basicMag*2 + (predEachGrade[4]+2)*basicMag*10)
        break;
      case '2':
            petlv1Dom[i].innerHTML = Math.floor(20 + (predEachGrade[0]+2)*basicMag*0.2 + (predEachGrade[1]+2)*basicMag*2.7 + (predEachGrade[2]+2)*basicMag*0.3 + (predEachGrade[3]+2)*basicMag*0.3 + (predEachGrade[4]+2)*basicMag*0.3 )
        break;
      case '3':
            petlv1Dom[i].innerHTML = Math.floor( 20 + (predEachGrade[0]+2)*basicMag*0.2 + (predEachGrade[1]+2)*basicMag*0.3 + (predEachGrade[2]+2)*basicMag*3 + (predEachGrade[3]+2)*basicMag*0.3 + (predEachGrade[4]+2)*basicMag*0.2 )
        break;
      case '4':
            petlv1Dom[i].innerHTML = Math.floor( 20 + (predEachGrade[0]+2)*basicMag*0.1 + (predEachGrade[1]+2)*basicMag*0.2 + (predEachGrade[2]+2)*basicMag*0.2 + (predEachGrade[3]+2)*basicMag*2 + (predEachGrade[4]+2)*basicMag*0.1 )
        break;
      case '5':
            petlv1Dom[i].innerHTML = Math.floor( 100 + (predEachGrade[0]+2)*basicMag*(-0.3) + (predEachGrade[1]+2)*basicMag*(-0.1) + (predEachGrade[2]+2)*basicMag*0.2 + (predEachGrade[3]+2)*basicMag*(-0.1) + (predEachGrade[4]+2)*basicMag*0.8 )
        break;
      case '6':
            petlv1Dom[i].innerHTML = Math.floor( 100 + (predEachGrade[0]+2)*basicMag*0.8 + (predEachGrade[1]+2)*basicMag*(-0.1) + (predEachGrade[2]+2)*basicMag*(-0.1) + (predEachGrade[3]+2)*basicMag*(0.2) + (predEachGrade[4]+2)*basicMag*(-0.3) )
        break;
      case '7':
            petlv1Dom[i].innerHTML = Math.floor((predEachGrade[0]+2)*basicMag)
        break;
      case '8':
            petlv1Dom[i].innerHTML = Math.floor((predEachGrade[1]+2)*basicMag)
        break;
      case '9':
            petlv1Dom[i].innerHTML = Math.floor((predEachGrade[2]+2)*basicMag)
        break;
      case '10':
            petlv1Dom[i].innerHTML = Math.floor((predEachGrade[3]+2)*basicMag)
        break;
      case '11':
            petlv1Dom[i].innerHTML = Math.floor((predEachGrade[4]+2)*basicMag)
        break;
      }
    
  }
  preddata (vit,str,def,dex,int,baseBp)
  
}

<!--由圖鑑編號判斷一級每檔BP-->
function calBaseBP(num) {
      //#37使魔, #46小蝙蝠, #9001~#9004牛鬼
      if (num == 37 || num == 46 || num == 9001 || num == 9002 || num == 9003 || num == 9004) return 0.3
      //#221小鴨子, 非一級時, 每檔BP=0.22
      else if (num == 221 || num == 46 && level > 1) return 0.22
      //#2307二改愛絲波波
      else if (num == 2307 || num == 239) return 0.25
      else if (num == 7915) return 0.5
      //其他所有寵
      return 0.2
}

<!--pet for predlv data dom-->
const petPredDom = [
  document.querySelector('.predhp'),
  document.querySelector('.predmp'),
  document.querySelector('.predstr'),
  document.querySelector('.preddef'),
  document.querySelector('.preddex'),
  document.querySelector('.predspi'),
  document.querySelector('.predrec'),
  document.querySelector('.predbpvit'),
  document.querySelector('.predbpstr'),
  document.querySelector('.predbpdef'),
  document.querySelector('.predbpdex'),
  document.querySelector(".predbpint"),
]

<!--無配點成長預測--->
function preddata (vit,str,def,dex,int,baseBp) {
  
  const predlevel = Number(predLv.innerHTML) 
  const predEachGrade = [ 
    vit-petEachGrade[0],
    str-petEachGrade[1],
    def-petEachGrade[2],
    dex-petEachGrade[3],
    int-petEachGrade[4],
  ]
  
  for (let i in petPredDom){
    
    switch (i) {
        case '0':
        let predhp = 20 + 
        ((allLv1Bp[0] + (bpRule[predEachGrade[0]] * (predlevel-1))) * bpAbility.hp[0]) + 
        ((allLv1Bp[1] + (bpRule[predEachGrade[1]] * (predlevel-1))) * bpAbility.hp[1]) +
        ((allLv1Bp[2] + (bpRule[predEachGrade[2]] * (predlevel-1))) * bpAbility.hp[2]) +
        ((allLv1Bp[3] + (bpRule[predEachGrade[3]] * (predlevel-1))) * bpAbility.hp[3]) +
        ((allLv1Bp[4] + (bpRule[predEachGrade[4]] * (predlevel-1))) * bpAbility.hp[4]) 
        predLvData.splice(0,1,Math.round(predhp*1000)/1000)
            petPredDom[i].innerHTML = Math.floor(predhp)
        break;
        case '1':
        let predmp = 20 + 
        ((allLv1Bp[0] + (bpRule[predEachGrade[0]] * (predlevel-1))) * bpAbility.mp[0]) + 
        ((allLv1Bp[1] + (bpRule[predEachGrade[1]] * (predlevel-1))) * bpAbility.mp[1]) +
        ((allLv1Bp[2] + (bpRule[predEachGrade[2]] * (predlevel-1))) * bpAbility.mp[2]) +
        ((allLv1Bp[3] + (bpRule[predEachGrade[3]] * (predlevel-1))) * bpAbility.mp[3]) +
        ((allLv1Bp[4] + (bpRule[predEachGrade[4]] * (predlevel-1))) * bpAbility.mp[4]) 
        predLvData.splice(1,1,Math.round(predmp*1000)/1000)
            petPredDom[i].innerHTML =  Math.floor(predmp)
        break;
        case '2':
        let predAtk = 20 + 
        ((allLv1Bp[0] + (bpRule[predEachGrade[0]] * (predlevel-1))) * bpAbility.atk[0]) + 
        ((allLv1Bp[1] + (bpRule[predEachGrade[1]] * (predlevel-1))) * bpAbility.atk[1]) +
        ((allLv1Bp[2] + (bpRule[predEachGrade[2]] * (predlevel-1))) * bpAbility.atk[2]) +
        ((allLv1Bp[3] + (bpRule[predEachGrade[3]] * (predlevel-1))) * bpAbility.atk[3]) +
        ((allLv1Bp[4] + (bpRule[predEachGrade[4]] * (predlevel-1))) * bpAbility.atk[4]) 
        predLvData.splice(2,1,Math.round(predAtk*1000)/1000)
            petPredDom[i].innerHTML = Math.floor( predAtk )
        break;
        case '3':
        let predDef = 20 + 
        ((allLv1Bp[0] + (bpRule[predEachGrade[0]] * (predlevel-1))) * bpAbility.def[0]) + 
        ((allLv1Bp[1] + (bpRule[predEachGrade[1]] * (predlevel-1))) * bpAbility.def[1]) +
        ((allLv1Bp[2] + (bpRule[predEachGrade[2]] * (predlevel-1))) * bpAbility.def[2]) +
        ((allLv1Bp[3] + (bpRule[predEachGrade[3]] * (predlevel-1))) * bpAbility.def[3]) +
        ((allLv1Bp[4] + (bpRule[predEachGrade[4]] * (predlevel-1))) * bpAbility.def[4]) 
        predLvData.splice(3,1, Math.round(predDef*1000)/1000)
            petPredDom[i].innerHTML = Math.floor(predDef)
        break;
        case '4':
        let predDex = 20 + 
        ((allLv1Bp[0] + (bpRule[predEachGrade[0]] * (predlevel-1))) * bpAbility.dex[0]) + 
        ((allLv1Bp[1] + (bpRule[predEachGrade[1]] * (predlevel-1))) * bpAbility.dex[1]) +
        ((allLv1Bp[2] + (bpRule[predEachGrade[2]] * (predlevel-1))) * bpAbility.dex[2]) +
        ((allLv1Bp[3] + (bpRule[predEachGrade[3]] * (predlevel-1))) * bpAbility.dex[3]) +
        ((allLv1Bp[4] + (bpRule[predEachGrade[4]] * (predlevel-1))) * bpAbility.dex[4]) 
        predLvData.splice(4, 1, Math.round(predDex*1000)/1000)
            petPredDom[i].innerHTML =  Math.floor(predDex)
        break;
        case '5':
        let predSpi = 100 + 
        ((allLv1Bp[0] + (bpRule[predEachGrade[0]] * (predlevel-1))) * bpAbility.spi[0]) + 
        ((allLv1Bp[1] + (bpRule[predEachGrade[1]] * (predlevel-1))) * bpAbility.spi[1]) +
        ((allLv1Bp[2] + (bpRule[predEachGrade[2]] * (predlevel-1))) * bpAbility.spi[2]) +
        ((allLv1Bp[3] + (bpRule[predEachGrade[3]] * (predlevel-1))) * bpAbility.spi[3]) +
        ((allLv1Bp[4] + (bpRule[predEachGrade[4]] * (predlevel-1))) * bpAbility.spi[4]) 
        predLvData.splice(5,1,Math.round(predSpi*1000)/1000)
            petPredDom[i].innerHTML = Math.floor(predSpi)
        break;
        case '6':
        let predRec = 100 + 
        ((allLv1Bp[0] + (bpRule[predEachGrade[0]] * (predlevel-1))) * bpAbility.rec[0]) + 
        ((allLv1Bp[1] + (bpRule[predEachGrade[1]] * (predlevel-1))) * bpAbility.rec[1]) +
        ((allLv1Bp[2] + (bpRule[predEachGrade[2]] * (predlevel-1))) * bpAbility.rec[2]) +
        ((allLv1Bp[3] + (bpRule[predEachGrade[3]] * (predlevel-1))) * bpAbility.rec[3]) +
        ((allLv1Bp[4] + (bpRule[predEachGrade[4]] * (predlevel-1))) * bpAbility.rec[4]) 
        predLvData.splice(6,1,Math.round(predRec*1000)/1000)
            petPredDom[i].innerHTML = Math.floor(predRec)
        break;
        case '7':
        let predBpVit =  
        allLv1Bp[0] + (bpRule[predEachGrade[0]] * (predlevel-1)) 
        predLvData.splice(7,1,Math.round(predBpVit*1000)/1000)
            petPredDom[i].innerHTML =  Math.floor(predBpVit)
        break;
        case '8':
        let predBpStr =  
        allLv1Bp[1] + (bpRule[predEachGrade[1]] * (predlevel-1)) 
        predLvData.splice(8,1,Math.round(predBpStr*1000)/1000)
            petPredDom[i].innerHTML =  Math.floor(predBpStr)
        break;
        case '9':
        let predBpDef =  
        allLv1Bp[2] + (bpRule[predEachGrade[2]] * (predlevel-1)) 
        predLvData.splice(9,1,Math.round(predBpDef*1000)/1000)
            petPredDom[i].innerHTML =  Math.floor(predBpDef)
        break;
        case '10':
        let predBpDex = 
        allLv1Bp[3] + (bpRule[predEachGrade[3]] * (predlevel-1)) 
        predLvData.splice(10,1,Math.round(predBpDex*1000)/1000)
            petPredDom[i].innerHTML =  Math.floor(predBpDex)
        break;
        case '11':
        let predBpInt =  
        allLv1Bp[4] + (bpRule[predEachGrade[4]] * (predlevel-1)) 
        predLvData.splice(11,1,Math.round(predBpInt*1000)/1000)
            petPredDom[i].innerHTML =  Math.floor(predBpInt)
        break;
    }
  }
}
 
<!--配點成長預測-->
function preddataforpoint () {
  
  petInfo(ptMenuNum)
  const newPredBp = newBpStatus () 
  
  const indexofmaxBp = newPredBp.indexOf(Math.max(...newPredBp))
  let maxBp = newPredBp[indexofmaxBp]
  let total = 0
  for (let i in newPredBp) {
    total += newPredBp[i]
  }
  let halftotal = Math.round((total/2) *1000)/1000
  
  if ( maxBp <= halftotal ) {
    predPS.innerHTML = ''
    predCal ()
    petPointCalForNormal(pointforwhat)
    
  } else {
    
    let boomPoint = Math.ceil(maxBp - halftotal)
    newPredBp[indexofmaxBp] = Math.round( halftotal -1 )  
    let textforpoint = remPoint - boomPoint
    let text = mainway.innerText.slice(3)
    textForPs (text,textforpoint,boomPoint)
    predCal ()
    petPointCalForBoom(indexofmaxBp,textforpoint,boomPoint)
  }
  
  function predCal () {
  predLvData[0] = 20 + Math.round((8*newPredBp[0] + 2*newPredBp[1] + 3*newPredBp[2] + 3*newPredBp[3] + 1*newPredBp[4])*1000)/1000
    predLvData[1] = 20 + Math.round((1*newPredBp[0] + 2*newPredBp[1] + 2*newPredBp[2] + 2*newPredBp[3] + 10*newPredBp[4])*1000)/1000
    predLvData[2] = 20 + Math.round((0.2*newPredBp[0] + 2.7*newPredBp[1] + 0.3*newPredBp[2] + 0.3*newPredBp[3] + 0.2*newPredBp[4])*1000)/1000
    predLvData[3] = 20 + Math.round((0.2*newPredBp[0] + 0.3*newPredBp[1] + 3*newPredBp[2] + 0.3*newPredBp[3] + 0.2*newPredBp[4])*1000)/1000
    predLvData[4] = 20 + Math.round((0.1*newPredBp[0] + 0.2*newPredBp[1] + 0.2*newPredBp[2] + 2*newPredBp[3] + 0.1*newPredBp[4])*1000)/1000
    predLvData[5] = 100 + Math.round(((-0.3)*newPredBp[0] + (-0.1)*newPredBp[1] + 0.2*newPredBp[2] + (-0.1)*newPredBp[3] + 0.8*newPredBp[4])*1000)/1000
    predLvData[6] = 100 + Math.round((0.8*newPredBp[0] + (-0.1)*newPredBp[1] + (-0.1)*newPredBp[2] + 0.2*newPredBp[3] + (-0.3)*newPredBp[4])*1000)/1000  
  }
  
  for (let i in petPredDom){
    switch (i) {
        case '0':
            petPredDom[i].innerHTML =  Math.floor(predLvData[0])
        break;
        case '1':
            petPredDom[i].innerHTML = Math.floor(predLvData[1])
        break;
        case '2':
            petPredDom[i].innerHTML = Math.floor(predLvData[2]) 
        break;
        case '3':
            petPredDom[i].innerHTML = Math.floor(predLvData[3]) 
        break;
        case '4':
            petPredDom[i].innerHTML = Math.floor(predLvData[4])
        break;
        case '5':
            petPredDom[i].innerHTML = Math.floor(predLvData[5])
        break;
        case '6':
            petPredDom[i].innerHTML = Math.floor(predLvData[6]) 
        break;
        case '7':
            petPredDom[i].innerHTML =  Math.floor(newPredBp[0])
        break;
        case '8':
            petPredDom[i].innerHTML =  Math.floor(newPredBp[1])
        break;
        case '9':
            petPredDom[i].innerHTML =  Math.floor(newPredBp[2])
        break;
        case '10':
            petPredDom[i].innerHTML =  Math.floor(newPredBp[3])
        break;
        case '11':
            petPredDom[i].innerHTML =  Math.floor(newPredBp[4])
        break;
    }
  }
}

<!--新的BP五圍-->
function newBpStatus () {
  
  const newPredBp =[
    predLvData[7],
    predLvData[8],
    predLvData[9],
    predLvData[10],
    predLvData[11]
  ]
  
  if (pointforwhat === 1){
    newPredBp[0] += remPoint
  }
  if (pointforwhat === 2){
    newPredBp[1] += remPoint
  }
  if (pointforwhat === 3){
    newPredBp[2] += remPoint
  }
  if (pointforwhat === 4){
    newPredBp[3] += remPoint
  }
  if (pointforwhat === 5){
    newPredBp[4] += remPoint
  }
  if (pointforwhat === 0){
    return newPredBp
  }
  return newPredBp
}

<!--爆點點數計算區-->
function petPointCalForBoom () {
      for ( let i in eachPointText) {
        eachPointText[i].value = 0  
      }
      for (let i = 1 ; i < 6 ; i++) {
        eachPointText[i].readOnly = false
      }
      const index = arguments[0]
      const alloted = arguments[1]
      const remaining = arguments[2]
      eachPointText[index+1].value = alloted
      eachPointText[index+1].readOnly = true
      remPoint = (predLv.innerHTML - 1) - alloted
      points.value = remaining
      for (let i = 1 ; i < 6 ; i++) {
        pointArray.splice(i-1,1,Number(eachPointText[i].value))
      }
}

<!--未爆點點數計算區-->
function petPointCalForNormal () {
  for ( let i in eachPointText) {
        eachPointText[i].value = 0
      }
  const index = arguments[0]
  remPoint = predLv.innerHTML - 1
  eachPointText[index].value = remPoint
  
  for (let i = 1 ; i < 6 ; i++) {
      pointArray.splice(i-1,1,Number(eachPointText[i].value))
      if ( eachPointText[i].value === '0' ) {
        eachPointText[i].readOnly = true
      }
      if ( eachPointText[i].value !== '0' ) {
        eachPointText[i].readOnly = false
      }
  }
}

<!--點數總和限制-->
function petPointTatalCal () {
  
    for (let i = 0 ; i < 5 ; i++) {
        pointArray.splice(i,1,Number(eachPointText[i+1].value))
  }
    let totalPt = 0
    for ( let k in pointArray ){
      totalPt += pointArray[k]
    }
    let maxPt = Number(predLv.innerHTML - 1)
    remPoint = maxPt - totalPt
    points.value = remPoint

    const newPredBp =[
      predLvData[7] + pointArray[0],
      predLvData[8] + pointArray[1],
      predLvData[9] + pointArray[2],
      predLvData[10] + pointArray[3],
      predLvData[11] + pointArray[4]
    ]
    predCal ()
    function predCal () {
    predLvData[0] = 20 + Math.round((8*newPredBp[0] + 2*newPredBp[1] + 3*newPredBp[2] + 3*newPredBp[3] + 1*newPredBp[4])*1000)/1000
      predLvData[1] = 20 + Math.round((1*newPredBp[0] + 2*newPredBp[1] + 2*newPredBp[2] + 2*newPredBp[3] + 10*newPredBp[4])*1000)/1000
      predLvData[2] = 20 + Math.round((0.2*newPredBp[0] + 2.7*newPredBp[1] + 0.3*newPredBp[2] + 0.3*newPredBp[3] + 0.2*newPredBp[4])*1000)/1000
      predLvData[3] = 20 + Math.round((0.2*newPredBp[0] + 0.3*newPredBp[1] + 3*newPredBp[2] + 0.3*newPredBp[3] + 0.2*newPredBp[4])*1000)/1000
      predLvData[4] = 20 + Math.round((0.1*newPredBp[0] + 0.2*newPredBp[1] + 0.2*newPredBp[2] + 2*newPredBp[3] + 0.1*newPredBp[4])*1000)/1000
      predLvData[5] = 100 + Math.round(((-0.3)*newPredBp[0] + (-0.1)*newPredBp[1] + 0.2*newPredBp[2] + (-0.1)*newPredBp[3] + 0.8*newPredBp[4])*1000)/1000
      predLvData[6] = 100 + Math.round((0.8*newPredBp[0] + (-0.1)*newPredBp[1] + (-0.1)*newPredBp[2] + 0.2*newPredBp[3] + (-0.3)*newPredBp[4])*1000)/1000  
    }
    for (let i in petPredDom){
      switch (i) {
          case '0':
            petPredDom[i].innerHTML =  Math.floor(predLvData[0])
          break;
          case '1':
              petPredDom[i].innerHTML = Math.floor(predLvData[1])
          break;
          case '2':
              petPredDom[i].innerHTML = Math.floor(predLvData[2]) 
          break;
          case '3':
              petPredDom[i].innerHTML = Math.floor(predLvData[3]) 
          break;
          case '4':
              petPredDom[i].innerHTML = Math.floor(predLvData[4])
          break;
          case '5':
              petPredDom[i].innerHTML = Math.floor(predLvData[5])
          break;
          case '6':
              petPredDom[i].innerHTML = Math.floor(predLvData[6]) 
          break;
          case '7':
              petPredDom[i].innerHTML =  Math.floor(newPredBp[0])
          break;
          case '8':
              petPredDom[i].innerHTML =  Math.floor(newPredBp[1])
          break;
          case '9':
              petPredDom[i].innerHTML =  Math.floor(newPredBp[2])
          break;
          case '10':
              petPredDom[i].innerHTML =  Math.floor(newPredBp[3])
          break;
          case '11':
              petPredDom[i].innerHTML =  Math.floor(newPredBp[4])
          break;
      }
    }

    if ( remPoint <= 0 ) {
      event.target.max = event.target.value - 1
    } else if ( remPoint > 0 ) {
      event.target.max = remPoint + event.target.value
    }
  
    const textforpoint = Math.max(...pointArray)
    const text = mainway.innerText.slice(3)
    textForPs (text,textforpoint,remPoint)
  
}

<!--備註文字-->
function textForPs () {
  const text = arguments[0]
  const textforpoint = arguments[1]
  const boomPoint = arguments[2]
  predPS.innerHTML = '備註：【' + text + '爆點】、' + text + (textforpoint) +'點，餘' + boomPoint + '未分配'
}

<!--比較清單-->>
const lists = document.querySelector('.lists')
const listData = []
function ComparisonList () {
let htmlContent = `
                <table class="table table-sm">
                <thead>
                <tr>
                <th>
                <button class="btn btn-sm btn-danger">X</button>
                </th>
                <th scope="col">血量</th>
                <th scope="col">魔量</th>
                <th scope="col">攻</th>
                <th scope="col">防</th>
                <th scope="col">敏</th>
                <th scope="col">精神</th>
                <th scope="col">回復</th>
                <th scope="col">體</th>
                <th scope="col">力</th>
                <th scope="col">強</th>
                <th scope="col">速</th>
                <th scope="col">魔</th>
              </tr></tr></thead><tbody>`
  for ( let i in predLvData){
    listData.splice(i,1,petPredDom[i].innerHTML)
  }
  const lvtext = predLv.innerHTML
  const petname = petName.innerHTML
  const ps = predPS.innerHTML
      htmlContent += `
        <tr>
                <th scope="row">
                  <span class="predlv">#${petname}</span>
                  <span>${lvtext}級</span>
                  <p>#${ps}</p>
                </th>`
  listData.forEach((data) => {
    htmlContent += `
                <td><span>${data}</span></td>
      `
  })
    htmlContent += `
          </tr>
      </tbody>
    </table>
  `
  lists.innerHTML += htmlContent
}
lists.addEventListener('click', function (event) {
  //console.log (event.target)
  if (event.target.matches('.btn.btn-sm.btn-danger')){
    let deleteData = event.target.parentElement.parentElement.parentElement.parentElement
    deleteData.remove()
  } 
})