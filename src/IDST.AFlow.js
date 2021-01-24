(async function () {
    console.log('IDST.AFlow--------------------------------------------');
    console.log(CefSharp);

    await CefSharp.BindObjectAsync('boundEvent');
    await CefSharp.BindObjectAsync('idstObj');

    /*
    var counter = 0;
    var elem = document.getElementById('##ID##');
    elem.removeAttribute('disabled');
    elem.addEventListener('##EVENT##', function (e) {
        if (!window.boundEvent) {
            console.log('window.boundEvent does not exist.');
            return;
        }
        counter++;
        //NOTE RaiseEvent was converted to raiseEvent in JS (this is configurable when registering the object)
        window.boundEvent.raiseEvent('##EVENT##', { count: counter, id: e.target.id, tagName: e.target.tagName });
    });
    console.log(`Added ##EVENT## listener to ${elem.id}.`);
    */
})();
/*
export default class idstAFlow {
    registerDS(drawingService) {
        this.ds = drawingService;
    };
    registerAS(appService) {
        this.as = appService;
    }

    getDrawing() {
        return this.ds.getDrawingData();
    }

}
*/