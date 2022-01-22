ReactDOM.render(<Contador/>, document.querySelector('#root'));
if(navigator.serviceWorker){
    navigator.serviceWorker.register('./sw.js');
}
