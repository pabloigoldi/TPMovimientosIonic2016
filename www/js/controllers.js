angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicPlatform, $cordovaMedia, $timeout, $cordovaDeviceMotion) {

  $scope.arrayPlay = {Izquierda: 1, Derecha: 1, Abajo: 1, Arriba: 1, Acostado: 1};

 $scope.Ingresar = false;

 $scope.Empezar = function(){
   $scope.Ingresar = true;
 }

  $ionicPlatform.ready(function() {
    
    var options = { frequency: 1000 };

        var watch = $cordovaDeviceMotion.watchAcceleration(options);
        watch.then(
          null,
          function(error) {
          console.log("No se puede tomar coordenadas desde ordenador");
          },
          function(result) {
            $scope.X = parseInt(result.x);
            $scope.Y = parseInt(result.y);
            $scope.Z = parseInt(result.z);
            $scope.tiempo = result.timestamp;

            if($scope.X > 4 && $scope.audioIzq != null && $scope.arrayPlay["Izquierda"] == 1){

              $scope.audioIzq.play();
              $scope.arrayPlay = {Izquierda: 0, Derecha: 1, Abajo: 1, Arriba: 1, Acostado: 1};

            }

            if($scope.X < -4 && $scope.audioDer != null && $scope.arrayPlay["Derecha"] == 1){

              $scope.audioDer.play();
              $scope.arrayPlay = {Izquierda: 1, Derecha: 0, Abajo: 1, Arriba: 1, Acostado: 1};

            }

            if($scope.Y > 5 && $scope.audioArriba != null && $scope.arrayPlay["Arriba"] == 1){

              $scope.audioArriba.play();
              $scope.arrayPlay = {Izquierda: 1, Derecha: 1, Abajo: 1, Arriba: 0, Acostado: 1};

            }

            if($scope.Z > 8 && $scope.audioAcostado != null && $scope.arrayPlay["Acostado"] == 1){

              $scope.audioAcostado.play();
              $scope.arrayPlay = {Izquierda: 1, Derecha: 1, Abajo: 1, Arriba: 1, Acostado: 0};

            }

            if($scope.Z < -7 && $scope.audioAbajo != null && $scope.arrayPlay["Abajo"] == 1){

              $scope.audioAbajo.play();
              $scope.arrayPlay = {Izquierda: 1, Derecha: 1, Abajo: 0, Arriba: 1, Acostado: 1};

            }


        });

    })



  $scope.AudioIzquierda = function(){

    $ionicPlatform.ready(function() {

      try{
        var src = "izquierda.mp3";
        $scope.audioIzq = $cordovaMedia.newMedia(src);
        $scope.audioIzq.startRecord();
        //var detalles = JSON.stringify($scope.audioIzq);
        //alert(detalles);

        /*$timeout(function(){
          $scope.audioIzq.stopRecord();
          alert("grabado!!!");
        }, 2000)*/

      } catch(ex){

        alert(ex);
      }
      
    });

  }

  $scope.Detener = function(btn){
    try{

      if(btn == 'btnIzquierda'){

        $scope.audioIzq.stopRecord();

      }

      if(btn == 'btnDerecha'){

        $scope.audioDer.stopRecord();

      }

      if(btn == 'btnAbajo'){

        $scope.audioAbajo.stopRecord();

      }

      if(btn == 'btnArriba'){

        $scope.audioArriba.stopRecord();

      }

      if(btn == 'btnAcostado'){

        $scope.audioAcostado.stopRecord();

      }
      

    } catch(ex){
      alert(ex);
    }
  }

  $scope.AudioDerecha = function(){
    
    $ionicPlatform.ready(function() {

      try{
        var src = "derecha.mp3";
        $scope.audioDer = $cordovaMedia.newMedia(src);
        $scope.audioDer.startRecord();

      } catch(ex){

        alert(ex);
      }
      
    });

  }



  $scope.AudioAbajo = function(){
    
    $ionicPlatform.ready(function() {

      try{
        var src = "abajo.mp3";
        $scope.audioAbajo = $cordovaMedia.newMedia(src);
        $scope.audioAbajo.startRecord();

      } catch(ex){

        alert(ex);
      }
      
    });

  }


  $scope.AudioArriba = function(){
    
    $ionicPlatform.ready(function() {

      try{
        var src = "arriba.mp3";
        $scope.audioArriba = $cordovaMedia.newMedia(src);
        $scope.audioArriba.startRecord();

      } catch(ex){

        alert(ex);
      }
      
    });

  }

  $scope.AudioAcostado = function(){
    
    $ionicPlatform.ready(function() {

      try{
        var src = "acostado.mp3";
        $scope.audioAcostado = $cordovaMedia.newMedia(src);
        $scope.audioAcostado.startRecord();

      } catch(ex){

        alert(ex);
      }
      
    });

  }



})

.controller('inicioCtrl', function($scope, $state) {
    $scope.loginData = {};
  $scope.loginData.username ="pablo.emanuel.ig@gmail.com";
  $scope.loginData.password = "hola06";

  $scope.doLogin= function()
  {
      firebase.auth().signInWithEmailAndPassword($scope.loginData.username,$scope.loginData.password).catch(function(error)
        {          
          console.info("error: " + error);
           var errorCode = error.code;
           var errorMessage = error.message;
          if(errorCode== 'auth/wrong-password')
          {
            $scope.mensajeLogin = "wrong-password";
          }
          else
          {
          $scope.mensajeLogin = "errores:" + errorMessage;
          }


        }).then(function(respuesta){

              if(respuesta)
              {             
                  $state.go('tab.dash');
              }
              else
              {
                   $scope.mensajeLogin = "Error en el logueo";
              }

        });
  }

  $scope.salir= function()
  {
      ionic.Platform.exitApp();
  }

 }) 

.controller('infoCtrl', function($scope, $ionicPlatform, $cordovaInAppBrowser){


    var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
    };

    $scope.showBrowser=function(){

      $ionicPlatform.ready(function(){

        $cordovaInAppBrowser.open('https://github.com/pabloigoldi/TPMovimientosIonic2016', '_system', options);

      });
    };
})

.controller('AutorCtrl', function($scope, $ionicPlatform, $cordovaInAppBrowser) {


})
