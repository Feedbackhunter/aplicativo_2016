
function nosso_app(){
    ref = cordova.InAppBrowser.open('http://feedbackhunter.com.br/aplicativo_novo/nosso-app.php?id='+device.uuid, '_blanck', 'location=no, clearcache=yes, clearsessioncache=yes');
    ref.addEventListener('loadstart', function(event) { 
        window.plugins.spinnerDialog.show();
    });
    ref.addEventListener('loadstop', function(event) {     
        window.plugins.spinnerDialog.hide();
        if (event.url.match('mobile/close')) {
          ref.close();
        }   
        else {
            ref.show();
        }
    });
}
function sobre(){
    ref = cordova.InAppBrowser.open('http://feedbackhunter.com.br/aplicativo_novo/sobre.html', '_blanck', 'location=no, clearcache=yes, clearsessioncache=yes');
    ref.addEventListener('loadstart', function(event) { 
        window.plugins.spinnerDialog.show();
    });
    ref.addEventListener('loadstop', function(event) {     
        window.plugins.spinnerDialog.hide();
        if (event.url.match('mobile/close')) {
          ref.close();
        }   
        else {
            ref.show();
        }
    });
}
function contato(){
    ref = cordova.InAppBrowser.open('http://feedbackhunter.com.br/aplicativo_novo/contato.php', '_blanck', 'location=no, clearcache=yes, clearsessioncache=yes');
    ref.addEventListener('loadstart', function(event) { 
        window.plugins.spinnerDialog.show();
    });
    ref.addEventListener('loadstop', function(event) {     
        window.plugins.spinnerDialog.hide();
        if (event.url.match('mobile/close')) {
          ref.close();
        }   
        else {
            ref.show();
        }
    });
}
function parceiros(){
    ref = cordova.InAppBrowser.open('http://feedbackhunter.com.br/aplicativo_novo/parceiros.html', '_blanck', 'location=no, clearcache=yes, clearsessioncache=yes');
    ref.addEventListener('loadstart', function(event) { 
        window.plugins.spinnerDialog.show();
    });
    ref.addEventListener('loadstop', function(event) {     
        window.plugins.spinnerDialog.hide();
        if (event.url.match('mobile/close')) {
          ref.close();
        }   
        else {
            ref.show();
        }
    });
}
function scan(){
    cordova.plugins.barcodeScanner.scan(
      function (result) {
        if (result.cancelled == false){
            ref = cordova.InAppBrowser.open('http://feedbackhunter.com.br/aplicativo_novo/formulario.php?id='+device.uuid+'&f='+result.text+'&versao=2&isQRcode=1', '_blanck', 'location=no, clearcache=yes, clearsessioncache=yes');
            ref.addEventListener('loadstart', function(event) { 
                window.plugins.spinnerDialog.show();
            });
            ref.addEventListener('loadstop', function(event) {     
                window.plugins.spinnerDialog.hide();
                if (event.url.match('mobile/close')) {
                  ref.close();
                }   
                else {
                    ref.show();
                }
            });
        }
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
}
function onPrompt(results) {
    if (results.buttonIndex == 1){
        ref = cordova.InAppBrowser.open('http://feedbackhunter.com.br/aplicativo_novo/formulario.php?id='+device.uuid+'&f='+results.input1+'&versao=2&isQRcode=0', '_blanck', 'location=no, clearcache=yes, clearsessioncache=yes');
        ref.addEventListener('loadstart', function(event) { 
            window.plugins.spinnerDialog.show();
        });
        ref.addEventListener('loadstop', function(event) {     
            window.plugins.spinnerDialog.hide();
            if (event.url.match('mobile/close')) {
              ref.close();
            }   
            else {
                ref.show();
            }
        });
    }
}
function codigo(){
    navigator.notification.prompt(
        'Digite o código do formulário',  // message
        onPrompt,                  // callback to invoke
        'Código',            // title
        ['Enviar','Sair'],             // buttonLabels
        ''
    );
}


