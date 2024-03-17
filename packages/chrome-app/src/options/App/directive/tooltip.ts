export default {
    install(app:any){
        app.directive('tooltip',{
            mounted(el:Element, binding:any, vnode:any) {
                // console.log(el,binding,vnode);
            }
        });
    }
}